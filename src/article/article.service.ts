import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';
import { ArticlePostDto } from './dto/articlePost.dto';
import { ArticleSearchDto } from './dto/articleSearch.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: ArticleRepository,
  ) {}

  async post(articlePostDto: ArticlePostDto, user: User): Promise<void> {
    const {
      location,
      detail_location,
      gu,
      dong,
      price,
      period,
      use_point,
      title,
      contents,
      post_bank,
      post_account,
      post_holder,
      point_earned,
    } = articlePostDto;
    const article = this.articleRepository.create({
      location,
      detail_location,
      gu,
      dong,
      price,
      period,
      use_point,
      title,
      contents,
      post_bank,
      post_account,
      post_holder,
      point_earned,
      writer: user.nickname,
    });
    await this.articleRepository.save(article);
  }

  async getAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async getArticle(id: number, user: User): Promise<{ article: Article; isUser: boolean }> {
    let isUser = false;
    if (user) isUser = true;
    const article = await this.articleRepository.findOne({ id });
    if (!article) throw new NotFoundException();
    return {
      article,
      isUser,
    };
  }

  async getPoint(user: User): Promise<{ articles: Article[]; current_point: number; date: string }> {
    const articles = await this.articleRepository.query(
      `select id, point_earned, date from article where article.partner=? order by id desc`,
      [user.nickname],
    );
    return {
      articles,
      current_point: user.current_point,
      date: user.date,
    };
  }

  async updateStatus(id: number, status: string): Promise<void> {
    if (status === 'waiting') await this.articleRepository.update(id, { status, partner: null });
    else await this.articleRepository.update(id, { status });
  }

  async choice(id: number, user: User): Promise<void> {
    await this.articleRepository.update(id, { status: 'matching', partner: user.nickname });
  }

  async search(articleSearchDto: ArticleSearchDto, user: User): Promise<{ isUser: boolean; articles: Article[] }> {
    let isUser = false;
    if (user) isUser = true;
    const { minprice, maxperiod, location1, location2, location3 } = articleSearchDto;
    const [location1_gu, location1_dong] = location1.split(' ');
    const [location2_gu, location2_dong] = location2.split(' ');
    const [location3_gu, location3_dong] = location3.split(' ');
    let query =
      'select * from article where price >= ? and ? >= period and status="waiting" and ((gu=? and dong=?) or (gu=? and dong=?) or (gu=? and dong=?))';
    if (location1 === '* *') query = 'select * from article where price >= ? and ? >= period';
    const articles = await this.articleRepository.query(query, [
      minprice,
      maxperiod,
      location1_gu,
      location1_dong,
      location2_gu,
      location2_dong,
      location3_gu,
      location3_dong,
    ]);
    return {
      isUser,
      articles,
    };
  }
}

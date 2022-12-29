import { Body, Controller, Get, Logger, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/middlewares/user.info';
import { User } from 'src/user/user.entity';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticlePostDto } from './dto/articlePost.dto';
import { ArticleSearchDto } from './dto/articleSearch.dto';

@Controller('article')
export class ArticleController {
  private logger = new Logger('ArticleController');
  constructor(private articleService: ArticleService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  post(@Body() articlePostDto: ArticlePostDto, @GetUser() user: User): Promise<void> {
    this.logger.debug('started articlePost');
    return this.articleService.post(articlePostDto, user);
  }

  @Get()
  getAll(): Promise<Article[]> {
    this.logger.debug('started articlesGetAll');
    return this.articleService.getAll();
  }

  @Get('detail/:id')
  @UseGuards(AuthGuard())
  getArticle(@Param('id') id: number, @GetUser() user: User): Promise<any> {
    this.logger.debug('started getArticle');
    return this.articleService.getArticle(id, user);
  }

  @Get('point')
  @UseGuards(AuthGuard())
  getPoint(@GetUser() user: User): Promise<any> {
    this.logger.debug('started articleGetPoint');
    return this.articleService.getPoint(user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateStatus(@Param('id') id: number, @Body('status') status: string): Promise<void> {
    this.logger.debug('started articleUpdateStatus');
    return this.articleService.updateStatus(id, status);
  }

  @Patch(':id/partner')
  @UseGuards(AuthGuard())
  choice(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    this.logger.debug('started articleChoiceLF');
    return this.articleService.choice(id, user);
  }

  @Get('search')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  search(
    @Body() articleSearchDto: ArticleSearchDto,
    @GetUser() user: User,
  ): Promise<{ isUser: boolean; articles: Article[] }> {
    this.logger.debug('started articleSearch');
    return this.articleService.search(articleSearchDto, user);
  }
}

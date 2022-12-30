import { IsNumber, IsString } from 'class-validator';

export class ArticlePostDto {
  @IsString() location: string;
  @IsString() detail_location: string;
  @IsString() gu: string;
  @IsString() dong: string;
  @IsNumber() price: number;
  @IsString() period: string;
  @IsNumber() use_point: number;
  @IsString() title: string;
  @IsString() contents: string;
  @IsString() post_bank: string;
  @IsString() post_account: string;
  @IsString() post_holder: string;
  @IsNumber() point_earned: number;
}

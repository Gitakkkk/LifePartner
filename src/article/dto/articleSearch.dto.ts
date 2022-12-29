import { IsString } from 'class-validator';

export class ArticleSearchDto {
  @IsString() minprice: string;
  @IsString() maxperiod: string;
  @IsString() location1: string;
  @IsString() location2: string;
  @IsString() location3: string;
}

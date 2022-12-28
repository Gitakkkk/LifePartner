import { IsString, Matches, MinLength } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @MinLength(4)
  nickname: string;

  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts English and Number',
  })
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  detail_address: string;

  @IsString()
  gu: string;

  @IsString()
  dong: string;

  @IsString()
  bank?: string;

  @IsString()
  account?: string;

  @IsString()
  holder?: string;
}

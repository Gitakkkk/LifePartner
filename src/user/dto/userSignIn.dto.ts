import { IsString, Matches, MinLength } from 'class-validator';

export class UserSignInDto {
  @IsString()
  @MinLength(4)
  nickname: string;

  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;
}

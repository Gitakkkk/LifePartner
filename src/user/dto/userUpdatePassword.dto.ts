import { IsString, Matches, MinLength } from 'class-validator';

export class UserUpdatePasswordDto {
  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;

  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/)
  updatedPassword: string;
}

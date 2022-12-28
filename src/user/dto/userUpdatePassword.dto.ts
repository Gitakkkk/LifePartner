import { IsString, Matches, MinLength } from 'class-validator';

export class UserUpdatePasswordDto {
  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts English and Number',
  })
  password: string;

  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts English and Number',
  })
  updatedPassword: string;
}

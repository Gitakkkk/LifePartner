import { IsString } from 'class-validator';

export class UserUpdateAccountDto {
  @IsString()
  bank: string;

  @IsString()
  account: string;

  @IsString()
  holder: string;
}

import { IsString } from 'class-validator';

export class UserUpdatePhoneDto {
  @IsString() phone: string;
}

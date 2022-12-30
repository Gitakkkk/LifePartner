import { IsString } from 'class-validator';

export class UserUpdateAddressDto {
  @IsString() address: string;

  @IsString() detail_address: string;

  @IsString() dong: string;
}

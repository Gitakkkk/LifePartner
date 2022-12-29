import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Partner])],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule {}

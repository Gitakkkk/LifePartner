import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeORMConfig), ArticleModule, PartnerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

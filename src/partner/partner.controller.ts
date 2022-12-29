import { Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/middlewares/user.info';
import { User } from 'src/user/user.entity';
import { Partner } from './partner.entity';
import { PartnerService } from './partner.service';

@Controller('partner')
export class PartnerController {
  private logger = new Logger();
  constructor(private partnerService: PartnerService) {}

  @Get(':id/list')
  @UseGuards(AuthGuard())
  getList(@Param('id') id: number): Promise<Partner[]> {
    this.logger.debug('start getPartnerList');
    return this.partnerService.getList(id);
  }

  @Post(':id/post')
  @UseGuards(AuthGuard())
  postPartner(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    this.logger.debug('start postPartner');
    return this.partnerService.postPartner(id, user);
  }
}

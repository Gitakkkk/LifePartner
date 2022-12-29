import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Partner } from './partner.entity';
import { PartnerRepository } from './partner.repository';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: PartnerRepository,
  ) {}

  async getList(id: number): Promise<Partner[]> {
    const partners = await this.partnerRepository.find({ where: { articleID: id } });
    if (partners.length > 5) throw new BadRequestException('5인 초과');
    return partners;
  }

  async postPartner(id: number, user: User): Promise<void> {
    const partner = this.partnerRepository.create({
      article_id: id,
      partner: user.nickname,
    });
    await this.partnerRepository.save(partner);
  }
}

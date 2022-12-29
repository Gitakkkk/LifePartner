import { EntityRepository, Repository } from 'typeorm';
import { Partner } from './partner.entity';

@EntityRepository(Partner)
export class PartnerRepository extends Repository<Partner> {}

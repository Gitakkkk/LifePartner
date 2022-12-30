import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Cache } from 'cache-manager';
import * as config from 'config';

const jwtConfig = config.jwt;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super({
      secretOrKey: jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { nickname: string }) {
    const { nickname } = payload;
    const user = await this.cacheManager.get(`${nickname}`);
    console.log(nickname);
    if (!user) {
      console.log('여기 실행');
      const user: User = await this.userRepository.findOne({ nickname });
      await this.cacheManager.set(`${nickname}`, user.nickname);
      if (!user) throw new UnauthorizedException();
      return user;
    }
    return user;
  }
}

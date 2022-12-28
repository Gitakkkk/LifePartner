import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import * as config from 'config';

const jwtConfig = config.jwt;

export default class AuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const { access_token } = req.headers;
    if (!access_token) {
      throw new UnauthorizedException();
    }
    req.user = this.validateToken(access_token);
    return true;
  }

  public validateToken(token: string): string {
    const verify: string = jwt.verify(token, jwtConfig.secret) as string;
    return verify;
  }
}

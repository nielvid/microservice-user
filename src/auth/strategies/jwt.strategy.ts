import { Injectable } from '@nestjs/common';
// import { AuthService } from '../auth.service';
import { RpcException } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  validate(payload: any) {
    if (!payload?.username) throw new RpcException('Unauthorized');
    return {
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
  }
}

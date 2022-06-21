import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiException } from '../../core/exception/api.exception';
import { StatusEnum } from '../..//core/constants/status';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies?.accessToken, req => req.query?.accessToken]),
      secretOrKey: configService.get('JTW_SECRET_OR_KEY'),
    });
  }

  async validate(user: LoginDto) {
    const { username } = user;
    const res = await this.userService.verify(username);

    if (!res) {
      throw new ApiException('用户信息已失效', HttpStatus.NOT_FOUND, StatusEnum.NO_USER);
    }

    return user;
  }
}

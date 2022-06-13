import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiException } from '../../core/exception/api.exception';
import { StatusEnum } from '../..//core/constants/status';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        req => {
          return req.cookies.accessToken;
        },
      ]),
      secretOrKey: 'qHqPHVPasjfHDCrcX7Ao7x5O5W098RU3i6lloVgWZFY=',
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

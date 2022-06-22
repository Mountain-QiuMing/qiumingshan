import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import _ from 'lodash-es';
import { randomCode } from '../../utils/random-code';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: LoginDto) {
    const { username, password } = user;
    const result = await this.userService.verify(username);

    if (!result) {
      throw new UnauthorizedException('用户不存在');
    }

    if (!(await result.comparePassword(password))) {
      throw new UnauthorizedException('密码错误');
    }

    const { id, username: realUsername } = result;
    const payload = { id, username: realUsername };
    const token = this.jwtService.sign(payload);

    return {
      token,
      ..._.omit(result, 'password'),
    };
  }

  async register(userData: RegisterDto) {
    const entity = await this.userService.create(userData);
    if (entity) {
      const { id, username: realUsername } = entity;
      const payload = { id, username: realUsername };
      const token = this.jwtService.sign(payload);
      const verifyUrl = `${this.configService.get('EMAIL_VERIFY_URL')}?accessToken=${token}`;

      try {
        await this.mailerService.sendMail({
          to: userData.email,
          subject: '请验证你的邮箱',
          template: 'email-verify.template.hbs',
          context: {
            ...entity,
            verifyUrl,
            randomCode: randomCode(8),
          },
        });
        return {
          token,
        };
      } catch (e) {
        console.log('邮件发送失败');
        throw new BadRequestException(e);
      }
    }
  }

  async verifyEmail(userData: UserEntity) {
    return await this.userService.verifyEmail(userData);
  }

  async info(id: string) {
    return await this.userService.getUserInfoById(id);
  }

  async update(id: string, user: UserEntity) {
    return await this.userService.updateUserInfoById(id, user);
  }
}

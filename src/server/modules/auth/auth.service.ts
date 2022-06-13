import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

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
    };
  }

  async register(userData: RegisterDto) {
    const entity = await this.userService.create(userData);

    if (entity) {
      const { id, username: realUsername } = entity;
      const payload = { id, username: realUsername };
      const token = this.jwtService.sign(payload);

      return {
        token,
      };
    }
  }
}

import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../../core/guard/jtw.guard';
import { User } from '../../core/decorator/user.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('verify-email')
  @UseGuards(new JwtAuthGuard())
  async verifyEmail(@User() user: UserEntity) {
    return this.authService.verifyEmail(user);
  }
}

import { Controller, Post, Body, UseGuards, Get, Param, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../../core/guard/jtw.guard';
import { User } from '../../core/decorator/user.decorator';
import { UserEntity } from '../user/user.entity';
import { Request } from 'express';

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

  @Post('send-verify-email')
  @UseGuards(new JwtAuthGuard())
  async sendVerifyEmail(@User() user: UserEntity, @Req() req: Request) {
    return this.authService.sendVerifyEmail(user, req.cookies.token);
  }

  @Get('info')
  @UseGuards(new JwtAuthGuard())
  async info(@User() user: UserEntity) {
    if (user?.id) {
      return await this.authService.info(user.id);
    }
  }

  @Put('update')
  @UseGuards(new JwtAuthGuard())
  async update(@User() user, @Param() id: string, @Body() userData: UserEntity) {
    return await this.authService.update(user.id, userData);
  }
}

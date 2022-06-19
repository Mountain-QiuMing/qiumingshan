import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../../core/guard/jtw.guard';

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

  // @Get('info')
  // @UseGuards(new JwtAuthGuard())
  // async info(@Req() req) {
  //   if (req.user && req.user.id) {
  //     return await this.authService.info(req.user.id);
  //   }
  // }

  @Get('test')
  @UseGuards(AuthGuard())
  async authTest() {
    return {
      message: 'ok',
    };
  }
}

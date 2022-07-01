import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../../core/decorator/user.decorator';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('username/:username')
  async sendVerifyEmail(@Param('username') username: string) {
    return await this.userService.getUserInfoByName(username, null as any);
  }
}

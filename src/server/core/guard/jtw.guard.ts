import { Injectable, ExecutionContext, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatusCodeEnum } from 'shared/constants/status-code.enum';
import { ApiException } from '../exception/api.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      console.log(err);

      throw err || new ApiException('查无此人', HttpStatus.UNAUTHORIZED, StatusCodeEnum.INVALID_USER);
    }

    return user;
  }
}

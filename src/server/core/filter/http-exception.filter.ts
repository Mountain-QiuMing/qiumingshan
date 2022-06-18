import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { ApiException } from '../exception/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status = exception.getStatus();

    const error = exception.getResponse();

    const data = {
      message: exception.message || error,
      code: exception instanceof ApiException ? exception.Code : -1,
      status: false,
    };

    res.status(status).json(data);
  }
}

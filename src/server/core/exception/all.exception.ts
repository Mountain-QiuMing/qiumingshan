import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const data = {
      code: status,
      message: exception.message,
      status: exception.getStatus() === HttpStatus.OK,
    };

    Logger.warn(AllExceptionsFilter.name);
    Logger.error(status, exception);

    res.status(status).json(data);
  }
}

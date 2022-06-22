import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusCodeEnum } from 'shared/constants/status-code.enum';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const response = context.switchToHttp().getResponse()
    return next.handle().pipe(
      map(result => {
        if (typeof result === 'string') {
          return {
            code: StatusCodeEnum.SUCCESS,
            status: true,
            message: result,
          };
        }

        return {
          code: StatusCodeEnum.SUCCESS,
          status: true,
          result,
        };
      }),
    );
  }
}

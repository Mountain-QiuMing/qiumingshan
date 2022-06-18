import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusEnum } from '../constants/status';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const response = context.switchToHttp().getResponse()
    return next.handle().pipe(
      map(result => {
        if (typeof result === 'string') {
          return {
            code: StatusEnum.SUCCESS,
            status: true,
            message: result,
          };
        }

        return {
          code: StatusEnum.SUCCESS,
          status: true,
          result,
        };
      }),
    );
  }
}

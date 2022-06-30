import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { WsException } from '@nestjs/websockets';
import { StatusCodeEnum } from 'shared/constants/status-code.enum';

interface Props {
  /** 是否为 websocket */
  isWs?: boolean;
}

interface Props {
  /** 是否为 websocket */
  isWs?: boolean;
}
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  isWs: boolean;

  constructor(props?: Props) {
    this.isWs = props?.isWs;
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      let error = errors.shift();

      if (error.children && error.children.length) {
        error = error.children.shift();
      }
      Object.keys(error.constraints).forEach(key => {
        console.log(error);
        if (this.isWs) {
          throw new WsException({
            status: false,
            message: error.constraints[key],
          });
        }

        throw new HttpException(
          {
            code: StatusCodeEnum.INVALID_PARAMETER,
            message: error.constraints[key],
          },
          HttpStatus.OK,
        );
      });
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
}

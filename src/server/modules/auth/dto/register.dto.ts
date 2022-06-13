import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: '邮箱哦' })
  @IsEmail({}, { message: '不是有效邮箱哦' })
  @IsNotEmpty({ message: '邮箱不能为空哦' })
  public email: string;

  @ApiProperty({ description: ' 用户名哦' })
  @MaxLength(10, { message: '用户名不得超过10个字符哦' })
  @IsNotEmpty({ message: '用户名不能为空哦' })
  readonly username: string;

  @ApiProperty({ description: ' 密码哦' })
  @Length(6, 16, { message: '密码必须在6-16位之间哦' })
  @IsNotEmpty({ message: '密码不能为空哦' })
  password: string;
}

import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  readonly name: string;
}

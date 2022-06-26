import { IsString, ValidateNested, IsNotEmpty, Length } from 'class-validator';
import { CreateTagDto } from '../../tag/dto/create-tag.dto';

export class CreatePostDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @Length(0, 49, { message: '标题不能超过50个字符' })
  @IsString()
  readonly title: string;

  @IsNotEmpty({ message: '内容不能为空' })
  @IsString()
  readonly body: string;

  // @IsNotEmpty({ message: '分类id不能为空' })
  // @IsString()
  // categoryId: string;

  @ValidateNested({ message: 'tags结构错误' })
  tags: CreateTagDto[];
}

import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: '评论内容不能为空哦' })
  content: string;

  @IsNotEmpty({ message: '文章 id 不能为空哦' })
  postId: string;

  commentId?: string;
}

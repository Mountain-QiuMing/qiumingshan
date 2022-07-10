import { IsNotEmpty } from 'class-validator';
import { ReactionData } from 'shared/interface/reaction/reaction.interface';

export class CreateReactionDto implements ReactionData {
  @IsNotEmpty({ message: '类型不能为空哦' })
  type: string;

  @IsNotEmpty({ message: '关联 id 不能为空哦' })
  relateId: string;

  @IsNotEmpty({ message: '分类不能为空哦' })
  category: string;
}

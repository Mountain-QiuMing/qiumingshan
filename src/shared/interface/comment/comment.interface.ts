import { BaseUserInfo } from '../user/user-info.interface';

export interface CommentData {
  id: string;
  postId: string;
  user: BaseUserInfo;
  commentId: string;
  content: string;
  parent: Comment;
  children: Comment[];
}

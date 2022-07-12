import { BaseUserInfo } from '../user/user-info.interface';

export interface CommentData {
  id: string;
  postId: string;
  user: BaseUserInfo;
  commentId?: string;
  content: string;
  parent: CommentData;
  children: CommentData[];
  createdAt: string;
}

export interface AddCommentParams {
  postId: string;
  commentId?: string;
  content: string;
}

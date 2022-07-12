import { AddCommentParams, CommentData } from 'shared/interface/comment/comment.interface';
import { request } from '../';

/** 文章添加评论 */
export const apiAddPostComment = (data: AddCommentParams) => {
  return request('post', `/comment/post/`, data);
};

/** 获取文章评论 */
export const apiGetPostComment = (postId: string) => {
  return request<CommentData[]>('get', `/comment/post/${postId}`);
};

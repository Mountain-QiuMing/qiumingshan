import { PagerData } from 'shared/interface/common/pager';
import { PostPageDto, Post, PostDto } from 'shared/interface/post/post.interface';
import { request } from '../';

/** 获取文章列表接口 */
export const apiGetPostList = (data?: PostPageDto) => {
  return request<PagerData<Post[]>>('get', '/post', data);
};

/** 通过 `id` 获取文章详情接口 */
export const apiGetPostById = (id: string) => {
  return request<Post>('get', `/post/${id}`);
};

/** 发布文章接口 */
export const apiAddPost = (data: PostDto) => {
  return request<Post>('post', '/post', data);
};

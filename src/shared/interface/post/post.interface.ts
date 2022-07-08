import { BaseUserInfo } from '../user/user-info.interface';

export interface Tag {
  id: string;
  name: string;
}

export interface PostDto {
  /** 文章标题 */
  title: string;
  /** 文章内容 */
  body: string;
  /** 标签 */
  tags: Partial<Tag>[];
}

export interface PostPageDto {
  tagIds?: string;
  pageSize?: number;
  pageNum?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

export interface Post {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  created: string;
  updated: string;
  user: BaseUserInfo;
}

export type PostItem = Omit<Post, 'body' | 'tags' | 'created'>;

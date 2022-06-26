import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ListOptionsInterface {
  categoryIds: string;
  tagIds: string;
  pageSize: number;
  pageNum: number;
  sort: string;
  order: 'ASC' | 'DESC';
}

export const ListOptions = createParamDecorator((data: Partial<ListOptionsInterface> = {}, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  let { categoryIds, tagIds, pageNum, pageSize, sort, order } = req.query || {};

  if (categoryIds) {
    categoryIds = categoryIds.split(',').map(item => Number(item));
  }

  if (tagIds) {
    tagIds = tagIds.split(',').map(item => Number(item));
  }

  if (pageNum) {
    pageNum = Number(pageNum);
  } else {
    pageNum = 1;
  }

  if (pageSize) {
    pageSize = Number(pageSize);
  } else if (pageSize === undefined && data.pageSize) {
    pageSize = data.pageSize;
  } else {
    pageSize = 10;
  }

  if (sort) {
    sort = sort;
  } else if (sort === undefined && data.sort) {
    sort = data.sort;
  } else {
    sort = 'created';
  }

  if (order) {
    order = order.toUpperCase();
  } else if (order === undefined && data.order) {
    order = data.order;
  } else {
    order = 'DESC';
  }

  return {
    ...req.query,
    categoryIds,
    tagIds,
    pageNum,
    pageSize,
    sort,
    order,
  };
});

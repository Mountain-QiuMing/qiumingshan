export interface PagerData<T = any[]> {
  data: T;
  page: {
    pageNum: number;
    pageSize: number;
    totalSize: number;
  };
}

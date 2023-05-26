export interface PaginationMeta {
  perPage: number;
  currentPage: number;
  totalCount: number;
}

export interface PageParams {
  currentPage: number;
  maxRows: Number;
}

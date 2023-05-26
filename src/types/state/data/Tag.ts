interface Tag {
  readonly id: number;
  readonly userId: number;
  readonly name: string;
  readonly resultsId?: number;
}

interface Tags {
  tags: Tag[];
  readonly error: {
    readonly code: string;
    readonly message: string;
  };
  readonly meta: {
    readonly currentPage: number;
    readonly perPage: number;
    readonly totalCount: number;
  };
}

export default Tags;

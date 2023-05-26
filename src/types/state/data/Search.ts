interface SearchResult {
  readonly id: number;
  readonly adWordsCount: number;
  readonly linksCount: number;
  readonly htmlPage: string;
  readonly totalResults: string;
}

export interface SearchResultWithTag extends SearchResult {
  tagName: string;
}

interface SearchResults {
  searchResults: SearchResult[];
  searchResult: SearchResult;
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

export default SearchResults;

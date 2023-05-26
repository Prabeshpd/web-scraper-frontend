interface SearchResults {
  readonly error: object;
  readonly errorCode: string;
  readonly isFetchSearchResultsFailed: boolean;
  readonly isLoadingFetchSearchResults: boolean;
  readonly isFetchResultFailed: boolean;
  readonly isLoadingFetchResult: boolean;
}

export default SearchResults;

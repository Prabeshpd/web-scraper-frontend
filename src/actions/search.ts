import { createAction } from 'redux-actions';

import { SearchResult } from '../types/Search';
import { Error, AxiosError } from '../types/Error';
import { PaginationMeta } from '../types/Pagination';
import * as searchService from '../services/results';
import { Action, ActionWithError, ActionWithPayload } from '../types/Actions';

export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export type FETCH_SEARCH_RESULTS = typeof FETCH_SEARCH_RESULTS;

export const FETCH_RESULT = 'FETCH_RESULT';
export type FETCH_RESULT = typeof FETCH_RESULT;

export const FETCH_SEARCH_RESULTS_PENDING = 'FETCH_SEARCH_RESULTS_PENDING';
export type FETCH_SEARCH_RESULTS_PENDING = typeof FETCH_SEARCH_RESULTS_PENDING;

export const FETCH_SEARCH_RESULTS_REJECTED = 'FETCH_SEARCH_RESULTS_REJECTED';
export type FETCH_SEARCH_RESULTS_REJECTED = typeof FETCH_SEARCH_RESULTS_REJECTED;

export const FETCH_SEARCH_RESULTS_FULFILLED = 'FETCH_SEARCH_RESULTS_FULFILLED';
export type FETCH_SEARCH_RESULTS_FULFILLED = typeof FETCH_SEARCH_RESULTS_FULFILLED;

export const FETCH_RESULT_PENDING = 'FETCH_RESULT_PENDING';
export type FETCH_RESULT_PENDING = typeof FETCH_RESULT_PENDING;

export const FETCH_RESULT_REJECTED = 'FETCH_RESULT_REJECTED';
export type FETCH_RESULT_REJECTED = typeof FETCH_RESULT_REJECTED;

export const FETCH_RESULT_FULFILLED = 'FETCH_RESULT_FULFILLED';
export type FETCH_RESULT_FULFILLED = typeof FETCH_RESULT_FULFILLED;

export type FetchSearchResultsPending = Action<FETCH_SEARCH_RESULTS_PENDING>;
export type FetchSearchResultsFulfilled = ActionWithPayload<
  FETCH_SEARCH_RESULTS_FULFILLED,
  { data: SearchResult[]; metadata: PaginationMeta }
>;
export type FetchSearchResultsRejected = ActionWithError<FETCH_SEARCH_RESULTS_REJECTED, AxiosError<Error>>;

export type FetchResultPending = Action<FETCH_RESULT_PENDING>;
export type FetchResultFulfilled = ActionWithPayload<FETCH_RESULT_FULFILLED, SearchResult>;
export type FetchResultRejected = ActionWithError<FETCH_RESULT_REJECTED, AxiosError<Error>>;

export type FetchResultActions = FetchResultPending | FetchResultFulfilled | FetchResultRejected;
export type FetchSearchResultsActions =
  | FetchSearchResultsPending
  | FetchSearchResultsFulfilled
  | FetchSearchResultsRejected;

export const fetchSearchResults = createAction(FETCH_SEARCH_RESULTS, searchService.getResults);
export const fetchResult = createAction(FETCH_RESULT, searchService.getResultsById);

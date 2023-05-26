import { SearchActions } from '../../actions';
import SearchState from '../../types/state/ui/Search';
import {
  FETCH_SEARCH_RESULTS_FULFILLED,
  FETCH_SEARCH_RESULTS_PENDING,
  FETCH_SEARCH_RESULTS_REJECTED,
  FETCH_RESULT_FULFILLED,
  FETCH_RESULT_PENDING,
  FETCH_RESULT_REJECTED,
} from '../../actions/search';

export const INITIAL_STATE: SearchState = {
  error: {},
  errorCode: '',
  isFetchSearchResultsFailed: false,
  isFetchResultFailed: false,
  isLoadingFetchResult: false,
  isLoadingFetchSearchResults: false,
};

export default function login(state: SearchState = INITIAL_STATE, action: SearchActions): SearchState {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_PENDING:
      return {
        ...state,
        isLoadingFetchSearchResults: true,
      };

    case FETCH_SEARCH_RESULTS_FULFILLED:
      return {
        ...state,
        isLoadingFetchSearchResults: false,
      };

    case FETCH_SEARCH_RESULTS_REJECTED:
      return {
        ...state,
        isLoadingFetchSearchResults: false,
        isFetchSearchResultsFailed: true,
        error: action.payload?.response?.data,
        errorCode: action.payload?.response?.data.code,
      };

    case FETCH_RESULT_PENDING:
      return {
        ...state,
        isLoadingFetchResult: true,
      };

    case FETCH_RESULT_FULFILLED:
      return {
        ...state,
        isLoadingFetchResult: false,
      };

    case FETCH_RESULT_REJECTED:
      return {
        ...state,
        isLoadingFetchResult: false,
        isFetchResultFailed: true,
        error: action.payload?.response?.data,
        errorCode: action.payload?.response?.data.code,
      };

    default:
      return state;
  }
}

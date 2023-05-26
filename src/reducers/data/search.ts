import { SearchActions } from '../../actions';
import SearchResultState from '../../types/state/data/Search';
import {
  FETCH_SEARCH_RESULTS_FULFILLED,
  FETCH_SEARCH_RESULTS_REJECTED,
  FETCH_RESULT_FULFILLED,
  FETCH_RESULT_REJECTED
} from '../../actions/search';

export const INITIAL_STATE: SearchResultState = {
  searchResults: [],
  searchResult: {
    id: 0,
    adWordsCount: 0,
    linksCount: 0,
    htmlPage: '',
    totalResults: ''
  },
  error: {
    code: '',
    message: ''
  },
  meta: {
    perPage: 0,
    currentPage: 0,
    totalCount: 0
  }
};

export default function (state: SearchResultState = INITIAL_STATE, action: SearchActions): SearchResultState {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_FULFILLED: {
      return {
        ...state,
        searchResults: action.payload.data,
        meta: { ...state.meta, ...action.payload.metadata }
      };
    }

    case FETCH_RESULT_FULFILLED: {
      return {
        ...state,
        searchResult: action.payload
      };
    }

    case FETCH_SEARCH_RESULTS_REJECTED:
    case FETCH_RESULT_REJECTED:
      return {
        ...state,
        error: {
          code: action.payload?.response?.data.code,
          message: action.payload?.response?.data.message
        }
      };

    default:
      return state;
  }
}

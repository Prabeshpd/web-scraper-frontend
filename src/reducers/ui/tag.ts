import { TagActions } from '../../actions';
import TagState from '../../types/state/ui/Tag';
import {
  FETCH_TAGS_FULFILLED,
  FETCH_TAGS_PENDING,
  FETCH_TAGS_REJECTED,
  UPLOAD_TAGS_FULFILLED,
  UPLOAD_TAGS_PENDING,
  UPLOAD_TAGS_REJECTED,
} from '../../actions/tag';

export const INITIAL_STATE: TagState = {
  error: {},
  errorCode: '',
  isFetchTagsFailed: false,
  isLoadingFetchTags: false,
  isLoadingUploadTags: false,
  isUploadTagsFailed: false,
};

export default function login(state: TagState = INITIAL_STATE, action: TagActions): TagState {
  switch (action.type) {
    case FETCH_TAGS_PENDING:
      return {
        ...state,
        isLoadingFetchTags: true,
      };

    case FETCH_TAGS_FULFILLED:
      return {
        ...state,
        isLoadingFetchTags: false,
      };

    case FETCH_TAGS_REJECTED:
      return {
        ...state,
        isLoadingFetchTags: false,
        isFetchTagsFailed: true,
        error: action.payload?.response?.data,
        errorCode: action.payload?.response?.data.code,
      };

    case UPLOAD_TAGS_PENDING:
      return {
        ...state,
        isLoadingUploadTags: true,
      };

    case UPLOAD_TAGS_FULFILLED:
      return {
        ...state,
        isLoadingUploadTags: false,
      };

    case UPLOAD_TAGS_REJECTED:
      return {
        ...state,
        isLoadingUploadTags: false,
        isUploadTagsFailed: true,
        error: action.payload?.response?.data,
        errorCode: action.payload?.response?.data.code,
      };

    default:
      return state;
  }
}

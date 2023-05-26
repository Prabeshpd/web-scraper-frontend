import { TagActions } from '../../actions';
import TagState from '../../types/state/data/Tag';
import { FETCH_TAGS_FULFILLED, FETCH_TAGS_REJECTED, UPLOAD_TAGS_REJECTED } from '../../actions/tag';

export const INITIAL_STATE: TagState = {
  tags: [],
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

export default function (state: TagState = INITIAL_STATE, action: TagActions): TagState {
  switch (action.type) {
    case FETCH_TAGS_FULFILLED: {
      return {
        ...state,
        tags: action.payload.data,
        meta: { ...state.meta, ...action.payload.metadata }
      };
    }

    case FETCH_TAGS_REJECTED:
    case UPLOAD_TAGS_REJECTED:
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

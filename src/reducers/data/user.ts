import { AuthActions } from '../../actions';
import UserState from '../../types/state/data/UserState';
import { LOGOUT_FULFILLED } from '../../actions/logout';
import { LOGIN_USER_REJECTED, LOGIN_USER_FULFILLED } from '../../actions/login';

export const INITIAL_STATE: UserState = {
  accessToken: '',
  refreshToken: '',
  error: {
    code: '',
    message: '',
  },
  isLoggedIn: false,
  user: {
    createdAt: '',
    email: '',
    name: '',
    id: 0,
    isActive: false,
    updatedAt: '',
  },
};

/**
 * Reducer for login.
 *
 * @param {UserState} [state = INITIAL_STATE]
 * @param {AuthActions} action
 * @returns {AppState}
 */
export default function (state: UserState = INITIAL_STATE, action: AuthActions): UserState {
  switch (action.type) {
    case LOGIN_USER_FULFILLED:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isLoggedIn: true,
      };

    case LOGIN_USER_REJECTED:
      return {
        ...state,
        error: {
          code: action.payload?.response?.data.code,
          message: action.payload?.response?.data.message,
        },
      };

    case LOGOUT_FULFILLED:
      return INITIAL_STATE;

    default:
      return state;
  }
}

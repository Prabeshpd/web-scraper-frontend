import { AuthActions } from '../../actions';
import LoginState from '../../types/state/ui/LoginState';
import { LOGOUT_PENDING, LOGOUT_FULFILLED } from '../../actions/logout';
import { LOGIN_USER_FULFILLED, LOGIN_USER_PENDING, LOGIN_USER_REJECTED } from '../../actions/login';

export const INITIAL_STATE: LoginState = {
  error: {},
  errorCode: '',
  isLoading: false,
  showError: false,
  isLoginFailed: false,
  isTokenVerified: false,
};

/**
 * Reducer for login UI.
 *
 * @param {LoginState} [state = INITIAL_STATE]
 * @param {AppActions} action
 * @returns {AppState}
 */
export default function login(state: LoginState = INITIAL_STATE, action: AuthActions): LoginState {
  switch (action.type) {
    case LOGIN_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };

    case LOGIN_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isLoginFailed: true,
        error: action.payload?.response?.data,
        errorCode: action.payload?.response?.data.code,
      };

    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case LOGOUT_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

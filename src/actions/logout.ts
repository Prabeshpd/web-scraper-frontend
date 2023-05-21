import { createAction } from 'redux-actions';

import * as authService from '../services/auth';
import { Action, ActionWithError, ActionWithPayload } from '../types/Actions';

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;

export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export type LOGOUT_PENDING = typeof LOGOUT_PENDING;

export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';
export type LOGOUT_FULFILLED = typeof LOGOUT_FULFILLED;

export const LOGOUT_REJECTED = 'LOGOUT_REJECTED';
export type LOGOUT_REJECTED = typeof LOGOUT_REJECTED;

export type LogoutPending = Action<LOGOUT_PENDING>;
export type LogoutRejected = ActionWithError<LOGOUT_REJECTED, any>;
export type LogoutFulfilled = ActionWithPayload<LOGOUT_FULFILLED, authService.LogoutResponse>;

export type LogoutActions = LogoutPending | LogoutRejected | LogoutFulfilled;

export const logout = createAction(LOGOUT, authService.logout);

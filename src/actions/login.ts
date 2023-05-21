import { createAction } from 'redux-actions';

import * as authService from '../services/auth';
import { LoginResponse } from '../types/Login';
import { Error, AxiosError } from '../types/Error';
import { Action, ActionWithError, ActionWithPayload } from '../types/Actions';

export const LOGIN_USER = 'LOGIN_USER';
export type LOGIN_USER = typeof LOGIN_USER;

export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export type LOGIN_USER_PENDING = typeof LOGIN_USER_PENDING;

export const LOGIN_USER_REJECTED = 'LOGIN_USER_REJECTED';
export type LOGIN_USER_REJECTED = typeof LOGIN_USER_REJECTED;

export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED';
export type LOGIN_USER_FULFILLED = typeof LOGIN_USER_FULFILLED;

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export type REFRESH_TOKEN = typeof REFRESH_TOKEN;

export const REFRESH_TOKEN_PENDING = 'REFRESH_TOKEN_PENDING';
export type REFRESH_TOKEN_PENDING = typeof REFRESH_TOKEN_PENDING;

export const REFRESH_TOKEN_FULFILLED = 'REFRESH_TOKEN_FULFILLED';
export type REFRESH_TOKEN_FULFILLED = typeof REFRESH_TOKEN_FULFILLED;

export const REFRESH_TOKEN_REJECTED = 'REFRESH_TOKEN_REJECTED';
export type REFRESH_TOKEN_REJECTED = typeof REFRESH_TOKEN_REJECTED;

export type LoginUserPending = Action<LOGIN_USER_PENDING>;
export type LoginUserFulfilled = ActionWithPayload<LOGIN_USER_FULFILLED, LoginResponse>;
export type LoginUserRejected = ActionWithError<LOGIN_USER_REJECTED, AxiosError<Error>>;

export type RefreshTokenPending = Action<REFRESH_TOKEN_PENDING>;
export type RefreshTokenFulfilled = ActionWithPayload<REFRESH_TOKEN_FULFILLED, any>;
export type RefreshTokenRejected = ActionWithError<REFRESH_TOKEN_REJECTED, AxiosError<Error>>;

export type LoginActions = LoginUserPending | LoginUserFulfilled | LoginUserRejected;
export type RefreshTokenActions = RefreshTokenPending | RefreshTokenFulfilled | RefreshTokenRejected;

export const loginUser = createAction(LOGIN_USER, authService.login);
export const refreshToken = createAction(REFRESH_TOKEN, authService.refreshAccessToken);

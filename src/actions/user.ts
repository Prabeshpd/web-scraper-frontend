import { createAction } from 'redux-actions';

import * as userService from '../services/user';
import { Error, AxiosError } from '../types/Error';
import { Action, ActionWithError } from '../types/Actions';

export const CREATE_USER = 'CREATE_USER';
export type CREATE_USER = typeof CREATE_USER;

export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export type CREATE_USER_PENDING = typeof CREATE_USER_PENDING;

export const CREATE_USER_FULFILLED = 'CREATE_USER_FULFILLED';
export type CREATE_USER_FULFILLED = typeof CREATE_USER_FULFILLED;

export const CREATE_USER_REJECTED = 'CREATE_USER_REJECTED';
export type CREATE_USER_REJECTED = typeof CREATE_USER_REJECTED;

export type CreateUserPending = Action<CREATE_USER_PENDING>;
export type CreateUserFulfilled = Action<CREATE_USER_FULFILLED>;
export type CreateUserRejected = ActionWithError<CREATE_USER_REJECTED, AxiosError<Error>>;

export const createUser = createAction(CREATE_USER, userService.createUser);

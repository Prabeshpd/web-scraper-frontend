import { createAction } from 'redux-actions';

import { Tag } from '../types/Tag';
import * as tagsService from '../services/tags';
import { Error, AxiosError } from '../types/Error';
import { Action, ActionWithError, ActionWithPayload } from '../types/Actions';
import { PaginationMeta } from '../types/Pagination';

export const UPLOAD_TAGS = 'UPLOAD_TAGS';
export type UPLOAD_TAGS = typeof UPLOAD_TAGS;

export const FETCH_TAGS = 'FETCH_TAGS';
export type FETCH_TAGS = typeof FETCH_TAGS;

export const UPLOAD_TAGS_PENDING = 'UPLOAD_TAGS_PENDING';
export type UPLOAD_TAGS_PENDING = typeof UPLOAD_TAGS_PENDING;

export const UPLOAD_TAGS_REJECTED = 'UPLOAD_TAGS_REJECTED';
export type UPLOAD_TAGS_REJECTED = typeof UPLOAD_TAGS_REJECTED;

export const UPLOAD_TAGS_FULFILLED = 'UPLOAD_TAGS_FULFILLED';
export type UPLOAD_TAGS_FULFILLED = typeof UPLOAD_TAGS_FULFILLED;

export type UploadTagsPending = Action<UPLOAD_TAGS_PENDING>;
export type UploadTagsFulfilled = Action<UPLOAD_TAGS_FULFILLED>;
export type UploadTagsRejected = ActionWithError<UPLOAD_TAGS_REJECTED, AxiosError<Error>>;

export const FETCH_TAGS_PENDING = 'FETCH_TAGS_PENDING';
export type FETCH_TAGS_PENDING = typeof FETCH_TAGS_PENDING;

export const FETCH_TAGS_REJECTED = 'FETCH_TAGS_REJECTED';
export type FETCH_TAGS_REJECTED = typeof FETCH_TAGS_REJECTED;

export const FETCH_TAGS_FULFILLED = 'FETCH_TAGS_FULFILLED';
export type FETCH_TAGS_FULFILLED = typeof FETCH_TAGS_FULFILLED;

export type FetchTagsPending = Action<FETCH_TAGS_PENDING>;
export type FetchTagsFulfilled = ActionWithPayload<FETCH_TAGS_FULFILLED, { data: Tag[]; metadata: PaginationMeta }>;
export type FetchTagsRejected = ActionWithError<FETCH_TAGS_REJECTED, AxiosError<Error>>;

export type UploadTagsActions = UploadTagsPending | UploadTagsFulfilled | UploadTagsRejected;
export type FetchTagsActions = FetchTagsPending | FetchTagsFulfilled | FetchTagsRejected;

export const uploadTags = createAction(UPLOAD_TAGS, tagsService.uploadTags);
export const fetchTags = createAction(FETCH_TAGS, tagsService.getTags);

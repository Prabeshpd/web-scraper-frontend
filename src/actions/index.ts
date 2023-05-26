import { LogoutActions } from './logout';
import { LoginActions, RefreshTokenActions } from './login';
import { UploadTagsActions, FetchTagsActions } from './tag';
import { FetchSearchResultsActions, FetchResultActions } from './search'

export type AuthActions = LoginActions | RefreshTokenActions | LogoutActions;
export type TagActions = UploadTagsActions | FetchTagsActions;
export type SearchActions = FetchSearchResultsActions | FetchResultActions;

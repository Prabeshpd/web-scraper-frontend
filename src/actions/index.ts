import { LogoutActions } from './logout';
import { LoginActions, RefreshTokenActions } from './login';

export type AuthActions = LoginActions | RefreshTokenActions | LogoutActions;

import AppState from './AppState';
import LoginState from './LoginState';

interface UI {
  readonly app: AppState;
  readonly login: LoginState;
}

export default UI;

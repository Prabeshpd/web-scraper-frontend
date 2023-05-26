import AppState from './AppState';
import LoginState from './LoginState';
import Tags from './Tag';
import SearchResults from './Search';

interface UI {
  readonly app: AppState;
  readonly login: LoginState;
  readonly tags: Tags;
  readonly searchResults: SearchResults;
}

export default UI;

import UserState from './UserState';
import Tags from './Tag';
import SearchResults from './Search';

interface DataState {
  readonly user: UserState;
  readonly tags: Tags;
  readonly searchResults: SearchResults;
}

export default DataState;

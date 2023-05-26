import { combineReducers } from 'redux';

import login from './Login';
import tags from './tag';
import searchResults from './search';

const uiReducers = combineReducers({ login, tags, searchResults });

export default uiReducers;

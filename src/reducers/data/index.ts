import { combineReducers } from 'redux';

import user from './user';
import tags from './tag';
import searchResults from './search';

const dataReducers = combineReducers({ user, tags, searchResults });

export default dataReducers;

import { combineReducers } from 'redux';

import data from './data';
import ui from './ui';
/**
 * Application root reducer.
 */
const rootReducer = combineReducers({
  data,
  ui,
});

/**
 * Reset state to default for LOGOUT action.
 *
 * @param {any} state
 * @param {any} action
 */
export default (state: any, action: any) => {
  const value = rootReducer(state, action);

  if (action.type === 'LOGOUT_FULFILLED') {
    localStorage.removeItem('persist:root');
    return rootReducer(undefined, action);
  }

  return value;
};

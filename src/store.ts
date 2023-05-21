import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './reducers/rootReducer';

const middlewares = [thunk, promiseMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

if (window['__REDUX_DEVTOOLS_EXTENSION__']) {
  enhancers.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create redux store
const store = createStore(persistedReducer, compose(...enhancers));

export const persistor = persistStore(store);

export default store;

import * as React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import 'font-awesome/css/font-awesome.css';
import 'foundation-sites/dist/css/foundation.min.css';
import './global.css';

import store, { persistor } from './store';

import Routes from './components/router';

import http from './utils/http';
import * as interceptors from './utils/interceptors';

const container = document.getElementById('app');
const root = createRoot(container!);
function initInterceptors() {
  http.interceptors.response.use(
    /**
     * Leave response as it is.
     *
     * @param {any} response
     */
    (response) => response,
    /**
     * This interceptor checks if the response had a 401 status code, which means
     * that the access token used for the request has expired. It then refreshes
     * the access token and resends the original request.
     */
    interceptors.unauthorizedResponseHandlerInterceptor
  );
  http.interceptors.request.use(interceptors.authorizationInterceptor);
  http.interceptors.request.use(
    /**
     * Leave Error as it is.
     *
     * @param {any} err
     */
    (err) => err
  );
}
initInterceptors();

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div id="app">
        <Routes />
      </div>
    </PersistGate>
  </Provider>
);

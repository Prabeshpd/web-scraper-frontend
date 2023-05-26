import * as React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'font-awesome/css/font-awesome.css';
import 'foundation-sites/dist/css/foundation.min.css';
import './global.css';

import store, { persistor } from './store';

import Routes from './components/router';

import http, { httpFile } from './utils/http';
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
  httpFile.interceptors.response.use(
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
  httpFile.interceptors.request.use(interceptors.authorizationInterceptor);
  httpFile.interceptors.request.use(
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
        <ToastContainer />
      </div>
    </PersistGate>
  </Provider>
);

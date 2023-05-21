import { AxiosPromise } from 'axios';

import store from '../store';
import config from '../config';
import http from '../utils/http';
import AppState from '../types/state/AppState';
import { LoginRequest, LoginResponse } from '../types/Login';

/**
 * These variables are used to check for multiple requests for refresh token.
 */
let isRefreshTokenFetching = false;
let refreshTokenResponse: any = null;

/**
 * GET request to verify tokens obtained from URLs.
 *
 * @param {string} param - Stringified query params.
 * @returns {Promise}
 */
export async function verifyToken(param: string) {
  const url = config.endpoints.verifyToken + param;
  const { data } = await http.get(url);

  return data;
}

/**
 * Sends http request for login.
 *
 * @param {LoginPayload} payload
 * @returns {Promise<LoginResponse>}
 */
export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const url = config.endpoints.login;
  const { data } = await http.post(url, payload);

  return {
    ...data.data,
    sessionStartedOn: new Date().toString()
  };
}

/**
 * Get a new access token to refresh the session. If a request is already in progress,
 * return the pending request with out making a new request.
 *
 * @param {boolean} [shouldUpdateScopes=false]
 * @returns {Promise<AxiosPromise<any>>}
 */
export function refreshAccessToken(): Promise<AxiosPromise<any>> {
  const url = config.endpoints.refresh;
  const appState = store.getState() as unknown as AppState;
  const refreshToken = appState.data.user.refreshToken;

  if (refreshToken && !isRefreshTokenFetching) {
    isRefreshTokenFetching = true;

    const params = {
      refreshToken
    };

    refreshTokenResponse = http
      .post(url, params)
      .then((response) => {
        isRefreshTokenFetching = false;
        return response.data.data.accessToken;
      })
      .catch((err) => {
        console.log({ err });
        isRefreshTokenFetching = false;

        throw err;
      });
  }

  return refreshTokenResponse;
}

export interface LogoutResponse {
  code: number;
  message: string | null;
}

/**
 * Log the current user out.
 *
 * @param {boolean} force
 * @returns {Promise<LogoutResponse | boolean>}
 */
export async function logout({ force }: { force: boolean }): Promise<LogoutResponse | boolean> {
  const url = config.endpoints.logout;
  const appState = store.getState() as unknown as AppState;
  const refreshToken = appState.data.user.refreshToken;

  if (!force) {
    const param = { refreshToken };
    let response;
    try {
      response = await http.post(url, param);
      localStorage.clear();
      localStorage.removeItem('persist:root');
    } catch {
      return Promise.resolve(true);
    }

    return {
      ...response.data
    };
  }

  localStorage.clear();
  localStorage.removeItem('persist:root');

  return Promise.resolve(true);
}

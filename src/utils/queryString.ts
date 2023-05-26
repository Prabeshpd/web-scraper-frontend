import * as qs from 'qs';

/**
 * Convert URL query string to object.
 *
 * @param {string} queryString
 * @returns {T}
 */
export function parse<T>(queryString: string) {
  if (queryString.substr(0, 1) === '?') {
    queryString = queryString.substr(1);
  }

  return qs.parse(queryString);
}

/**
 * Convert URL query params to string.
 *
 * @param {any} queryParams
 * @param {string} prefix
 * @returns {string}
 */
export function stringify(queryParams: any, prefix: string = '?'): string {
  const queryString = qs.stringify(queryParams);

  return `${prefix}${queryString}`;
}

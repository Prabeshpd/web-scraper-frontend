import camelize from 'camelize';
import snakeize from 'snakeize';

/**
 * Recursively convert the object keys into camelCase.
 *
 * @param {any} object
 * @returns {T}
 */
export function toCamelCase<T>(object: any): T {
  return camelize(object);
}

/**
 * Recursively convert the object keys into snake_case.
 *
 * @param {any} object
 * @returns {T}
 */
export function toSnakeCase<T>(object: any): T {
  return snakeize(object);
}

import { SignupPayload } from '../types/Signup';

import config from '../config';
import http from '../utils/http';
import { toSnakeCase } from '../utils/object';

export async function createUser(payload: SignupPayload) {
  const url = config.endpoints.createUser;
  const { data } = await http.post(url, toSnakeCase(payload));

  return data;
}

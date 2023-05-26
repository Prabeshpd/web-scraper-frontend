import config from '../config';
import http, { httpFile } from '../utils/http';
import * as qs from '../utils/queryString';
import { PageParams } from '../types/Pagination';

export async function getTags(pageParams: PageParams) {
  const queryString = (pageParams && qs.stringify(pageParams)) || '';
  const url = config.endpoints.getTags + queryString;
  const { data } = await http.get(url);

  return data;
}

export async function uploadTags(file: FormData) {
  const url = config.endpoints.uploadTags;
  const { data } = await httpFile.post(url, file);

  return data;
}

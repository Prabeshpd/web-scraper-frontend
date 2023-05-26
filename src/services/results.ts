import pinterpolate from 'pinterpolate';

import config from '../config';
import http from '../utils/http';
import * as qs from '../utils/queryString';
import { PageParams } from '../types/Pagination';

export async function getResults(pageParams: PageParams) {
  const queryString = (pageParams && qs.stringify(pageParams)) || '';
  const url = config.endpoints.getSearchResults + queryString;
  const { data } = await http.get(url);

  return data;
}

export async function getResultsById(id: number) {
  const url = pinterpolate(config.endpoints.getSearchResultById, { id });
  const { data } = await http.get(url);

  return data;
}

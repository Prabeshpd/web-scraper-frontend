import axios from 'axios';
import config from '../config';

const http = axios.create({
  baseURL: config.baseURI,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const httpFile = axios.create({
  baseURL: config.baseURI,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export default http;

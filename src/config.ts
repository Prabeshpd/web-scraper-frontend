export interface Config {
  nodeEnv?: string;
  env?: string;
  baseURI: string;
  endpoints: {
    refresh: string;
    login: string;
    logout: string;
    verifyToken: string;
    createUser: string;
    uploadTags: string;
    getTags: string;
    getSearchResults: string
    getSearchResultById: string;
  };
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.REACT_APP_ENV || 'dev',
  baseURI: 'http://localhost:3000/api/v1',
  endpoints: {
    // Auth
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verifyToken: '/auth/verifyToken',

    //User
    createUser: '/users',

    //results
    uploadTags: '/tags',
    getTags: '/tags',
    getSearchResults: '/searchResults',
    getSearchResultById: '/searchResults/:id'
  }
};

export default config;

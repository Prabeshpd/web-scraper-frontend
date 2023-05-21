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
  };
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.REACT_APP_ENV || 'dev',
  baseURI: `${process.env.REACT_APP_API_BASE_URI}`,
  endpoints: {
    // Auth
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verifyToken: '/auth/verifyToken',

    //User
    createUser: '/users'
  }
};

export default config;

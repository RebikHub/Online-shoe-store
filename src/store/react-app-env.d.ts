declare namespace NodeJS {
  interface ProcessEnv {
     //types of envs
      // NODE_ENV: 'development' | 'production' | 'test';
      REACT_APP_URL_API_TOP: string;
      REACT_APP_URL_API_CATEGORIES: string;
      REACT_APP_URL_API_ITEMS: string;
      REACT_APP_URL_API_ORDER: string;
  }
}
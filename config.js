// TODO: should we change utils folder?
import getEnvVaribale from './app/utils/env';

const CONFIG = {
  production: {
    API_HOST: 'http://api.scary-stories.ru',
    HOST: 'http://scary-stories.ru',
    SSR: true,
  },
  development: {
    API_HOST: 'http://localhost:3001',
    HOST: 'http://localhost:3000',
    SSR: true,
  },
};

export default CONFIG[getEnvVaribale()];

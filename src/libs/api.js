import { createAxios } from '@blocklet/js-sdk';

const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status !== 200) {
      return Promise.reject(`${error.response.data.error}`);
    }
    return Promise.reject(error);
  },
);

export default api;

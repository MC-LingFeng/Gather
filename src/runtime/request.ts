import type { RequestConfig, RequestOptions } from '@umijs/max';
import { AxiosResponse } from '@umijs/max';

const request: RequestConfig = {
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = window.sessionStorage.getItem('token');
      // const username = window.sessionStorage.getItem('username')

      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` },
      };
    },
  ],
  responseInterceptors: [
    (response: AxiosResponse<any>) => {
      const data = response.data;

      if (data.code === 401) {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('username');
      }
      // const token = response.headers['access-token']

      // if ((token === 'undefined' || token === 'null') && (url?.indexOf('/login') === -1 || url?.indexOf('/register') === -1)) {
      //   window.sessionStorage.removeItem('token');
      //   window.sessionStorage.removeItem('username');
      // } else {
      //   window.sessionStorage.setItem('token', token);
      // }

      return response;
    },
  ],
};

export default request;

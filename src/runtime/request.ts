import type { RequestConfig, RequestOptions } from '@umijs/max';
import { AxiosResponse } from '@umijs/max';

  const request:RequestConfig = {
    requestInterceptors:[
      (config: RequestOptions) => {

      const token = window.sessionStorage.getItem('token')
      const username = window.sessionStorage.getItem('username')
        
        return {
          ...config,
          headers: { ...config.headers, token, tokenName: username }
        } ;
      }
    ],
    responseInterceptors: [
    (response: AxiosResponse<any>) => {
      const url = response.config.url;
      const token = response.headers['access-token']
      
      if ((token === 'undefined' || token === 'null') && (url?.indexOf('/login') === -1 || url?.indexOf('/register') === -1)) {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('username');
      } else {
        window.sessionStorage.setItem('token', token);
      }

      return response
    }
    ]

  };

export default request
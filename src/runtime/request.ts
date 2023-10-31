import type { RequestConfig, RequestOptions } from '@umijs/max';
import { AxiosResponse } from '@umijs/max';

  const request:RequestConfig = {
    requestInterceptors:[
      (config: RequestOptions) => {
        return {
          ...config,
          headers: { ...config.headers, token: '123456' }
        } ;
      }
    ],
    responseInterceptors: [
    (response: AxiosResponse<any>) => {
      console.log(response);
      
      return response
    }
    ]

  };

export default request
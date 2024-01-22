import { AxiosRequestConfig, AxiosPromise } from 'axios';

import { instance } from 'libs/axios';

export const login = <T>(data: T): AxiosPromise => {
  const request: AxiosRequestConfig = {
    url: 'login',
    method: 'POST',
    data,
  };

  return instance(request);
};

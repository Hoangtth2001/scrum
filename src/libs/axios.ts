import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import COOKIES_KEY, { getCookieByKey, setCookieByKeyObject } from 'utils/cookies';
import { openSnackbar } from 'redux/slice/snackbar.slice';
import { logout } from 'redux/slice/auth.slice';
import HTTP_CODE from 'configs/httpCode';
import { store } from 'redux/store';

const handleError = (errorMessage: string) => {
  store.dispatch(
    openSnackbar({
      open: true,
      message: errorMessage,
      variant: 'alert',
      close: true,
      alert: { color: 'error' },
    }),
  );
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT_URL,
  timeout: 5000,
  withCredentials: true,
});

const injectStore = (storeInjected: typeof store): void => {
  instance.interceptors.request.use(
    defaultConfig => {
      const accessToken = getCookieByKey(COOKIES_KEY.TOKEN);

      defaultConfig.headers.setAuthorization(`Bearer ${accessToken}`);

      return defaultConfig;
    },
    error => {
      delete axios.defaults.headers.common['Authorization'];
      Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status) {
        if (error.response?.status === 401) {
          const tokenId = getCookieByKey(COOKIES_KEY.REFRESHTOKEN);
          const refreshToken = await instance('Api.auth.refreshToken', { method: 'GET', params: { tokenId } });
          if (isEmpty(refreshToken.data)) {
            store.dispatch(logout());
            return;
          }
          setCookieByKeyObject(refreshToken.data);
          location.reload();
          return;
        }
        const responseError = error.response?.data;
        const errorMsg = responseError.result?.messages[0]
          ? responseError.result.messages[0].message
          : Object.prototype.hasOwnProperty.call(HTTP_CODE, error.response.status)
          ? HTTP_CODE[error.response.status as keyof typeof HTTP_CODE]
          : error.message;
        handleError(errorMsg);
      } else {
        handleError(error.message);
      }

      if (error.response.status === 401) {
        storeInjected.dispatch(logout());
      }
      return Promise.reject(error);
    },
  );
};

export default injectStore;

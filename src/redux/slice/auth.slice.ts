import { createSlice } from '@reduxjs/toolkit';

import COOKIES_KEY, { clearAllCookies, getCookieByKey } from 'utils/cookies';
import { login } from '../thunk/auth.thunk';
import { RootState } from 'types/redux';

type InitialState = {
  isLogin: boolean;
  loading: {
    [key: string]: boolean;
  };
  err?: string;
};

const initialState: InitialState = {
  isLogin: getCookieByKey(COOKIES_KEY.USERINFO) ? JSON.parse(getCookieByKey(COOKIES_KEY.USERINFO)).isLogin : false,
  loading: {},
};

export const authSlice = createSlice({
  name: 'auth-container',
  initialState,
  reducers: {
    logout: state => {
      state.isLogin = false;
      clearAllCookies();
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading[login.typePrefix] = true;
    });
    builder.addCase(login.fulfilled, state => {
      state.isLogin = true;
      state.loading[login.typePrefix] = false;
    });
    builder.addCase(login.rejected, state => {
      state.loading[login.typePrefix] = false;
    });
  },
});

export const { logout } = authSlice.actions;

export const authSelector = (state: RootState): typeof state.authReducer => state.authReducer;

export default authSlice.reducer;

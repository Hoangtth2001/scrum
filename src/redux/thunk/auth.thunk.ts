import { createAsyncThunk } from '@reduxjs/toolkit';

// import * as services from 'services/auth.service';
import { setLoginCookies } from 'utils/cookies';
import { ThunkAPI } from 'types/redux';
import * as Types from 'types/user';

export const login = createAsyncThunk<Types.LoginResponse, Types.LoginRequest, ThunkAPI>(
  'redux/thunk/auth.thunk/login',
  async (_req, { rejectWithValue }) => {
    try {
      // const {data} = await services.login<Types.LoginRequest>(req);

      await new Promise(resolve => setTimeout(resolve, 3000));

      setLoginCookies({
        userInfo: {
          isLogin: true,
        },
      });
      return { isLogin: true };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

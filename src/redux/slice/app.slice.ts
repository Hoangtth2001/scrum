import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'types/redux';

type InitialState = {
  modeTheme: string;
  language: string;
  isMultipleLanguage: boolean;
};

const initialState: InitialState = {
  modeTheme: process.env.REACT_APP_THEME,
  language: process.env.REACT_APP_LANGUAGE,
  isMultipleLanguage: false,
};

export const appSlice = createSlice({
  name: 'app-container',
  initialState,
  reducers: {
    setModeTheme: (state, action: PayloadAction<string>) => {
      state.modeTheme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setIsMultipleLanguage: (state, action: PayloadAction<boolean>) => {
      state.isMultipleLanguage = action.payload;
    },
  },
});

export const { setModeTheme, setLanguage, setIsMultipleLanguage } = appSlice.actions;

export const appSelector = (state: RootState): typeof state.appReducer => state.appReducer;

export default appSlice.reducer;

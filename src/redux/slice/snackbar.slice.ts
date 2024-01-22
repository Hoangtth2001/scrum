import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SnackbarProps } from 'types/common';
import { RootState } from 'types/redux';

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  variant: 'default',
  alert: {
    color: 'info',
    variant: 'filled',
  },
  transition: 'Fade',
  close: true,
  actionButton: false,
};

const snackbarSlice = createSlice({
  name: 'snackbar-container',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<Partial<SnackbarProps>>) => {
      const { open, message, anchorOrigin, variant, alert, transition, close, actionButton } = action.payload;
      state.action = !state.action;
      state.open = open || initialState.open;
      state.message = message || initialState.message;
      state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
      state.variant = variant || initialState.variant;
      state.alert = {
        color: alert?.color || initialState.alert.color,
        variant: alert?.variant || initialState.alert.variant,
      };
      state.transition = transition || initialState.transition;
      state.close = close ?? initialState.close;
      state.actionButton = actionButton || initialState.actionButton;
    },

    closeSnackbar: state => {
      state.open = false;
    },
  },
});

export const { closeSnackbar, openSnackbar } = snackbarSlice.actions;

export const snackbarSelector = (state: RootState): typeof state.snackbarReducer => state.snackbarReducer;

export default snackbarSlice.reducer;

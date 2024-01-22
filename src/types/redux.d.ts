import { AxiosError } from 'axios';

import { store } from 'redux/store';

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type ThunkAPI<E = Error> = {
  state?: RootState;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: AxiosError<E>;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

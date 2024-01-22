import { AlertProps, SnackbarOrigin } from '@mui/material';

type IOption = {
  key?: string;
  label: string;
  value: string | number;
  disabled?: boolean;
};

type ICheckboxGroupOption = {
  [key: IOption['value']]: IOption['label'];
};

type IOrder = 'asc' | 'desc';

type IPagination = {
  perPage: number;
  totalPage: number;
  pageIndex: number;
  order: IOrder;
  orderBy: string;
  handleRequestSort: (property: string) => () => void;
  changePage: (value: number) => void;
  changePerPage: (value: number) => void;
};

type SnackbarProps = {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: SnackbarOrigin;
  variant: string;
  alert: AlertProps;
  transition: string;
  close: boolean;
  actionButton: boolean;
};

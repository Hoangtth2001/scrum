import React from 'react';
import { LocalizationProvider, DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import vnLocale from 'date-fns/locale/vi';
import { TextField } from '@mui/material';

import FormattedMessage from 'components/FormattedMessage';
import { DATE_FORMAT } from 'configs';
import Label from './Label';

type Props = {
  name: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  onChange?: (date: string) => void;
};

const DatePicker: React.FC<Props> = ({ name, label, disabled, required, onChange }) => {
  const methods = useFormContext();

  const formatDay = (day: string) => {
    return day.toString();
  };

  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Label name={name} label={label} required={required} />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vnLocale}>
            <MuiDatePicker
              {...field}
              format={DATE_FORMAT.ddMMyyyy}
              dayOfWeekFormatter={day => formatDay(day)}
              value={field.value}
              onChange={date => {
                field.onChange(date);
                onChange?.(date);
              }}
              disabled={disabled}
              slotProps={{
                textField: textFieldProps => (
                  <TextField
                    {...textFieldProps}
                    size="small"
                    inputProps={{ ...textFieldProps.inputProps, readOnly: true }}
                    fullWidth
                    error={!!error}
                    helperText={error && <FormattedMessage id={error.message} />}
                  />
                ),
                actionBar: {
                  actions: ['clear', 'accept'],
                },
              }}
            />
          </LocalizationProvider>
        </>
      )}
    />
  );
};

export default DatePicker;

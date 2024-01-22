import React, { ChangeEvent, ReactNode, memo } from 'react';
import { SxProps, TextField, TextFieldProps, Theme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import FormattedMessage from 'components/FormattedMessage';
import { removeExtraSpace } from 'utils/common';
import Label from './Label';

interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> {
  name: string;
  label?: string | ReactNode;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
  required?: boolean;
  onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

const Input: React.FC<IInputProps> = ({
  name,
  label,
  disabled,
  textFieldProps,
  required,
  type,
  onChangeInput,
  placeholder,
  sx,
}) => {
  const methods = useFormContext();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
        <>
          <Label name={name} label={label} required={required} />
          <TextField
            type={type}
            id={name}
            {...field}
            value={value}
            size="small"
            disabled={disabled}
            onBlur={() => onChange(removeExtraSpace(value))}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChange(e);
              onChangeInput?.(e);
            }}
            fullWidth
            placeholder={placeholder}
            error={!!error}
            helperText={error && <FormattedMessage id={error.message} />}
            inputRef={ref}
            sx={sx}
            {...textFieldProps}
          />
        </>
      )}
    />
  );
};

export default memo(Input);

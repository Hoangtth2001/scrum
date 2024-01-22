import React, { ReactNode } from 'react';
import { CheckboxProps, Checkbox as MuiCheckBox, FormControlLabel, SxProps, Theme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> {
  name: string;
  label?: string | ReactNode;
  disabled?: boolean;
  checkboxProps?: CheckboxProps;
  isControl: boolean;
  valueChecked?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  sx?: SxProps<Theme>;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  name,
  label,
  disabled,
  checkboxProps,
  isControl = true,
  valueChecked,
  handleChange,
  indeterminate,
  sx,
}) => {
  const methods = useFormContext();

  return isControl ? (
    <Controller
      name={name}
      control={methods.control}
      render={({ field: { onChange, value } }) => (
        <>
          <FormControlLabel
            sx={sx}
            label={label}
            control={
              <MuiCheckBox
                id={name}
                {...checkboxProps}
                disabled={disabled}
                checked={value}
                onChange={e => {
                  onChange(e);
                  handleChange && handleChange(e);
                }}
              />
            }
          />
        </>
      )}
    />
  ) : (
    <FormControlLabel
      label={label}
      sx={sx}
      control={
        <MuiCheckBox
          id={name}
          {...checkboxProps}
          disabled={disabled}
          checked={valueChecked}
          onChange={handleChange}
          indeterminate={indeterminate}
        />
      }
    />
  );
};

export default Checkbox;

import React from 'react';
import { FormHelperText, MenuItem, Select as MuiSelect, SelectChangeEvent, SelectProps, styled } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import FormattedMessage from 'components/FormattedMessage';
import { IOption } from 'types/common';
import Label from './Label';

interface ISelectProps {
  name: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
  selects: IOption[];
  other?: SelectProps;
  handleChangeFullOption?: (option: IOption) => void;
  isMultipleLanguage?: boolean;
  required?: boolean;
}

const SelectWrapper = styled('div')({
  position: 'relative',
  width: '100%',
});

const Select: React.FC<ISelectProps> = ({
  name,
  label,
  handleChange,
  handleChangeFullOption,
  selects,
  disabled,
  isMultipleLanguage,
  required,
  ...other
}) => {
  const methods = useFormContext();

  // Events
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
    handleChange && handleChange(event);
  };

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
        <SelectWrapper>
          <Label name={name} label={label} required={required} />
          <MuiSelect
            {...field}
            {...other}
            disabled={disabled}
            displayEmpty
            size="small"
            onChange={event => {
              handleChangeSelect(event);
              onChange(event.target.value);
            }}
            error={!!error}
            fullWidth
            value={value}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 250,
                },
              },
            }}
            ref={ref}>
            {selects?.map((option: IOption, key) => (
              <MenuItem
                key={key}
                value={option.value}
                disabled={option?.disabled}
                onClick={() => handleChangeFullOption && handleChangeFullOption(option)}>
                {isMultipleLanguage || !option.value ? <FormattedMessage id={option.label} /> : option.label}
              </MenuItem>
            ))}
          </MuiSelect>
          <FormHelperText sx={{ color: '#f44336' }}>
            {error?.message ? <FormattedMessage id={error.message} /> : null}
          </FormHelperText>
        </SelectWrapper>
      )}
    />
  );
};

export default Select;

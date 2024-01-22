import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import FormattedMessage from 'components/FormattedMessage';
import { IOption } from 'types/common';
import Label from './Label';

type Props = {
  name: string;
  label?: string | React.ReactNode;
  options: IOption[];
  disabled?: boolean;
  handleChange?: (data: IOption | IOption[] | null) => void;
  handleClose?: () => void;
  groupBy?: (option: IOption) => string;
  isDisableClearable?: boolean;
  isDefaultAll?: boolean;
  required?: boolean;
  multiple?: boolean;
};

const Autocomplete: React.FC<Props> = ({
  name,
  label,
  options,
  handleChange,
  handleClose,
  groupBy,
  disabled,
  isDisableClearable,
  isDefaultAll,
  required,
  multiple,
  ...other
}) => {
  const intl = useIntl();

  const methods = useFormContext();

  const placeholder = !isDefaultAll
    ? intl.formatMessage({ id: 'select-all' })
    : intl.formatMessage({ id: 'select-option' });

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
        <>
          <Label name={name} label={label} required={required} />
          <MuiAutocomplete
            id={name}
            {...other}
            disablePortal
            disabled={disabled}
            value={value}
            onChange={(_, data) => {
              onChange(data);
              handleChange && handleChange(data);
              if (!data) {
                handleClose?.();
              }
            }}
            multiple={multiple}
            autoComplete={true}
            disableClearable={isDisableClearable}
            options={options}
            renderOption={(props, item) => (
              <span {...props} key={item.key}>
                {item.label}
              </span>
            )}
            groupBy={groupBy}
            isOptionEqualToValue={(option, v) => option === v}
            getOptionLabel={option => option.label}
            renderInput={params => (
              <TextField
                error={!!error}
                helperText={error && <FormattedMessage id="required" />}
                {...params}
                {...field}
                inputRef={ref}
                size="small"
                fullWidth
                placeholder={placeholder}
              />
            )}
          />
        </>
      )}
    />
  );
};

export default Autocomplete;

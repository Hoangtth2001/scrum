import React from 'react';
import { FormControlLabel, RadioGroup as MuiRadioGroup, Radio as MuiRadio, Stack, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import FormattedMessage from 'components/FormattedMessage';
import { IOption } from 'types/common';
import Label from './Label';

type Props = {
  name: string;
  label?: string;
  required?: boolean;
  options: IOption[];
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isMultiLanguage?: boolean;
};

const Radio: React.FC<Props> = ({ name, label, required, options, handleChange, isMultiLanguage = true }) => {
  const methods = useFormContext();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field, fieldState: { error } }) => (
        <>
          {label && <Label name={name} label={<FormattedMessage id={label} />} required={required} />}
          <MuiRadioGroup
            {...field}
            onChange={e => {
              field.onChange(e);
              handleChange && handleChange(e);
            }}>
            <Stack direction="row" alignItems="center">
              {options.map((op, index) => (
                <FormControlLabel
                  key={index}
                  value={op.value}
                  control={<MuiRadio />}
                  label={isMultiLanguage ? <FormattedMessage id={op.label} /> : op.label}
                  disabled={op?.disabled}
                />
              ))}
            </Stack>
            {error ? (
              <FormHelperText sx={{ color: '#f44336' }}>
                <FormattedMessage id={error.message} />
              </FormHelperText>
            ) : null}
          </MuiRadioGroup>
        </>
      )}
    />
  );
};

export default Radio;

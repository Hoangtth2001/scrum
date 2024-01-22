import React from 'react';

import { InputLabel, InputLabelProps } from '@mui/material';

type Props = {
  name: string;
  label: string | React.ReactNode;
  other?: InputLabelProps;
  required?: boolean;
};

const Label: React.FC<Props> = ({ name, label, other, required }) => {
  return (
    <InputLabel htmlFor={name} required={required} {...other} sx={{ textTransform: 'capitalize' }}>
      {label}
    </InputLabel>
  );
};

export default Label;

import React, { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Button } from '@mui/material';
import { UseControllerProps, useController, useFormContext, useWatch } from 'react-hook-form';
import { ExpandMore } from '@mui/icons-material';

import { ICheckboxGroupOption, IOption } from 'types/common';
import FormattedMessage from 'components/FormattedMessage';

type Props = {
  label?: string;
  name: string;
  options: ICheckboxGroupOption[];
  row?: boolean;
  config: IOption;
};

const CheckboxGroup: React.FC<Props> = ({ config, label, name, options, row, ...other }) => {
  const [limit, setLimit] = useState<number>(5);

  const methods = useFormContext();

  const {
    field: { ref, value, onChange, ...inputProps },
    fieldState: { error },
  } = useController<UseControllerProps<ICheckboxGroupOption[]>>({
    name,
    control: methods.control,
    defaultValue: [],
  });

  const checkboxSelected: ICheckboxGroupOption[] = useWatch({ control: methods.control, name: name }) || [];

  const showMore = () => {
    setLimit(limit + 5);
  };

  const handleChange = (option: ICheckboxGroupOption) => {
    const newArray = [...checkboxSelected];
    const item = option;

    // Ensure array isnt empty
    if (newArray.length > 0) {
      // Attempt to find an item in array with matching id
      const index = newArray.findIndex(x => x[config.value] === item[config.value]);

      // If theres no match add item to the array
      if (index === -1) {
        newArray.push(item);
      } else {
        // If there is a match and the value is empty, remove the item from the array
        newArray.splice(index, 1);
      }
    } else {
      // If the array is empty, add the item to the array
      newArray.push(item);
    }

    // Overwrite existing array with newArray
    onChange(newArray);
  };

  return (
    <div>
      <FormControl {...other}>
        {label && (
          <FormLabel component="legend">
            <FormattedMessage id={label} />
          </FormLabel>
        )}
        <FormGroup row={row} sx={{ ml: '20px' }}>
          {options.slice(0, limit).map(option => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value?.some(checked => checked[config.value] === option[config.value])}
                  {...inputProps}
                  inputRef={ref}
                  onChange={() => handleChange(option)}
                />
              }
              label={<p className="body2">{option[config.label]}</p>}
              key={option[config.value]}
              sx={{ width: '100%' }}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormHelperText sx={{ color: '#f44336' }}>{error?.message}</FormHelperText>
      {options.length > 5 && options.length >= limit && (
        <Button sx={{ ml: '20px', textTransform: 'inherit' }} onClick={showMore}>
          <FormattedMessage id="show-more" /> <ExpandMore />
        </Button>
      )}
    </div>
  );
};

export default CheckboxGroup;

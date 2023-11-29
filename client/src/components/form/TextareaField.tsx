import React, { useState } from 'react';
import { FormControl, FormHelperText, FormLabel, TextareaAutosize } from '@mui/material';

import { toCapitalCase } from '@utils/string';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const TextareaField = ({
  className,
  fieldName,
  fields,
  defaultValue,
  validationErrors,
  onFieldChange,
  disabled,
}: ComponentProps): JSX.Element | null => {
  const [isFocused, setFocused] = useState(false);

  const setFocus = (state: boolean) => (): void => {
    setFocused(state);
  };
  return (
    <FormControl
      className={[`field__c textarea`, className, isFocused && 'Mui-focused'].css()}
      required={fields[fieldName].required}
      error={validationErrors[fieldName]?.length > 0}
      focused={isFocused}
    >
      <FormLabel htmlFor={fieldName}>{fields[fieldName].label}</FormLabel>
      <TextareaAutosize
        id={fieldName}
        className={[``, isFocused && 'Mui-focused'].css()}
        aria-label="email body"
        placeholder="Dear CEO,"
        defaultValue={defaultValue}
        minRows={isFocused ? 24 : 4}
        maxRows={isFocused ? 24 : 4}
        onChange={onFieldChange(fieldName)}
        onFocus={setFocus(true)}
        onBlur={setFocus(false)}
        readOnly={disabled}
      />
      <FormHelperText>
        {validationErrors[fieldName] && toCapitalCase(validationErrors[fieldName])}
      </FormHelperText>
    </FormControl>
  );
};

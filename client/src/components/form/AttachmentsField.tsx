import React, { useState, useCallback } from 'react';
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  Paper,
  Container,
  Stack,
  FormHelperText,
  FormControlLabel,
  LinearProgress,
  CircularProgress,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';

import { Icon } from '@components/graphic';
import { Image } from '@components/media';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const AttachmentsField = ({
  className,
  fieldName,
  fields,
  defaultValue = [],
  value,
  onFieldChange,
  disabled,
}: ComponentProps) => {
  const attachments = value ?? defaultValue;

  const removeUploaded = (fileIndex: number) => (): void => {
    if (disabled) {
      return;
    }
    // console.log('removeUploaded', attachments);
    // console.log('removeUploaded', [...attachments.splice(fileIndex, 1)]);
    // console.log('removeUploaded attachments', attachments);
    const newValue = attachments.slice(0, fileIndex).concat(attachments.slice(fileIndex + 1));

    // console.log('removeUploaded newValue', newValue);
    onFieldChange(fieldName, newValue)();
  };

  return attachments.length > 0 ? (
    <FormControl className={['field__c attachments', className].css()} focused={true}>
      <FormLabel htmlFor={'attachments'}>{fields[fieldName].label}</FormLabel>
      <Stack
        className={['field__attachments'].css()}
        direction="row"
        useFlexGap
        spacing={3}
        marginTop={3}
      >
        {attachments.map((file, index) => (
          <Paper key={index} id={'attachments'} className={['field__attachment'].css()}>
            <Icon icon="x-mark" onClick={removeUploaded(index)} />
            <Image src={file} alt="Upload preview" />
          </Paper>
        ))}
      </Stack>
    </FormControl>
  ) : (
    <></>
  );
};

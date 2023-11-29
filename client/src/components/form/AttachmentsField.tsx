import React from 'react';
import { FormControl, Paper, Stack, FormLabel } from '@mui/material';

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
}: ComponentProps): JSX.Element | null => {
  const attachments = value ?? defaultValue;

  const removeUploaded = (fileIndex: number) => (): void => {
    if (disabled) {
      return;
    }
    onFieldChange(fieldName, fileIndex, 'remove')();
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

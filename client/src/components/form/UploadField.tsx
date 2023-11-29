import React, { useState, useCallback } from 'react';
import {
  Typography,
  FormControl,
  Stack,
  FormHelperText,
  FormLabel,
  LinearProgress,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

import { getTokens, imageKit } from '@api/imageKit';
import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const UploadField = ({
  className,
  fieldName,
  fields,
  defaultValue = [],
  value,
  onFieldChange,
}: ComponentProps): JSX.Element | null => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const cancelUpload = (errorObject): void => {
    setLoading(false);
    // eslint-disable-next-line no-console
    console.error(errorObject);
    setError(errorObject);
  };

  const uploadAndSaveFile = (fileToUpload): void => {
    getTokens()
      .then(tokens => {
        imageKit
          .upload({
            folder: '/email_form_sender/upload',
            file: fileToUpload,
            fileName: fileToUpload.name,
            ...tokens,
          })
          .then(result => {
            const uploadedURL = imageKit.url({
              src: result.url,
              transformation: [{ height: 100, width: 100 }],
            });
            onFieldChange('attachments', uploadedURL, 'add')();

            setLoading(false);
            setError(null);
          });
      })
      .catch(err => {
        cancelUpload(err);
      });
  };

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      setLoading(true);

      const readFile = (file: File): void => {
        try {
          const fileReader = new FileReader();

          fileReader.onload = function (): void {
            uploadAndSaveFile(file);
          };

          fileReader.readAsDataURL(file);
        } catch (err) {
          cancelUpload(err);
        }
      };

      if (acceptedFiles) {
        if (acceptedFiles.length > 5) {
          cancelUpload(new Error('Max 5 attachments allowed'));
          return;
        }
        for (const file of acceptedFiles) {
          // Custom Validations
          if (file.size / 1024 / 1024 > 1) {
            cancelUpload(new Error('File limit exceeded. Max size is 1 MB.'));
            return;
          } else if (!/\.(jpe?g|png|gif|pdf|docx|odt)$/i.test(file.name)) {
            cancelUpload(
              new Error('File type is invalid. Only (JPG, PNG, GIF, PDF, DOCX, ODT) are allowed'),
            );
            return;
          }
          readFile(file);
        }
      }
    },
    [value],
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <FormControl
      className={['field__c upload', className].css()}
      focused={true}
      error={error !== null}
    >
      <FormLabel htmlFor={fieldName}>{fields[fieldName].label}</FormLabel>

      <Stack
        className={['field__drag-and-drop f-center'].css()}
        direction="row"
        {...getRootProps()}
      >
        <Icon icon="dashed-box" className={[''].css()} />
        {loading ? (
          <LinearProgress className={['field__progress'].css()} variant="indeterminate" />
        ) : (
          <>
            <input id={fieldName} {...getInputProps()} />
            <Icon icon="add-image" />
            {isDragActive ? (
              <Typography variant="caption" className={[``].css()} align="center">
                Drop the files here ...
              </Typography>
            ) : (
              <Typography variant="caption" className={[``].css()} align="center">
                Drag & Drop or Browse Files
              </Typography>
            )}
          </>
        )}
      </Stack>

      <FormHelperText>{error && error.message}</FormHelperText>
    </FormControl>
  );
};

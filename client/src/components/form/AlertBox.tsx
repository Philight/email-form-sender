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
  Divider,
} from '@mui/material';

import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const AlertBox = ({
  className,
  type,
  title: titleFromProps,
  message,
  onClick,
}: ComponentProps) => {
  const title = titleFromProps ?? (type === 'success' ? 'Success' : 'Error');
  const icon = type === 'success' ? 'checkmark-circle' : type === 'error' ? 'x-mark-circle' : '';

  return (
    <Paper
      className={['alert-box__c f-col f-center', className, type].css()}
      elevation={12}
      onClick={onClick}
    >
      {!!type && (
        <>
          <Icon icon={icon} />
          <Typography variant="h3" className={[``].css()} align="center">
            {title}
          </Typography>
          <Divider className="divider w-full" variant="fullWidth" />
          <Typography variant="h4" className={[``].css()} align="center">
            {message}
          </Typography>
        </>
      )}
    </Paper>
  );
};

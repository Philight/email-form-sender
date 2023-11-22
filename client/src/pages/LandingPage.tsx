import React, { useState, useEffect, useLayoutEffect, useRef, useContext, forwardRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Box,
  Stack,
  Container,
  Typography,
} from '@mui/material';

import { Icon } from '@components/graphic';
import { fetchData } from '@utils/api';
import { withPageData } from '@utils/hoc';

import { Props } from 'default-types';
interface PageProps extends Props {}

const LandingPage = (props: PageProps) => {
  const { className } = props;

  useEffect(() => {
    const getData = async () => {
      const jsonData = {
        from: 'obd@gmail.sk',
        attachments: ['http://obd@gmail.sk'],
      };
      const response = await fetchData({
        url: 'http://127.0.0.1:9000/api/v1/mail',
        method: 'POST',
        data: jsonData,
      });

      console.log(response);
    };

    getData();
  }, []);

  return (
    <main className={['landing-page__c f-center full-screen', className].css()}>
      <Stack direction="column" alignItems="center">
        <Typography variant="h2" className={[``].css()} align="center">
          Email Sender
        </Typography>
        <Typography variant="h3" className={[``].css()} align="center">
          Sign in to send emails
        </Typography>
        <ButtonGroup orientation="horizontal" className={[`landing-page__actions`].css()}>
          <Button className={'standard lg'} variant="contained" size="large" href="/login">
            Sign In
          </Button>
          <Button className={'lg outline'} variant="outlined" size="large">
            Sign Up
          </Button>
        </ButtonGroup>
      </Stack>
    </main>
  );
};

const pageData = { page: 'landing', img: '' };
export default withPageData(LandingPage, pageData);

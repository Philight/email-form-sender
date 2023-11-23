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

import { useDataContext } from '@contexts/DataContext';

import { NavigationButton } from '@components/interactive/NavigationButton';
import { Icon } from '@components/graphic';
import { fetchData } from '@utils/api';
import { withPageData } from '@utils/hoc';

import { Props } from 'default-types';
interface PageProps extends Props {}

const LandingPage = (props: PageProps) => {
  const { className } = props;
  const context = useDataContext();
  const formStage = context.formStage;
  const pageData = context.pageData[formStage] ?? {};

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
  /*
  const nextStage = (stage) => (e) => {
//    context.setFormStage(stage);
//    navigate('/login');
  }
*/
  return (
    <main className={['landing-page__c f-center full-screen', className].css()}>
      <Stack direction="column" alignItems="center">
        <Typography variant="h2" className={[``].css()} align="center">
          {pageData?.heading}
        </Typography>
        <Typography variant="h3" className={[``].css()} align="center">
          {pageData?.subheading}
        </Typography>
        <ButtonGroup orientation="horizontal" className={[`landing-page__actions`].css()}>
          <NavigationButton
            variant="standard"
            size="lg"
            label="Sign In"
            link="/login"
            nextStage="signin"
            //            onClick={nextStage('signin')}
          />
          <NavigationButton
            variant="outline"
            size="lg"
            label="Sign Up"
            link="/register"
            nextStage="signup"
          />
        </ButtonGroup>
      </Stack>
    </main>
  );
};

const pageData = { page: 'landing', img: '' };
export default withPageData(LandingPage, pageData);

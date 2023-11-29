import React, { useState, useEffect, useLayoutEffect, useRef, useContext, forwardRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useCookies, Cookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

import { ButtonGroup, Stack, Typography } from '@mui/material';

import { useDataContext } from '@contexts/DataContext';

import { NavigationButton } from '@components/interactive/NavigationButton';
import { withPageData } from '@utils/hoc';

import { Props } from 'default-types';
interface PageProps extends Props {}

const LandingPage = (props: PageProps): JSX.Element | null => {
  const { className } = props;
  const context = useDataContext();
  const formStage = context.formStage;
  const pageData = context.pageData[formStage] ?? {};

  const [cookies, setCookie] = useCookies();

  const isLoggedIn =
    cookies.access_token && Date.now() < jwtDecode(cookies.access_token).exp * 1000;
  // eslint-disable-next-line no-console
  console.log('LandingPage cookies', cookies.access_token && jwtDecode(cookies.access_token));

  return (
    <main className={['landing-page__c f-center full-screen', className].css()}>
      <Stack direction="column" alignItems="center">
        <Typography variant="h2" className={[``].css()} align="center">
          {pageData?.heading}
        </Typography>
        <Typography variant="h3" className={[``].css()} align="center">
          {pageData?.subheading}
        </Typography>
        <ButtonGroup orientation="vertical" className={[`landing-page__actions`].css()}>
          {isLoggedIn ? (
            <NavigationButton
              variant="standard"
              color="gradient"
              size="lg"
              icon="envelope-fill"
              link="/form"
              nextStage="recipients"
            />
          ) : (
            <>
              <NavigationButton
                variant="standard"
                size="lg"
                label="Sign In"
                link="/login"
                nextStage="signin"
              />
              <NavigationButton
                variant="outline"
                size="lg"
                label="Sign Up"
                link="/register"
                nextStage="signup"
              />
            </>
          )}
        </ButtonGroup>
      </Stack>
    </main>
  );
};

const pageData = { page: 'landing', img: '' };
export default withPageData(LandingPage, pageData);

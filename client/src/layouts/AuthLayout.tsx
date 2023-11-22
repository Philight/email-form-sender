import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Box,
  Stack,
  Container,
  Typography,
  Backdrop,
} from '@mui/material';

import { Envelopes } from '@components/animated/Envelopes';
import { Layer, Icon } from '@components/graphic';
import { Header, Footer } from '@components/layout';

import { Props } from 'default-types';
interface LayoutProps extends Props {
  Page?: React.FC | React.Component | React.ReactNode;
}

const AuthLayout = ({ Page, ...rest }: LayoutProps) => {
  const { className } = rest;

  const [{ img, page }, setState] = React.useState({});
  // eslint-disable-next-line no-shadow
  const setPageData = React.useCallback(({ img, page }) => setState({ img, page }), []);

  return (
    <div className={['auth-layout__c layout', className].css()}>
      <Layer className={['background gradient '].css()} />
      <Box className={['overlay abs-fill'].css()} />
      <Envelopes />

      <Header />
      {Page && <Page />}
      <Outlet context={{ setPageData }} />
      <Footer />
    </div>
  );
};

export default AuthLayout;

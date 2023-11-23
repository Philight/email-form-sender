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
import { Footer } from '@components/layout';

import { Props } from 'default-types';
interface LayoutProps extends Props {
  Page?: React.FC | React.Component | React.ReactNode;
}

const LandingLayout = ({ Page, ...rest }: LayoutProps) => {
  const { className } = rest;

  const [{ img, page }, setState] = React.useState({});
  // eslint-disable-next-line no-shadow
  const setPageData = React.useCallback(({ img, page }) => setState({ img, page }), []);

  return (
    <div className={['layout__c landing', className].css()}>
      <Layer className={['background gradient '].css()} />
      <Box className={['overlay abs-fill'].css()} />
      <Envelopes className={[`animated-layer`].css()} />

      {Page && <Page />}
      <Outlet context={{ setPageData }} />
      <Footer />
    </div>
  );
};

export default LandingLayout;

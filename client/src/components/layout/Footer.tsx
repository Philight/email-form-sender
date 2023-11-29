import React from 'react';
import { Stack } from '@mui/material';

import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {}

const linkFL = 'https://philight.github.io/portfolio/';
const linkExcalibur = 'https://getexcalibur.com/';

export const Footer = (props: ComponentProps): JSX.Element | null => {
  const { className } = props;

  return (
    <footer className={[`footer__c`, className].css()}>
      <Stack className={[`footer__logos`].css()} direction="row">
        <Icon className={[``].css()} icon="fl-logo" link={linkFL} />
        <Icon className={[``].css()} icon="excalibur-logo" link={linkExcalibur} />
      </Stack>
    </footer>
  );
};

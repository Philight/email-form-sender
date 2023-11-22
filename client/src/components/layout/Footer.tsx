import React from 'react';

import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {}

export const Footer = (props: ComponentProps) => {
  const { className } = props;

  return (
    <footer className={[`footer__c`, className].css()}>
      <Icon className={[``].css()} icon="fl-logo" />
      <Icon className={[``].css()} icon="excalibur-logo" />
    </footer>
  );
};

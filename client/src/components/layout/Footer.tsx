import React from 'react';

import { Logo } from '@components/graphic';
import { Props } from 'default-types';

interface ComponentProps extends Props {
};

export const Footer = (props: ComponentProps) => {
  let { className } = props;

  return (
    <footer className={[`footer__c`, className].css()}>
      <Logo />
    </footer>
  );
};

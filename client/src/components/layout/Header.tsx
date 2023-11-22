import React from 'react';

import { Logo } from '@components/graphic';
import { Navigation } from '@components/layout';
import { Props } from 'default-types';

interface ComponentProps extends Props {}

export const Header = (props: ComponentProps) => {
  const { className } = props;

  return (
    <header className={[`header__c`, className].css()}>
      <Navigation />
    </header>
  );
};

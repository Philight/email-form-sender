import React from 'react';

import { Props } from 'default-types';

interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Navigation = (props: ComponentProps) => {
  const { className, onClick } = props;

  return (
    <nav className={[`navigation__c`, className].css()}>
    </nav>
  );
};

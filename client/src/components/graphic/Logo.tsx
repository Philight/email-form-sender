import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  link?: string;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Logo = ({ className, children, link, onClick }: Props): JSX.Element | null => {
  return (
    <figure className={['logo__c ', className].css()} onClick={onClick}>
      {link && <Link href={link} className="fill-absolute" />}
      <Icon icon="infinity-8" />
    </figure>
  );
};

import React from 'react';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Layer = ({ className, onClick, style }: ComponentProps): JSX.Element | null => {
  return (
    <canvas
      className={[`layer__c abs-fill-parent`, className].css()}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

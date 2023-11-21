import React from 'react';

import { Props } from 'default-types';

interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Layer = ({ className, children, onClick, style }: ComponentProps) => {
  return (
    <canvas
      className={[`layer__c abs-fill-parent`, className].css()}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

import React from 'react';

import { Layer } from '@components/graphic';
import { Props } from 'default-types';

interface ComponentProps extends Props {
  withCaption?: boolean;
  withLayer?: boolean;
}

export const Image = (props: ComponentProps) => {
  const { className, withCaption, withOverlay } = props;
  return (
    <figure className={['image__c', className].css()}>
      {withOverlay && <Layer className={['image__overlay overlay'].css()} />}
    </figure>
  );
};

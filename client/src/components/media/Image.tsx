import React from 'react';

import { Layer } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  src: string;
  alt?: string;
  title?: string;
  withOverlay?: boolean;
  isSquare?: boolean;
}

export const Image = (props: ComponentProps): JSX.Element | null => {
  const { className, withOverlay, isSquare, src, title, alt } = props;
  return (
    <figure className={['image__c', isSquare && 'square', className].css()}>
      {withOverlay && <Layer className={['image__overlay overlay'].css()} />}
      {isSquare && <canvas className={['image__placeholder'].css()} />}
      <img className="image__image" title={title} alt={alt} src={src} loading="lazy" />
    </figure>
  );
};

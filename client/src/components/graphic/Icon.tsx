import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useDynamicFileImport } from '@utils/useDynamicFileImport';
import { Props } from 'default-types';

import noIcon from '@icons/no-icon.svg';

interface ComponentProps extends Props {
  icon: string;
  alt?: string;
  title?: string;
  link?: string;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  initial?: any;
  animate?: any;
  transition?: any;
  //  ref?: Ref<HTMLDivElement>
}
type Ref = HTMLDivElement;

export const Icon = forwardRef<Ref, ComponentProps>((props, ref) => {
  const {
    className,
    style,
    icon = icon.toLowerCase(),
    isMultiColor: isMultiColorFromProps,
    alt = `icon: ${icon}`,
    title,
    onClick,
    link,
    initial,
    animate,
    transition,
  } = props;

  const isMultiColor: boolean = isMultiColorFromProps || ['kk-primetech', 'coffee-2', 'arrow-nav-down'].includes(icon);

  const { error, loading, svgIcon } = useDynamicFileImport(icon, {
    fileType: 'icons',
    suffix: 'svg',
  });

  const renderProps = isMultiColor
    ? {
        src: svgIcon,
      }
    : {
        style: {
          //        backgroundImage: `url("${getIcon()}")`,
          WebkitMask: `url(${svgIcon}) no-repeat center`,
          mask: `url(${svgIcon}) no-repeat center`,
        },
      };
  const newTabProps = { target: '_blank', rel: 'noopener noreferrer' };

  return error ? (
    <img className={[`icon__c not-found`].css()} src={noIcon} />
  ) : loading ? (
    <img className={[`icon__c not-found`].css()} src={noIcon} />
  ) : (
    <motion.figure
      className={[`icon__c icon-${icon} f-center`, className, isMultiColor && 'multi-color'].css()}
      style={style}
      ref={ref}
      onClick={onClick}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {link && <Link to={link} className="abs-fill" {...newTabProps} />}
      {!loading && (
        <img
          className="icon"
          title={title}
          alt={alt}
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          loading="lazy"
          {...renderProps}
        />
      )}
    </motion.figure>
  );
});

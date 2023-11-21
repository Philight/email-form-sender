import React from 'react';
import { motion } from 'framer-motion';

import { Icon, Layer } from '@components/graphic';
import { Props } from 'default-types';

const ANIM_PULSE = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [0.95, 1.05, 0.95],
  },
  transition: {
    ease: 'linear',
    duration: 4,
    repeat: Infinity,
  },
};

interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Loader = (props: ComponentProps) => {
  const { className, onClick, style } = props;

  return (
    <motion.figure
      className={[`loader__c full-screen f-center`, className].css()}
      style={style}
      onClick={onClick}
    >
      <Layer className={'loader__background abs-center fill-parent'} />
      <Icon icon="infinity-8" animate={ANIM_PULSE.animate} transition={ANIM_PULSE.transition} />
    </motion.figure>
  );
};

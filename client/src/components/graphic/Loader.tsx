import React from 'react';
import { motion } from 'framer-motion';
import {
  Backdrop,
} from '@mui/material';
import { Icon, Layer } from '@components/graphic';
import { Props } from 'default-types';

const ANIM_PULSE = {
  animate: {
    opacity: [0.6, 1, 0.6],
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
  const { className, onClick, style, fullscreen, overlayed } = props;

  return (
    <motion.div
      className={[`loader__c f-center`, fullscreen && 'full-screen', overlayed && 'overlayed', className].css()}
      style={style}
      onClick={onClick}
    >
      <Backdrop className={'loader__background'} open={true} />
{/*
      <Layer className={'loader__background abs-center fill-parent'} />
*/}
      <Icon icon="4-bars" isMultiColor animate={ANIM_PULSE.animate} transition={ANIM_PULSE.transition} />
    </motion.div>
  );
};

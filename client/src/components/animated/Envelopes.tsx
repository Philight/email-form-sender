import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Envelopes = ({
  className,
  children,
  onClick,
  style,
}: ComponentProps): JSX.Element | null => {
  function transformOrder({ rotateX, rotateY, rotateZ, x }) {
    return `rotateX(${rotateX}) rotateY(${rotateY}) rotateZ(${rotateZ}) translateX(${x})`;
  }
  return (
    <div className={['envelopes__c fill-parent', className].css()}>
      <motion.div
        className={['envelopes--slow abs-fill'].css()}
        initial={{ rotateX: '-20deg', rotateY: '20deg', rotateZ: '-20deg', x: '0%' }}
        transformTemplate={transformOrder}
        transition={{ ease: 'linear', duration: 16, repeat: Infinity }}
        animate={{ x: '-100%' }}
      >
        <div className={['envelopes left fill-parent'].css()}>
          {[...Array(10).keys()].map(index => (
            <Icon key={index} className={[`flying sm e-${index}`].css()} icon="envelope-outline" />
          ))}
        </div>
        <div className={['envelopes center fill-parent absolute left-full top-0 '].css()}>
          {[...Array(10).keys()].map(index => (
            <Icon key={index} className={[`flying sm e-${index}`].css()} icon="envelope-outline" />
          ))}
        </div>
        <div className={['envelopes right fill-parent absolute left-[200%] top-0'].css()}>
          {[...Array(10).keys()].map(index => (
            <Icon key={index} className={[`flying sm e-${index}`].css()} icon="envelope-outline" />
          ))}
        </div>
      </motion.div>

      <div className={['envelopes--fast abs-fill'].css()}>
        {[...Array(2).keys()].map(index => (
          <Icon
            key={index}
            className={[`flying e-${index}`].css()}
            icon="envelope-fill"
            initial={{ left: '-100%' }}
            transition={{
              ease: 'linear',
              delay: index == 0 ? 2 : 7,
              duration: index == 0 ? 1 : 0.6,
              repeat: Infinity,
              repeatDelay: index == 0 ? 6 : 11,
            }}
            animate={{ left: '100%' }}
          />
        ))}
      </div>
    </div>
  );
};

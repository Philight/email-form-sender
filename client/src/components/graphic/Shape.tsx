import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  width?: number;
  height?: number;
  left?: number;
  bottom?: number;
  ref?: React.Ref<HTMLDivElement>;
}
type Ref = HTMLDivElement;

export const Shape = forwardRef<Ref, ComponentProps>(
  ({ className, children, style, onClick, width, height, left, bottom }, ref) => {
    return (
      <motion.canvas
        className={[`shape__c`, className].css()}
        style={{
          width: width,
          height: height,
          marginLeft: left,
          marginBottom: bottom,
          ...style,
        }}
        ref={ref}
        onClick={onClick}
      >
        {children}
      </motion.canvas>
    );
  },
);

export default Shape;

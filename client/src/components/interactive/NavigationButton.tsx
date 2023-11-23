import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import { useDataContext } from '@contexts/DataContext';
import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  nextStage?: 'landing' | 'signin' | 'signup' | 'recipients' | 'body' | 'pictures' | 'summary' | '';
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  variant?: 'standard' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  link?: string;
  icon?: string;
  label?: string;
  withShadow?: boolean;
  disabled?: boolean;
}

export const NavigationButton = (props: ComponentProps): JSX.Element | null => {
  const {
    className,
    children,
    style,
    type,
    variant = 'standard',
    size = 'md',
    icon,
    label,
    withShadow,
    link,
    nextStage,
    onClick,
    disabled,
  } = props;
  const navigate = useNavigate();
  const context = useDataContext();

  const handleClick = e => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    } else if (link) {
      navigate(link);
    }
    if (nextStage) {
      context.setFormStage(nextStage);
    }
  };

  return (
    <Box className={[`navigation-button__c f-center`, className].css()}>
      <Button
        className={[
          `button`,
          variant && `button--${variant}`,
          size && `button--${size}`,
          !withShadow && 'no-shadow',
        ].css()}
        type={type}
        variant={variant === 'outline' ? 'outlined' : 'contained'}
        size={size === 'sm' ? 'small' : size === 'md' ? 'medium' : 'large'}
        href={link}
        onClick={handleClick}
        disabled={disabled}
        style={style}
      >
        {!!icon && <Icon icon={icon} />}
        {!!label && <label>{label}</label>}
        {children}
      </Button>
    </Box>
  );
};

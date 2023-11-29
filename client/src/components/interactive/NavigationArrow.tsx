import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Box, Tooltip } from '@mui/material';

import { useDataContext } from '@contexts/DataContext';
import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {
  currentStage?:
    | 'landing'
    | 'signin'
    | 'signup'
    | 'recipients'
    | 'body'
    | 'attachments'
    | 'summary'
    | 'send';
  nextStage?:
    | 'landing'
    | 'signin'
    | 'signup'
    | 'recipients'
    | 'body'
    | 'attachments'
    | 'summary'
    | 'send';
  stageIndex?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  variant?: 'back' | 'next';
  size?: 'sm' | 'md' | 'lg';
  link?: string;
  icon?: string;
  label?: string;
  withShadow?: boolean;
  disabled?: boolean;
  isPrev?: boolean;
}

export const NavigationArrow = (props: ComponentProps): JSX.Element | null => {
  const {
    className,
    style,

    isPrev,
    currentStage,
    nextStage,
    stageIndex,

    icon: iconFromProps,
    link,
    onClick,
    disabled,
  } = props;

  const navigate = useNavigate();
  const context = useDataContext();
  const handleClick = (e): void => {
    e.preventDefault();
    if (nextStage) {
      context.setFormStage(nextStage);
    }
    if (onClick) {
      onClick(e);
    } else if (link) {
      navigate(link);
    }
  };

  const getIcon = (): string => {
    switch (nextStage) {
      case 'landing':
        return 'arrow-left';
      case 'recipients':
        if (currentStage === 'summary') {
          return 'envelope-fill';
        }
      case 'body':
      case 'attachments':
        return 'nav-arrow';
      case 'summary':
        return 'summary';
      case 'send':
        return 'envelope-fill';
    }
  };

  const icon = iconFromProps ?? getIcon();
  const withTooltip = ['recipients', 'body', 'attachments'].includes(icon) ?? false;

  return (
    <IconButton
      className={[
        `navigation-arrow__c material-icon-button icon-${icon}`,
        className,
        isPrev ? 'back' : 'next',
      ].css()}
      aria-label={isPrev ? 'back' : 'next'}
      href={link}
      onClick={handleClick}
      disabled={disabled}
      style={style}
    >
      <Icon icon={icon} />
      {withTooltip && (
        <Box className={['tooltip f-center'].css()}>
          <span>{stageIndex}</span>
        </Box>
      )}
    </IconButton>
  );
};

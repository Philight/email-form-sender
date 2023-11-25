import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Box, Tooltip } from '@mui/material';

import { useDataContext } from '@contexts/DataContext';
import { Icon } from '@components/graphic';

import { Props } from 'default-types';
interface ComponentProps extends Props {
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
    nextStage,
    stageIndex,

    icon: iconFromProps,
    link,
    onClick,
    disabled,
  } = props;

  const navigate = useNavigate();
  const context = useDataContext();

  const handleClick = e => {
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

  const getIcon = () => {
    switch (nextStage) {
      case 'landing':
        return 'arrow-left';
      case 'recipients':
      case 'body':
      case 'attachments':
        return 'nav-arrow';
      case 'summary':
        return 'summary';
      case 'send':
        return 'envelope-fill';
    }
  };
  const renderIcon = () => {
    switch (nextStage) {
      case 'landing':
        return <Icon icon="arrow-left" />;
      case 'recipients':
      case 'body':
      case 'attachments':
        return (
          <>
            <Icon icon="nav-arrow" />
            <Box className={['tooltip f-center'].css()}>
              <span>{stageIndex}</span>
            </Box>
          </>
        );
      case 'summary':
        return <Icon icon="summary" />;
      case 'send':
        return <Icon icon="envelope-fill" />;
    }
  };

  const icon = iconFromProps ?? getIcon();

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
      {renderIcon()}
    </IconButton>
  );
};

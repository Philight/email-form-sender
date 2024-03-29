import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

import { useDataContext } from '@contexts/DataContext';
import { NavigationArrow } from '@components/interactive/NavigationArrow';
import { getStageInfo } from '@store/reducers/dataReducer';

import { Props } from 'default-types';
interface ComponentProps extends Props {}

export const Header = (props: ComponentProps): JSX.Element | null => {
  const { className } = props;

  const context = useDataContext();
  const formStage = context.formStage;
  const pageData = context.pageData[formStage];
  const stageInfo = getStageInfo(formStage);

  return (
    <AppBar className={[`header__c material-appbar`, className].css()} position="sticky">
      <Toolbar className={[`header__toolbar`, className].css()}>
        {!!stageInfo.prevStage && (
          <NavigationArrow
            className={[``].css()}
            currentStage={stageInfo.currentStage}
            nextStage={stageInfo.prevStage}
            stageIndex={stageInfo.stageIndex - 1}
            link={stageInfo.prevStage === 'landing' && '/'}
            isPrev
          />
        )}
        <Typography variant="h2" className={[`abs-center`].css()} align="center">
          {pageData?.heading}
        </Typography>
        {!!stageInfo.nextStage && (
          <NavigationArrow
            className={[``].css()}
            currentStage={stageInfo.currentStage}
            nextStage={stageInfo.nextStage}
            stageIndex={stageInfo.stageIndex + 1}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

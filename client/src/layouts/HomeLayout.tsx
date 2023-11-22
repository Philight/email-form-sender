import React from 'react';
import { Outlet } from 'react-router-dom';

import { Props } from 'default-types';
interface LayoutProps extends Props {
  Page?: React.FC | React.Component | React.ReactNode;
}

const HomeLayout = ({ Page, ...rest }: LayoutProps) => {
  const { className } = rest;

  const [{ img, page }, setState] = React.useState({});
  // eslint-disable-next-line no-shadow
  const setPageData = React.useCallback(({ img, page }) => setState({ img, page }), []);

  return (
    <div className={['home-layout__c layout', className].css()}>
      {Page && <Page />}
      <Outlet context={{ setPageData }} />
    </div>
  );
};

export default HomeLayout;

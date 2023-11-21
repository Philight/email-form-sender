import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const withPageData =
  (Component, { img, page }) =>
  (props): JSX.Element | null => {
    const { setPageData } = useOutletContext();

    useEffect(() => {
      setPageData({ img, page });
    }, [setPageData]);

    return <Component {...props} />;
  };

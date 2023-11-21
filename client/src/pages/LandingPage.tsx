import React, { useState, useEffect, useLayoutEffect, useRef, useContext, forwardRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { Icon } from '@components/graphic';
import { fetchData } from '@utils/api';
import { withPageData } from '@utils/hoc';

import { Props } from 'default-types';
interface PageProps extends Props {}

const LandingPage = (props: PageProps) => {
  const { className } = props;

  useEffect(() => {

    const getData = async () => {
      const jsonData = {
        from: 'obd@gmail.sk',
        attachments: ['http://obd@gmail.sk'],
      }
      const response = await fetchData({
        url: 'http://127.0.0.1:9000/api/v1/mail',
        method: 'POST',
        data: jsonData,
      });  

      console.log(response);
    }

    getData()

  }, [])

  return (
    <main className={['landing-page__c', className].css()}>
      <h1>LandingPage</h1>
      <Icon icon="facebook-outline" />
    </main>
  );
};

const pageData = { page: 'landing', img: '' };
export default withPageData(LandingPage, pageData);
import React, { useState, useEffect, useLayoutEffect, useRef, useContext, forwardRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { withPageData } from '@utils/hoc';

import { Props } from 'default-types';
interface PageProps extends Props {}

const ContactPage = (props: PageProps) => {
  const { className } = props;

  return (
    <main className={['contact-page__c page', className].css()}>
      <h1>ContactPage</h1>
    </main>
  );
};

const pageData = { page: 'contact', img: '' };
export default withPageData(ContactPage, pageData);
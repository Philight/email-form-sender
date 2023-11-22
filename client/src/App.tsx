import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const LandingLayout = lazy(() => import('@layouts/LandingLayout'));
const AuthLayout = lazy(() => import('@layouts/AuthLayout'));
const HomeLayout = lazy(() => import('@layouts/HomeLayout'));
const ContactLayout = lazy(() => import('@layouts/ContactLayout'));

const StyleGuide = lazy(() => import('@pages/StyleGuide'));
const LandingPage = lazy(() => import('@pages/LandingPage'));
const AboutPage = lazy(() => import('@pages/AboutPage'));
const ContactPage = lazy(() => import('@pages/ContactPage'));

import { DataProvider } from '@contexts/DataContext';
import { Loader } from '@components/graphic';
import ScrollToTop from '@components/util/ScrollToTop';

import PACKAGE_JSON from 'ROOT/package.json';
import { CONSTANTS } from '@data/CONSTANTS';
import { dynamicImport } from '@utils/dynamicImport';

const ROUTE_TO_PAGE = {
  LANDING: {
    '/': 'LandingPage',
  },
  AUTH: {
    '/login': 'AuthPage',
    '/register': 'AuthPage',
  },
  FORM: {
    '/form': 'FormPage',
  },
};

const ROUTES = {
  LANDING: Object.keys(ROUTE_TO_PAGE.LANDING),
  AUTH: Object.keys(ROUTE_TO_PAGE.AUTH),
  FORM: Object.keys(ROUTE_TO_PAGE.FORM),
};

const landingLayoutImports = dynamicImport(ROUTE_TO_PAGE.LANDING, { prefix: 'pages' });
const authLayoutImports = dynamicImport(ROUTE_TO_PAGE.AUTH, { prefix: 'pages' });
const formLayoutImports = dynamicImport(ROUTE_TO_PAGE.FORM, { prefix: 'pages' });

const App = () => {
  return (
    <BrowserRouter basename={PACKAGE_JSON.config.BASENAME}>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <DataProvider>
            <Routes>
              <Route element={<LandingLayout />}>
                {ROUTES.LANDING.map((route, i) => (
                  <Route key={i} path={route} Component={landingLayoutImports[route]} />
                ))}
              </Route>
              <Route element={<AuthLayout />}>
                {ROUTES.AUTH.map((route, i) => (
                  <Route key={i} path={route} Component={authLayoutImports[route]} />
                ))}
              </Route>
              <Route element={<LandingLayout />}>
                {ROUTES.FORM.map((route, i) => (
                  <Route key={i} path={route} Component={formLayoutImports[route]} />
                ))}
              </Route>
              <Route path="/style-guide" element={<StyleGuide />} />
            </Routes>
          </DataProvider>
        </Suspense>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;

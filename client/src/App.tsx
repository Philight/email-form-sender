import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const LandingLayout = lazy(() => import('@layouts/LandingLayout'));
const FormLayout = lazy(() => import('@layouts/FormLayout'));

const StyleGuide = lazy(() => import('@pages/StyleGuide'));

import { DataProvider } from '@contexts/DataContext';
import { Loader } from '@components/graphic';
import ScrollToTop from '@components/util/ScrollToTop';

import PACKAGE_JSON from 'ROOT/package.json';
import { dynamicImport } from '@utils/dynamicImport';

const ROUTE_TO_PAGE = {
  LANDING: {
    '/': 'LandingPage',
  },
  FORM: {
    '/form': 'FormPage',
    '/login': 'FormPage',
    '/register': 'FormPage',
  },
};

const ROUTES = {
  LANDING: Object.keys(ROUTE_TO_PAGE.LANDING),
  FORM: Object.keys(ROUTE_TO_PAGE.FORM),
};

const landingLayoutImports = dynamicImport(ROUTE_TO_PAGE.LANDING, { prefix: 'pages' });
const formLayoutImports = dynamicImport(ROUTE_TO_PAGE.FORM, { prefix: 'pages' });

const App = (): JSX.Element | null => {
  return (
    <BrowserRouter basename={PACKAGE_JSON.config.BASENAME}>
      <ScrollToTop>
        <Suspense fallback={<Loader fullscreen />}>
          <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <DataProvider>
              <Routes>
                <Route element={<LandingLayout />}>
                  {ROUTES.LANDING.map((route, i) => (
                    <Route key={i} path={route} Component={landingLayoutImports[route]} />
                  ))}
                </Route>
                <Route element={<FormLayout />}>
                  {ROUTES.FORM.map((route, i) => (
                    <Route key={i} path={route} Component={formLayoutImports[route]} />
                  ))}
                </Route>
                <Route path="/style-guide" element={<StyleGuide />} />
              </Routes>
            </DataProvider>
          </CookiesProvider>
        </Suspense>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;

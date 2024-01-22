import React, { useCallback, Suspense } from 'react';
import { Navigate, Route, Routes as RRDRoutes, useLocation } from 'react-router-dom';
import { values } from 'lodash';

import { privateRoutes, publicRoutes, routes } from './routes';
import { authSelector } from 'redux/slice/auth.slice';
import { useAppSelector } from 'hooks';
import RoleRoute from './RoleRoute';

type GuardRouteProps = {
  isLogin: boolean;
  isPrivate: boolean;
  redirectPath: string;
  children: React.ReactElement;
};

export const Navigations: React.FC = () => {
  const { isLogin } = useAppSelector(authSelector);

  const renderRoute = useCallback(
    (route: typeof publicRoutes | typeof privateRoutes, isPrivate?: boolean) => {
      if (!route || !values(route)) {
        return undefined;
      }
      return values(route).map(({ element, requireRoles, path }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <RoleRoute requireRoles={requireRoles}>
              <GuardRoute isLogin={isLogin} isPrivate={!!isPrivate} redirectPath={isPrivate ? routes.Login.path : '/'}>
                {element}
              </GuardRoute>
            </RoleRoute>
          }
        />
      ));
    },
    [isLogin],
  );

  return (
    <Suspense fallback={<div />}>
      <RRDRoutes>
        <Route path="/">
          {renderRoute(publicRoutes)}
          {renderRoute(privateRoutes, true)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </RRDRoutes>
    </Suspense>
  );
};

const GuardRoute = ({ children, isLogin, isPrivate, redirectPath }: GuardRouteProps) => {
  const location = useLocation();

  if (isPrivate && isLogin) {
    return children;
  } else if (!isPrivate && !isLogin) {
    return children;
  } else {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
};

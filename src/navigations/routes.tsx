import { lazy } from 'react';
import { pick, omit } from 'lodash';

const ErrorBoundary = lazy(() => import('pages/ErrorBoundary'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Login = lazy(() => import('pages/Login'));

export const routes = {
  Dashboard: {
    path: '/',
    element: <Dashboard />,
    requireRoles: [''],
  },
  Login: {
    path: '/login',
    element: <Login />,
    requireRoles: [''],
  },
  ErrorBoundary: {
    path: '/404',
    element: <ErrorBoundary />,
    requireRoles: [''],
  },
};

export type Routes = typeof routes;

export type RouteKeys = keyof Routes;

const publicKeys: RouteKeys[] = ['Login', 'ErrorBoundary'];

export const publicRoutes = pick<Routes, RouteKeys>(routes, publicKeys);

export const privateRoutes = omit<Routes, RouteKeys>(routes, publicKeys);

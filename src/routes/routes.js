import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Page404 from '../pages/Page404';

const Loadable = (Component) => (props) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

const Router = ({ isAdminMode, setIsAdminMode }) => {
  return useRoutes([
    {
      path: '/mr',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/mr/dashboard" />, index: true },
        { path: 'dashboard', element: <MrUserDashboardPage /> },
        { path: 'reservation', element: <MrUserRegistherPage /> },
        { path: 'MrDetail/:id', element: <MrUserMrDetailPage /> }
      ]
    },
    {
      path: '/car/admin',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/car/carList" />, index: true },
        { path: 'carList', element: <CarAdminRegisterPage isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode}/> }
      ]
    },
    {
      path: '/mr/admin',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="admin/mr/dashboard" />, index: true },
        { path: 'dashboard', element: <MrAdminDashboardPage /> },
        { path: 'reservation', element: <MrAdminRegisterPage /> }
      ]
    },
    {
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: '*', element: <Page404 /> }
      ]
    },
    {
      path: '/car',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/car/dashboard" />, index: true },
        { path: 'dashboard', element: <CarUserDashboardPage /> }
      ]
    }
  ]);
};

export default Router;

const MrUserDashboardPage = Loadable(
  lazy(() => import('../pages/mr_user/Dashboard'))
);

const MrUserRegistherPage = Loadable(
  lazy(() => import('../pages/mr_user/Register'))
);

const MrUserMrDetailPage = Loadable(
  lazy(() => import('../pages/mr_user/detail/MrDetailPage'))
);

const CarAdminRegisterPage = Loadable(
  lazy(() => import('../pages/car_admin/Register'))
);

const CarUserDashboardPage = Loadable(
  lazy(() => import('../pages/car_user/Dashboard'))
);

const MrAdminRegisterPage = Loadable(
  lazy(() => import('../pages/mr_admin/Register'))
);
const MrAdminDashboardPage = Loadable(
  lazy(() => import('../pages/mr_admin/DashBoard'))
);

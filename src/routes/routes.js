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
        { path: 'rez', element: <MrUserMrRezPage /> },
        { path: 'bm', element: <MrUserBmPage /> }
      ]
    },
    {
      path: '/car/admin',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/car/carManage" />, index: true },
        {
          path: 'carManage',
          element: (
            <CarAdminCarManagePage
              isAdminMode={isAdminMode}
              setIsAdminMode={setIsAdminMode}
            />
          )
        },
        {
          path: 'rez',
          element: <CarAdminRezPage />
        },
        {
          path: 'operation',
          element: <CarAdminOperationPage />
        },
        {
          path: 'example',
          element: <CarAdminExamplePage />
        }
      ]
    },
    {
      path: '/mr/admin',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="admin/mr/dashboard" />, index: true },
        { path: 'MrList', element: <MrAdminMrListPage /> },
        { path: 'MrRegister', element: <MrAdminRegisterPage /> },
        { path: 'Notice', element: <MrAdminNoticePage /> },
        { path: 'NoticeList', element: <MrAdminNoticeListPage /> },
        {
          path: 'NoticeDetail/:notice_code',
          element: <MrAdminNoticeDetailPage />
        },
        { path: 'Test', element: <MrAdminTestPage /> }
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
      path: '/carRez',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/carRez/dashboard" />, index: true },
        { path: 'dashboard', element: <CarUserDashboardPage /> },
        { path: 'reservation', element: <CarUserRegisterPage /> },
        { path: 'carRezComplete', element: <CarRezCompletePage /> }
      ]
    },
    {
      path: '/',
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: 'login', element: <LoginPage /> }
      ]
    }
  ]);
};

export default Router;

const MrUserDashboardPage = Loadable(
  lazy(() => import('../pages/mr_user/dashboard/DashboardPage'))
);

const MrUserMrRezPage = Loadable(
  lazy(() => import('../pages/mr_user/rez/MrRezPage'))
);

const MrUserBmPage = Loadable(lazy(() => import('../pages/mr_user/bm/BmPage')));

const CarAdminCarManagePage = Loadable(
  lazy(() => import('../pages/car_admin/CarManage'))
);

const CarAdminRezPage = Loadable(
  lazy(() => import('../pages/car_admin/CarRez'))
);

const CarAdminOperationPage = Loadable(
  lazy(() => import('../pages/car_admin/CarOperation'))
);

const CarUserDashboardPage = Loadable(
  lazy(() => import('../pages/car_user/Dashboard'))
);

const MrAdminRegisterPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrRegister'))
);
const MrAdminMrListPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrList'))
);
const MrAdminNoticePage = Loadable(
  lazy(() => import('../pages/mr_admin/MrNotice'))
);
const MrAdminTestPage = Loadable(
  lazy(() => import('../pages/mr_admin/DashBoard'))
);
const CarUserRegisterPage = Loadable(
  lazy(() => import('../pages/car_user/Register'))
);

const CarAdminExamplePage = Loadable(
  lazy(() => import('../pages/car_admin/Example'))
);
const CarRezCompletePage = Loadable(
  lazy(() => import('../pages/car_user/CarRezComplete'))
);
const MrAdminNoticeListPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrNoticeList'))
);
const LoginPage = Loadable(lazy(() => import('../pages/user/Login')));

const MrAdminNoticeDetailPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrNoticeDeatails'))
);

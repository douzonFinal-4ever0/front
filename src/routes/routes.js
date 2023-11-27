import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
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
  const AnnonyMousRoutes = [
    {
      path: '/',
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'login', element: <LoginPage /> },
        { path: '*', element: <LoginPage /> }
      ]
    }
  ];
  const UserRoutes = [
    {
      path: '/',
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'login', element: <LoginPage /> },
        { path: '*', element: <Page404 /> },
        {
          path: '/mr/rez/:mr_rez_code',
          element: <MrQRPage />
        }
      ]
    },
    {
      path: '/mr',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/mr/dashboard" />, index: true },
        { path: 'dashboard', element: <MrUserDashboardPage /> },
        { path: 'rez', element: <MrUserMrRezPage /> },
        { path: 'rez/confirm', element: <MrUserMrRezConfirmPage /> },
        { path: 'rez/history', element: <MrUserMrRezHistory /> },
        { path: 'bm', element: <MrUserBmPage /> }
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
    }
  ];
  const routes = [
    {
      path: '/',
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'login', element: <LoginPage /> },
        { path: '*', element: <Page404 /> },
        {
          path: '/mr/rez/:mr_rez_code',
          element: <MrQRPage />
        }
      ]
    },
    {
      path: '/mr',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/mr/dashboard" />, index: true },
        { path: 'dashboard', element: <MrUserDashboardPage /> },
        { path: 'rez', element: <MrUserMrRezPage /> },
        { path: 'rez/confirm', element: <MrUserMrRezConfirmPage /> },
        { path: 'rez/history', element: <MrUserMrRezHistory /> },
        { path: 'bm', element: <MrUserBmPage /> }
      ]
    },
    // {
    //   children: [
    //     { element: <Navigate to="/" />, index: true },
    //     { path: '*', element: <Page404 /> }
    //   ]
    // },
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
      path: `/car/admin`,
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
          path: 'dashboard',
          element: <CarAdminDashboardPage />
        }
      ]
    },
    {
      path: `/mr/admin`,
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/mr/dashboard" />, index: true },
        { path: 'MrList', element: <MrAdminMrListPage /> },
        { path: 'MrRegister', element: <MrAdminRegisterPage /> },
        { path: 'Notice', element: <MrAdminNoticePage /> },
        { path: 'NoticeList', element: <MrAdminNoticeListPage /> },
        {
          path: 'NoticeDetail/:notice_code',
          element: <MrAdminNoticeDetailPage />
        },
        {
          path: 'MrStatistics',
          element: <MrAdminStatisticsPage />
        },
        { path: 'Test', element: <MrAdminTestPage /> }
      ]
    }
  ];

  /**
   * 사용자 역할에 따른 분류
   */
  let access = false;
  let accessAdmin = false;
  let filteredRoutes;
  const role = useSelector((state) => state.user.role);
  if (role === '관리자') {
    access = true;
    accessAdmin = true;
    filteredRoutes = routes;
  } else if (role === '사용자') {
    access = true;
    accessAdmin = false;
    filteredRoutes = UserRoutes;
  } else {
    access = false;
    accessAdmin = false;
    filteredRoutes = AnnonyMousRoutes;
  }

  const navigate = useNavigate();

  console.log(
    '--------------------------------기존 라우터--------------------------'
  );
  console.log(routes);
  console.log(
    '--------------------------------필터 라우터--------------------------'
  );
  console.log(filteredRoutes);

  return useRoutes(filteredRoutes);
};

export default Router;

const MrUserDashboardPage = Loadable(
  lazy(() => import('../pages/mr_user/dashboard/DashboardPage'))
);

const MrUserMrRezPage = Loadable(
  lazy(() => import('../pages/mr_user/rez/MrRezPage'))
);

const MrUserMrRezConfirmPage = Loadable(
  lazy(() => import('../pages/mr_user/rez_confirm/MrRezConfirmPage'))
);

const MrUserMrRezHistory = Loadable(
  lazy(() => import('../pages/mr_user/rez_history/MrRezHistoryPage'))
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

const CarAdminDashboardPage = Loadable(
  lazy(() => import('../pages/car_admin/Dashboard'))
);
const CarRezCompletePage = Loadable(
  lazy(() => import('../pages/car_user/CarRezComplete'))
);
const MrAdminNoticeListPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrNoticeList'))
);
const LoginPage = Loadable(lazy(() => import('../pages/user/Login')));

const MrAdminNoticeDetailPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrNoticeDetails'))
);
const MrQRPage = Loadable(lazy(() => import('../pages/mr_admin/QRPage')));

const MrAdminStatisticsPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrStatistics'))
);

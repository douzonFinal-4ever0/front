import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Page404 from '../pages/Page404';
import { useSelector } from 'react-redux';

const Loadable = (Component) => (props) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

const Router = ({ isAdminMode, setIsAdminMode }) => {
  /**
   * 사용자 역할에 따른 분류
   */
  const role = useSelector((state) => state.user.role);
  let access = false;
  let accessAdmin = false;
  if (role === '관리자') {
    access = true;
    accessAdmin = true;
  } else if (role === '사용자') {
    access = true;
    accessAdmin = false;
  } else {
    access = false;
    accessAdmin = false;
  }
  const isAdminRoute = accessAdmin ? 'admin' : '';

  const routes = [
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
      path: `/car/${isAdminRoute}`,
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
      path: `/mr/${isAdminRoute}`,
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
  ];

  const filteredRoutes = [];

  // 항상 로그인 페이지는 접속 가능
  filteredRoutes.push({
    path: '/',
    children: [
      { element: <Navigate to="/login" />, index: true },
      { path: 'login', element: <LoginPage /> }
    ]
  });

  if (access === false) {
    // access가 false인 경우, 로그인 페이지로 리다이렉트
    <Navigate to="/login" />;
  } else if (access === true) {
    if (accessAdmin === false) {
      // access가 true이고 accessAdmin이 false인 경우, ${isAdminRoute}이 없는 경로만 허용
      const nonAdminRoutes = routes.filter((route) => {
        if (isAdminRoute === '') {
          // isAdminRoute가 비어 있을 때, 빈 문자열이 아닌 경우만 추가
          return route.path !== '';
        } else {
          // isAdminRoute가 비어 있지 않을 때는 포함 여부 확인
          return !route.path.includes(isAdminRoute);
        }
      });

      filteredRoutes.push(...nonAdminRoutes);
    } else {
      // access가 true이고 accessAdmin이 true인 경우, 모든 경로 허용
      filteredRoutes.push(...routes);
    }
  }

  return useRoutes(routes);
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
  lazy(() => import('../pages/mr_admin/MrNoticeDetails'))
);

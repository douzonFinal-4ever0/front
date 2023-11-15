import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// -------------------------------------------
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import styled from '@emotion/styled';
import { HEADER_HIEGHT } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import {
  openSanckbar,
  closeSanckbar,
  setSnackbarContent
} from '../redux/reducer/SnackbarSlice';
import { Alert, Collapse, Snackbar } from '@mui/material';
import JWTdecode from '../components/common/JWTdecode';
import { useContext } from 'react';

const Layout = ({ isAdminMode, setIsAdminMode }) => {
  // 사이드바 오픈 여부 (boolean)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 메뉴 버튼 클릭 이벤트
  const handleMenuIconClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch();
  const isSnackbarOpen = useSelector((state) => state.snackbar.open);
  const snackbarContent = useSelector((state) => state.snackbar.content);

  const handleCloseSnackbar = () => {
    dispatch(closeSanckbar());
  };

  return (
    <>
      <StyledRoot sx={{ display: 'flex', flexDirection: 'column' }}>
        <JWTdecode />
        <Header
          onMenuIconClick={handleMenuIconClick}
          isAdminMode={isAdminMode}
          setIsAdminMode={setIsAdminMode}
        />
        <Collapse in={isSidebarOpen}>
          <Sidebar
            isOpen={isSidebarOpen}
            onMenuIconClick={handleMenuIconClick}
            isAdminMode={isAdminMode}
            setIsAdminMode={setIsAdminMode}
          />
        </Collapse>
        <StyledMain isSidebarOpen={isSidebarOpen}>
          <Outlet />
        </StyledMain>
      </StyledRoot>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarContent}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Layout;

// Custom Tags ------------------------------------------------------
const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const StyledMain = styled('div')(({ theme, isSidebarOpen }) => ({
  paddingTop: '110px',
  flexGrow: 1,
  overflow: 'hidden',
  // minHeight: '100%',
  height: 'auto',
  paddingBottom: 0,
  width: '100%',
  paddingLeft: isSidebarOpen ? '280px' : '0',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('lg')]: {
    paddingRight: '0'
  },
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

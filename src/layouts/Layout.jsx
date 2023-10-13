import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// -------------------------------------------
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import styled from '@emotion/styled';
import { HEADER_HIEGHT } from '../config';

const Layout = ({ isAdminMode, setIsAdminMode }) => {
  // 사이드바 오픈 여부 (boolean)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 메뉴 버튼 클릭 이벤트
  const handleMenuIconClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <StyledRoot sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header
        onMenuIconClick={handleMenuIconClick}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onMenuIconClick={handleMenuIconClick}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />
      <StyledMain isSidebarOpen={isSidebarOpen}>
        <Outlet />
      </StyledMain>
    </StyledRoot>
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
  paddingTop: HEADER_HIEGHT,
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingBottom: 0,
  // overflowX: 'hidden',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 0,
    paddingRight: 0
  },
  width: isSidebarOpen ? 'calc(100% - 240px)' : '100%',
  transition: 'width 0.3s ease',
  [theme.breakpoints.down('md')]: {
    width: '100%' // 사이드바가 닫혀있을 때 작은 화면에 맞게 조정
  }
}));

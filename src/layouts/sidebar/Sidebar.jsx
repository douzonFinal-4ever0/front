import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui -------------------------------------------
import { Drawer, Box } from '@mui/material';
// -------------------------------------------------
import MenuList from './MenuList';
import { DRAWER_WIDTH } from '../../config';
import styled from '@emotion/styled';

const Sidebar = (props) => {
  const { isOpen, isAdminMode, setIsAdminMode } = props;
  // 페이지 PATH
  const PATHNAME = useLocation().pathname;

  // 대메뉴 오픈 여부 (boolean)
  const [openMenu, setOpenMenu] = useState(null);

  // 클릭한 소메뉴 인덱스 (number)
  const [selectMenuItem, setSelectMenuItem] = useState(null);

  const drawerDisplay = isOpen ? 'flex' : 'none';

  // 메인 페이지일 경우엔 openMenu, selectMenuItem 값 초기화
  useEffect(() => {
    if (PATHNAME === '/') {
      setOpenMenu(null);
      setSelectMenuItem(null);
    }
  }, [PATHNAME]);

  // 대메뉴 클릭 이벤트
  const handleMenuCollapseClick = (index) => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  // 소메뉴 클릭 이벤트
  const handleMenuItemClick = (index) => {
    setSelectMenuItem((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      drawerDisplay={drawerDisplay}
      isAdminMode={isAdminMode}
    >
      <Box sx={{ pt: 10 }}>
        <MenuList
          openMenu={openMenu}
          selectMenuItem={selectMenuItem}
          handleMenuCollapseClick={handleMenuCollapseClick}
          handleMenuItemClick={handleMenuItemClick}
          isAdminMode={isAdminMode}
        />
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;

const StyledDrawer = styled(Drawer)(
  ({ theme, isAdminMode, drawerDisplay }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    display: drawerDisplay,
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
      zIndex: '1000',
      backgroundColor: isAdminMode
        ? theme.palette.mode.dark.bgMain
        : theme.palette.mode.light.bgMain
    }
  })
);

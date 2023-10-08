import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui -------------------------------------------
import { Drawer, Box } from '@mui/material';
// -------------------------------------------------
import MenuList from './MenuList';
import { DRAWER_WIDTH } from '../../config';

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
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        display: drawerDisplay,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          zIndex: '1000'
        }
      }}
      variant="persistent"
      anchor="left"
      open={isOpen}
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
    </Drawer>
  );
};

export default Sidebar;

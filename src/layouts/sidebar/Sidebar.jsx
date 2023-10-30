import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui -------------------------------------------
import { Drawer, Box, Button, ButtonGroup } from '@mui/material';
// -------------------------------------------------
import MenuList from './MenuList';
import { DRAWER_WIDTH } from '../../config';
import styled from '@emotion/styled';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { palette } from '../../theme/palette';
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
  const { isOpen, isAdminMode, setIsAdminMode } = props;

  const role = useSelector((state) => state.user.role);
  // const roleToAdmin = role === '관리자';
  let roleToAdmin = false;
  if (role == '관리자') {
    roleToAdmin = true;
    // setRoleToAdmin(true);
  } else {
    roleToAdmin = false;
    // setRoleToAdmin(false);
  }
  // 페이지 PATH
  const PATHNAME = useLocation().pathname;

  // 대메뉴 오픈 여부 (boolean)
  const [openMenu, setOpenMenu] = useState(null);

  // 클릭한 소메뉴 인덱스 (number)
  const [selectMenuItem, setSelectMenuItem] = useState(null);

  // const drawerDisplay = 'none';
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

  // 링크 이동 이벤트
  const navigate = useNavigate();

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      drawerdisplay={drawerDisplay}
      isAdminMode={isAdminMode}
    >
      <Box sx={{ pt: '110px', height: '100%' }}>
        <MenuList
          openMenu={openMenu}
          selectMenuItem={selectMenuItem}
          handleMenuCollapseClick={handleMenuCollapseClick}
          handleMenuItemClick={handleMenuItemClick}
          isAdminMode={isAdminMode}
        />
        {roleToAdmin && (
          <ButtonGroup
            sx={{
              width: '100% !important',
              height: '50px',
              position: 'absolute',
              bottom: '0px'
            }}
            aria-label="large button group"
          >
            {[
              <StyledButton
                key="one"
                sx={{
                  backgroundColor: isAdminMode
                    ? palette.common.white
                    : palette.grey['300']
                }}
                onClick={() => {
                  setIsAdminMode(false);
                  navigate('/mr/dashboard');
                }}
              >
                <AccountCircleIcon />
              </StyledButton>,
              <StyledButton
                key="two"
                sx={{
                  backgroundColor: isAdminMode
                    ? palette.grey['300']
                    : palette.common.white
                }}
                onClick={() => {
                  setIsAdminMode(true);
                  navigate('/mr/admin/MrRegister');
                }}
              >
                <AdminPanelSettingsIcon />
              </StyledButton>
            ]}
          </ButtonGroup>
        )}
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;

const StyledDrawer = styled(Drawer)(({ theme, drawerDisplay }) => ({
  // width: DRAWER_WIDTH,
  flexShrink: 0,
  display: drawerDisplay,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    zIndex: '1000',
    backgroundColor: theme.palette.mode.light.bgMain,
    height: '100%'
  },
  height: '100%'
}));

const StyledButton = styled(Button)(({ theme, drawerDisplay }) => ({
  width: '100%'
}));

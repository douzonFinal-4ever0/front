import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
// @mui -------------------------------------------
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  Stack
} from '@mui/material';
// @icons -------------------------------------------
import {
  MeetingRoomOutlined,
  DirectionsCarFilledOutlined,
  ContentPaste,
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined
} from '@mui/icons-material';

const MenuList = (props) => {
  const {
    openMenu, // 대메뉴 오픈 여부 (boolean)
    selectMenuItem, // 클릭한 소메뉴 인덱스 (number)
    handleMenuCollapseClick, // 대메뉴 클릭 이벤트
    handleMenuItemClick, // 소메뉴 클릭 이벤트
    isAdminMode // 관리자 여부
  } = props;

  // 사용자 메뉴 데이터
  const userMenu = [
    {
      index: 1,
      title: '회의실',
      icon: <StyledRoomIcon />,
      categories: [
        { index: 1, title: '회의실 조회', url: '/mr/dashboard' },
        { index: 2, title: '회의실 예약', url: '/mr/reservation' }
      ]
    },
    {
      index: 2,
      title: '차량',
      icon: <StyledCarIcon />,
      categories: [
        { index: 3, title: '차량 조회', url: '/car/dashboard' },
        { index: 4, title: '차량 예약', url: '/car/reservation' }
      ]
    }
  ];

  const adminMenu = [
    {
      index: 1,
      title: '회의실',
      icon: <StyledRoomIcon />,
      categories: [
        { index: 1, title: '회의실 등록', url: '/mr/admin/dashboard' },
        { index: 2, title: '회의실 삭제', url: '/mr/admin/reservation' }
      ]
    },
    {
      index: 2,
      title: '차량',
      icon: <StyledCarIcon />,
      categories: [
        { index: 3, title: '차량 관리', url: '/car/admin/carList' },
        { index: 4, title: '차량 삭제', url: '/car/admin/' }
      ]
    }
  ];

  let menu = isAdminMode ? adminMenu : userMenu;

  return (
    <List>
      {menu.map((menuItem) => (
        <React.Fragment key={menuItem.index}>
          {/* 대메뉴 아이템 */}
          <ListItem>
            <StyledMenuButton
              open={openMenu === menuItem.index}
              onClick={() => handleMenuCollapseClick(menuItem.index)}
            >
              <Stack direction="row">
                <ListItemIcon
                  sx={{
                    marginRight: '14px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    minWidth: 'auto'
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                <StyledMenuButtonText primary={menuItem.title} />
              </Stack>
              <ListItemIcon sx={{ minWidth: '0' }}>
                {openMenu === menuItem.index ? (
                  <StyledArrowUpIcon />
                ) : (
                  <StyledArrowDownIcon />
                )}
              </ListItemIcon>
            </StyledMenuButton>
          </ListItem>

          {/* 대메뉴 클릭 시 보여지는 소메뉴 리스트 */}
          <Collapse
            in={openMenu === menuItem.index}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {menuItem.categories.map((item) => (
                //소메뉴 아이템
                <ListItem
                  key={item.index}
                  sx={{ paddingLeft: '40px' }}
                  onClick={() => handleMenuItemClick(item.index)}
                >
                  <Link
                    to={item.url}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      textDecoration: 'none'
                    }}
                  >
                    <ListItemIcon
                      sx={{ marginRight: '14px', minWidth: 'auto' }}
                    >
                      <StyledSubMenuIcon />
                    </ListItemIcon>
                    <StyledMenuLinkText
                      isSelected={selectMenuItem === item.index}
                      primary={item.title}
                    />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default MenuList;

// Custom Tags ------------------------------------------------------
const StyledMenuButton = styled(Button)(({ theme, open }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: open ? theme.palette.mode.bgSub : 'initial',
  '&:hover, &:focus': {
    backgroundColor: theme.palette.mode.bgSub
  }
}));

const StyledRoomIcon = styled(MeetingRoomOutlined)(({ theme }) => ({
  color: theme.palette.mode.textMain
}));

const StyledCarIcon = styled(DirectionsCarFilledOutlined)(({ theme }) => ({
  color: theme.palette.mode.textMain
}));

const StyledArrowUpIcon = styled(KeyboardArrowUpOutlined)(({ theme }) => ({
  color: theme.palette.mode.textMain
}));

const StyledArrowDownIcon = styled(KeyboardArrowDownOutlined)(({ theme }) => ({
  color: theme.palette.mode.textMain
}));

const StyledSubMenuIcon = styled(ContentPaste)(({ theme }) => ({
  color: theme.palette.mode.textMain
}));

const StyledMenuButtonText = styled(ListItemText)(({ theme }) => ({
  '& span': {
    ...theme.typography.subtitle1,
    color: theme.palette.mode.textMain
  }
}));

const StyledMenuLinkText = styled(ListItemText)(({ theme, isSelected }) => ({
  '& span': {
    color: isSelected
      ? theme.palette.mode.textMain
      : theme.palette.mode.textSub,
    fontWeight: isSelected
      ? theme.typography.fontWeightBold
      : theme.typography.fontWeightRegular,
    fontSize: '14px'
  }
}));

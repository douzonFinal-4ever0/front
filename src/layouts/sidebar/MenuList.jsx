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
        { index: 3, title: '차량 예약 조회', url: '/carRez/dashboard' },
        { index: 4, title: '차량 예약', url: '/carRez/reservation' }
      ]
    }
  ];

  const adminMenu = [
    {
      index: 1,
      title: '회의실',
      icon: <StyledRoomIcon isAdminMode={isAdminMode} />,
      categories: [
        { index: 1, title: '회의실', url: '/mr/admin/MrRegister' },
        { index: 2, title: '회의실 예약 상황', url: '/mr/admin/MrList' }
      ]
    },
    {
      index: 2,
      title: '차량',
      icon: <StyledCarIcon isAdminMode={isAdminMode} />,
      categories: [
        { index: 3, title: '차량 관리', url: '/car/admin/carList' },
        { index: 4, title: '차량 삭제', url: '/car/admin/' }
      ]
    },
    {
      index: 3,
      title: '공지사항',
      icon: <StyledRoomIcon isAdminMode={isAdminMode} />,
      categories: [
        { index: 1, title: '공지사항 작성', url: '/mr/admin/Notice' },
        { index: 2, title: '공지사항 조회', url: '/mr/admin/NoticeList' },
        { index: 3, title: '테스트페이지', url: '/mr/admin/Test' }
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
              isAdminMode={isAdminMode}
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
                <StyledMenuButtonText
                  primary={menuItem.title}
                  isAdminMode={isAdminMode}
                />
              </Stack>
              <ListItemIcon sx={{ minWidth: '0' }}>
                {openMenu === menuItem.index ? (
                  <StyledArrowUpIcon isAdminMode={isAdminMode} />
                ) : (
                  <StyledArrowDownIcon isAdminMode={isAdminMode} />
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
                      <StyledSubMenuIcon isAdminMode={isAdminMode} />
                    </ListItemIcon>
                    <StyledMenuLinkText
                      isselected={selectMenuItem === item.index}
                      primary={item.title}
                      isAdminMode={isAdminMode}
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
const StyledMenuButton = styled(Button)(({ theme, open, isAdminMode }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: open
    ? isAdminMode
      ? theme.palette.mode.dark.bgSub
      : theme.palette.mode.light.bgSub
    : 'initial',
  '&:hover, &:focus': {
    backgroundColor: isAdminMode
      ? theme.palette.mode.dark.bgSub
      : theme.palette.mode.light.bgSub
  }
}));

const StyledRoomIcon = styled(MeetingRoomOutlined)(
  ({ theme, isAdminMode }) => ({
    color: isAdminMode
      ? theme.palette.mode.dark.textMain
      : theme.palette.mode.light.textMain
  })
);

const StyledCarIcon = styled(DirectionsCarFilledOutlined)(
  ({ theme, isAdminMode }) => ({
    color: isAdminMode
      ? theme.palette.mode.dark.textMain
      : theme.palette.mode.light.textMain
  })
);

const StyledArrowUpIcon = styled(KeyboardArrowUpOutlined)(
  ({ theme, isAdminMode }) => ({
    color: isAdminMode
      ? theme.palette.mode.dark.textMain
      : theme.palette.mode.light.textMain
  })
);

const StyledArrowDownIcon = styled(KeyboardArrowDownOutlined)(
  ({ theme, isAdminMode }) => ({
    color: isAdminMode
      ? theme.palette.mode.dark.textMain
      : theme.palette.mode.light.textMain
  })
);

const StyledSubMenuIcon = styled(ContentPaste)(({ theme, isAdminMode }) => ({
  color: isAdminMode
    ? theme.palette.mode.dark.textMain
    : theme.palette.mode.light.textMain
}));

const StyledMenuButtonText = styled(ListItemText)(({ theme, isAdminMode }) => ({
  '& span': {
    ...theme.typography.subtitle1,
    color: isAdminMode
      ? theme.palette.mode.dark.textMain
      : theme.palette.mode.light.textMain
  }
}));

const StyledMenuLinkText = styled(ListItemText)(
  ({ theme, isselected, isAdminMode }) => ({
    '& span': {
      color: isAdminMode
        ? theme.palette.mode.dark.textSub
        : theme.palette.mode.light.textSub,
      fontWeight: isselected
        ? theme.typography.fontWeightBold
        : theme.typography.fontWeightRegular,
      fontSize: '14px'
    }
  })
);

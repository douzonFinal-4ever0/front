import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// @mui -------------------------------------------
import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  menuItemClasses
} from '@mui/material';
// @icons -------------------------------------------
import {
  CampaignOutlined,
  Category,
  ContentPaste,
  DirectionsCarFilledOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  MeetingRoomOutlined
} from '@mui/icons-material';
// import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { useLocation } from 'react-router-dom';

const MenuList = (props) => {
  const {
    openMenu, // 대메뉴 오픈 여부 (boolean)
    handleMenuCollapseClick, // 대메뉴 클릭 이벤트
    isAdminMode, // 관리자 여부
    setIsAdminMode,
    setOpenMenu,
    selectedMenuIndex,
    setSelectedMenuIndex
  } = props;

  // 현재 url 표시
  const location = useLocation();
  const currentPath = location.pathname;

  // 사용자 메뉴 데이터
  const userMenu = [
    {
      index: 1,
      title: '회의실',
      icon: <StyledRoomIcon />,
      categories: [
        { index: 1, title: '대시보드', url: '/mr/dashboard' },
        { index: 2, title: '예약현황', url: '/mr/rez/history' },
        { index: 3, title: '즐겨찾기', url: '/mr/bm' }
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
      title: '회의실 관리',
      icon: <StyledRoomIcon isAdminMode={isAdminMode} />,
      categories: [
        { index: 1, title: '회의실', url: '/mr/admin/MrRegister' },
        { index: 2, title: '회의실 예약 상황', url: '/mr/admin/MrList' },
        { index: 3, title: '회의실 통계', url: '/mr/admin/MrStatistics' }
      ]
    },
    {
      index: 2,
      title: '차량 관리',
      icon: <StyledCarIcon isAdminMode={isAdminMode} />,
      categories: [
        { index: 3, title: '차량 관리', url: '/car/admin/carManage' },
        { index: 4, title: '예약 관리', url: '/car/admin/rez' },
        { index: 5, title: '운행 내역', url: '/car/admin/operation' },
        { index: 6, title: '주간 리포트', url: '/car/admin/dashboard' }
      ]
    },
    {
      index: 3,
      title: '공지사항',
      icon: <StyledCampaignOutlinedIcon isAdminMode={isAdminMode} />,
      categories: [
        { index: 1, title: '공지사항 작성', url: '/mr/admin/Notice' },
        { index: 2, title: '공지사항 조회', url: '/mr/admin/NoticeList' },
        { index: 3, title: '테스트페이지', url: '/mr/admin/Test' }
      ]
    }
  ];

  const findSelectedMenuIndex = (menu) => {
    const foundMenu = menu.find((menuItem) =>
      menuItem.categories.some((category) => category.url === currentPath)
    );

    if (foundMenu) {
      setSelectedMenuIndex(foundMenu.index);
      setOpenMenu(foundMenu.index);
    }
  };

  useEffect(() => {
    // currentPath가 userMenu에 있는지, AdminMenu에 있는지 확인하는 로직
    // currentPath가 userMenu에 있는지 확인
    const isUserMenu = userMenu.some((menuItem) =>
      menuItem.categories.some((category) => category.url === currentPath)
    );

    // currentPath가 adminMenu에 있는지 확인
    const isAdminMenu = adminMenu.some((menuItem) =>
      menuItem.categories.some((category) => category.url === currentPath)
    );

    // isAdminMode를 변경
    if (isUserMenu && !isAdminMode) {
      setIsAdminMode(false);
      findSelectedMenuIndex(userMenu);
    } else if (isAdminMenu && !isAdminMode) {
      setIsAdminMode(true);
      findSelectedMenuIndex(adminMenu);
    }
  }, [
    currentPath,
    selectedMenuIndex,
    setSelectedMenuIndex,
    setOpenMenu,
    setIsAdminMode
  ]);

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
                <ListItem key={item.index} sx={{ paddingLeft: '40px' }}>
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
                      isSelected={currentPath === item.url}
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
const StyledMenuButton = styled(Button)(({ theme, open }) => ({
  borderRadius: '2px',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: open ? theme.palette.mode.light.bgSub : 'initial',
  '&:hover': {
    backgroundColor: theme.palette.mode.light.bgSub
  }
}));

const StyledRoomIcon = styled(MeetingRoomOutlined)(({ theme }) => ({
  color: theme.palette.mode.light.textMain
}));

const StyledCarIcon = styled(DirectionsCarFilledOutlined)(({ theme }) => ({
  color: theme.palette.mode.light.textMain
}));

const StyledArrowUpIcon = styled(KeyboardArrowUpOutlined)(({ theme }) => ({
  color: theme.palette.mode.light.textMain
}));

const StyledArrowDownIcon = styled(KeyboardArrowDownOutlined)(({ theme }) => ({
  color: theme.palette.mode.light.textMain
}));

const StyledSubMenuIcon = styled(ContentPaste)(({ theme }) => ({
  color: theme.palette.mode.light.textMain
}));

const StyledCampaignOutlinedIcon = styled(CampaignOutlined)(({ theme }) => ({
  color: theme.palette.mode.light.textMain
}));

const StyledMenuButtonText = styled(ListItemText)(({ theme }) => ({
  '& span': {
    ...theme.typography.subtitle1,
    color: theme.palette.mode.light.textMain
  }
}));

const StyledMenuLinkText = styled(ListItemText)(({ theme, isSelected }) => ({
  '& span': {
    color: theme.palette.mode.light.textSub,
    fontWeight: isSelected
      ? theme.typography.fontWeightBold
      : theme.typography.fontWeightRegular,
    fontSize: '14px'
  }
}));

import React, { useContext, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/reducer/userSlice';
// @mui ------------------------------------------------------
import {
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Paper,
  Popover,
  Stack,
  Switch,
  Toolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
// @icons -------------------------------------------
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Avatar from '@mui/material/Avatar';
// ------------------------------------------------------
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoImage from '../../assets/images/logo/logo.png';
import UserProfile from '../../assets/images/user/user-round.svg';
import { HEADER_HIEGHT } from '../../config';
import { palette } from '../../theme/palette';
import { SocketContext } from '../../utils/SocketProvider';
import { useEffect } from 'react';

const Header = (props) => {
  const user = useSelector(setUserData).payload.user;
  const { onMenuIconClick, isAdminMode, setIsAdminMode } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  // popover ----------
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [isAlarm, setIsAlarm] = useState(false);
  const [alarmData, setAlarmData] = useState(null);
  // 알림
  const [open2, setOpen2] = useState(false);
  // 읽지 않은 알림이 있다고 알려주는 알림
  const [open3, setOpen3] = useState(false);

  const { name, position_name, mem_code, dept_name } = user;
  // const handleClick = (newPlacement) => (event) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen((prev) => placement !== newPlacement || !prev);
  //   setPlacement(newPlacement);
  // };
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('jwtToken');
    socket.emit('disconnect', mem_code);
    navigate('/login');
  };

  const handleClick = (event) => {
    setIsAlarm(false);
    setAnchorEl(event.currentTarget);
    setOpen2(true);
    setOpen3(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen2(false);
    setAlarmData(null);
  };
  const socket = useContext(SocketContext);
  useEffect(() => {
    console.log('qweqwe');
    console.log(isAlarm);
    socket.on('mrRezParticipant', (data) => {
      console.log('123124');
      setIsAlarm(true);
      setOpen3(true);
      console.log(data);
      setAlarmData({ ...alarmData, mrRezParticipant: data });
    });
    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      // socket.off('serverEvent');
    };
  }, [socket, isAlarm]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar isAdminMode={isAdminMode}>
        <StyledToolbar>
          <Box
            sx={{
              display: { md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 240
            }}
          >
            <StyledLogo to="/">
              <StyledLogoImage src={LogoImage} alt="logo" />
            </StyledLogo>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{ display: { md: 'flex' }, width: '13%', minWidth: '230px' }}
          >
            <Stack
              direction="row"
              width="100%"
              spacing={3}
              sx={{ alignItems: 'center' }}
            >
              <StyledBox
                width="100%"
                size="large"
                aria-label="check notifications"
                isAdminMode={isAdminMode}
              >
                <StyledAvatar
                  src={UserProfile}
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                />
                <Stack direction={'column'} width="70%" minWidth="120px">
                  <Typography
                    variant="subtitle2"
                    sx={{ color: palette.text.secondary }}
                  >
                    {user.name}
                  </Typography>
                  <Box
                    sx={{
                      display: { md: 'flex' },
                      width: '100%',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: palette.text.secondary
                      }}
                    >
                      {user.dept_name}
                    </Typography>
                    <KeyboardArrowDownIcon
                      sx={{ color: palette.text.disabled }}
                    />
                  </Box>
                </Stack>
              </StyledBox>
              {/* 알림이있으면 표시 */}
              <Badge
                sx={{ flexGrow: 1, margin: '0px !important' }}
                badgeContent=" "
                color="error"
                variant="dot"
                invisible={!isAlarm}
              >
                {/* 종모양 */}
                <StyledNotificationsIcon
                  isAdminMode={isAdminMode}
                  onClick={handleClick}
                />
              </Badge>
              <Popover
                open={open2}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <Typography sx={{ p: 2 }}>
                  {alarmData ? alarmData.mrRezParticipant : '알림이 없습니다'}
                </Typography>
              </Popover>
              <Popover
                open={open3}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <Typography sx={{ p: 2 }}>
                  읽지 않은 알림이 있습니다.
                </Typography>
              </Popover>
              {/* Popover 영역
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
                sx={{ zIndex: 2000 }}
                isAdminMode={isAdminMode}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={10}>
                    <StyledPaper isAdminMode={isAdminMode}>
                      <Box sx={{ p: 2 }}>
                        <StyledAdminCard isAdminMode={isAdminMode}>
                          <CardContent>
                            <Grid container spacing={3} direction="column">
                              <Grid item>
                                <Grid
                                  item
                                  container
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Grid item>
                                    <StyledText isAdminMode={isAdminMode}>
                                      관리자 모드
                                    </StyledText>
                                  </Grid>
                                  <Grid item>
                                    <StyledSwitch
                                      color="primary"
                                      checked={isAdminMode}
                                      isAdminMode={isAdminMode}
                                      onChange={(e) =>
                                        setIsAdminMode(e.target.checked)
                                      }
                                      name="sdm"
                                      size="small"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </StyledAdminCard>
                      </Box>
                      <Box sx={{ p: 2 }}>
                        <StyledAdminCard isAdminMode={isAdminMode}>
                          <CardContent>
                            <StyledText
                              isAdminMode={isAdminMode}
                              alignItems="center"
                            >
                              마이페이지
                            </StyledText>
                          </CardContent>
                        </StyledAdminCard>
                      </Box>
                    </StyledPaper>
                  </Fade>
                )}
              </Popper> */}
            </Stack>
          </Box>
          <Button onClick={handleLogOut}>
            {isAlarm ? 'qwe' : 'asd'}로그아웃
          </Button>
        </StyledToolbar>
        <StyledSubToolbar direction="row">
          <StyledButton onClick={onMenuIconClick}>
            <StyledMenuIcon isAdminMode={isAdminMode} />
          </StyledButton>
          <Typography
            variant="h5"
            marginLeft="10px"
            color={palette.common.white}
          >
            자원 관리
          </Typography>
        </StyledSubToolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;

// Custom Tags ------------------------------------------------------
const StyledAppBar = styled(AppBar)(({ theme, isAdminMode }) => ({
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  boxShadow: 'none',
  backgroundColor: theme.palette.mode.light.bgMain
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: HEADER_HIEGHT,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_HIEGHT
  }
}));

const StyledSubToolbar = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.logo.light,
  height: HEADER_HIEGHT,
  width: '100%',
  alignItems: 'center'
}));

const StyledLogo = styled(Link)(({ theme }) => ({
  ...theme.typography.h4,
  textDecoration: 'none'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.logo.dark,
  width: '3%',
  '&:hover': { backgroundColor: theme.palette.logo.dark },
  borderRadius: '0px',
  height: '100%'
}));

const StyledBox = styled(Box)(({ theme, isAdminMode }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: '10px',
  backgroundColor: theme.palette.common.white
}));

const StyledMenuIcon = styled(MenuIcon)(({ theme, isAdminMode }) => ({
  color: theme.palette.common.white
}));

const StyledNotificationsIcon = styled(NotificationsOutlinedIcon)(
  ({ theme, isAdminMode }) => ({
    color: theme.palette.mode.light.textMain
  })
);

const StyledChip = styled(Chip)(({ theme }) => ({
  height: '48px',
  alignItems: 'center',
  borderRadius: '27px',
  transition: 'all .2s ease-in-out',
  borderColor: theme.palette.mode.light.bgSub,
  backgroundColor: theme.palette.mode.light.bgSub,
  '&[aria-controls="menu-list-grow"], &:hover': {
    borderColor: theme.palette.mode.light.textSub,
    background: `${theme.palette.mode.light.textSub}!important`,
    color: theme.palette.mode.light.bgMain,
    '& svg': {
      stroke: theme.palette.mode.light.bgMain
    }
  },
  '& .MuiChip-label': {
    lineHeight: 0
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: '0px 0px 20px -5px rgba(0,0,0,0.2)',
  backgroundColor: theme.palette.mode.light.bgMain
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginTop: 'auto',
  marginBottom: 'auto',
  width: '45px',
  height: '45px'
}));

const StyledSettingIcon = styled(SettingsOutlinedIcon)(({ theme }) => ({
  color: theme.palette.mode.light.textMain
}));

const StyledLogoImage = styled('img')({
  maxWidth: '100px',
  height: 'auto'
});

const StyledAdminCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode.light.bgSub
}));

const StyledText = styled(Typography)(({ theme, alignItems }) => ({
  ...theme.typography.subtitle1,
  textAlign: alignItems,
  color: theme.palette.mode.light.textMain
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.primary.main
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.dark
  }
}));

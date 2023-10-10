import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// @mui ------------------------------------------------------
import { styled } from '@mui/material/styles';
import {
  Stack,
  AppBar,
  Box,
  Chip,
  Toolbar,
  IconButton,
  Popper,
  Fade,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch
} from '@mui/material';
// @icons -------------------------------------------
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Avatar from '@mui/material/Avatar';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// ------------------------------------------------------
import { HEADER_HIEGHT } from '../../config';
import UserProfile from '../../assets/images/user/user-round.svg';
import LogoImage from '../../assets/images/logo/logo.png';

const Header = (props) => {
  const { onMenuIconClick, isAdminMode, setIsAdminMode } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  // popover ----------
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
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
            <StyledIconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <StyledMenuIcon onClick={onMenuIconClick} />
            </StyledIconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { md: 'flex' } }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <StyledIconButton size="large" aria-label="check notifications">
                <StyledNotificationsIcon />
              </StyledIconButton>
              <StyledChip
                icon={
                  <StyledAvatar
                    src={UserProfile}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                  />
                }
                label={<StyledSettingIcon size="1.5rem" />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleClick('bottom-end')}
              />
              {/* Popover 영역 */}
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={10}>
                    <Paper
                      sx={{ boxShadow: '0px 0px 20px -5px rgba(0,0,0,0.2)' }}
                    >
                      <Box sx={{ p: 2 }}>
                        <StyledAdminCard>
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
                                    <StyledText>
                                      관리자 모드
                                    </StyledText>
                                  </Grid>
                                  <Grid item>
                                    <Switch
                                      color="primary"
                                      checked={isAdminMode}
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
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Stack>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;

// Custom Tags ------------------------------------------------------
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.mode.bgMain
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_HIEGHT,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_HIEGHT,
    padding: '16px 24px'
  }
}));

const StyledLogo = styled(Link)(({ theme }) => ({
  ...theme.typography.h4,
  textDecoration: 'none',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: '6px',
  width: '34px',
  height: '34px',
  borderRadius: '10px',
  backgroundColor: theme.palette.mode.bgSub
}));

const StyledMenuIcon = styled(MenuIcon)(({ theme }) => ({
  color: theme.palette.mode.textMain
}));

const StyledNotificationsIcon = styled(NotificationsOutlinedIcon)(
  ({ theme }) => ({
    color: theme.palette.mode.textMain
  })
);

const StyledChip = styled(Chip)(({ theme }) => ({
  height: '48px',
  alignItems: 'center',
  borderRadius: '27px',
  transition: 'all .2s ease-in-out',
  borderColor: theme.palette.mode.bgSub,
  backgroundColor: theme.palette.mode.bgSub,
  '&[aria-controls="menu-list-grow"], &:hover': {
    borderColor: theme.palette.mode.textSub,
    background: `${theme.palette.mode.textSub}!important`,
    color: theme.palette.mode.bgMain,
    '& svg': {
      stroke: theme.palette.mode.bgMain
    }
  },
  '& .MuiChip-label': {
    lineHeight: 0
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: '8px 0 8px 8px !important',
  width: '34px',
  height: '34px',
  cursor: 'pointer'
}));

const StyledSettingIcon = styled(SettingsOutlinedIcon)(({ theme }) => ({
  color: theme.palette.mode.textMain
}));

const StyledLogoImage = styled('img')({
  maxWidth: '100px',
  height: 'auto'
});

const StyledAdminCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100]
}));

const StyledText = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.mode.textMain
}));
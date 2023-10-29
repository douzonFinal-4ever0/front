import styled from '@emotion/styled';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { Box } from '@mui/system';

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import UserProfile from '../../../../assets/images/user/user-round.svg';

const MemberListItem = ({ isDisabled }) => {
  return (
    <StyledMemItem>
      <ListItemAvatar sx={{ marginRight: '20px' }}>
        <Avatar src={UserProfile} />
      </ListItemAvatar>
      <Box sx={{ display: 'flex', gap: '50px' }}>
        <ListItemText primary="임희진" />
        <ListItemText primary="팀장" />
        <ListItemText primary="개발1팀" />
        <ListItemText primary="asdf@gmail.com" />
        <ListItemText primary="010-5602-0990" />
      </Box>
      <StyledStarBtn disabled={isDisabled}>
        <StarRoundedIcon fontSize="large" color="warning" />
      </StyledStarBtn>
    </StyledMemItem>
  );
};

export default MemberListItem;

const StyledMemItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '2px',
  border: `1px solid ${theme.palette.grey['300']}`,
  '&:hover': {
    backgroundColor: theme.palette.grey['100']
  }
}));

const StyledStarBtn = styled(IconButton)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'flex-end',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

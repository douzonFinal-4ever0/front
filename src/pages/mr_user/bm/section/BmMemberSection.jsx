import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import styled from '@emotion/styled';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import WrapContainer from '../../../../components/mr_user/WrapContainer';
import UserProfile from '../../../../assets/images/user/user-round.svg';
import RectangleBtn from '../../../../components/common/RectangleBtn';

const MemberListItem = ({ isDisabled }) => {
  return (
    <StyledMemItem>
      <ListItemAvatar sx={{ marginRight: '20px' }}>
        <Avatar src={UserProfile} />
      </ListItemAvatar>
      <ListItemText primary="임희진" />
      <ListItemText primary="팀장" />
      <ListItemText primary="개발1팀" />
      <ListItemText primary="asdf@gmail.com" />
      <ListItemText primary="010-5602-0990" />
      <StyledStarBtn disabled={isDisabled}>
        <StarRoundedIcon fontSize="large" color="warning" />
      </StyledStarBtn>
    </StyledMemItem>
  );
};

const BmMemberSection = ({ data }) => {
  const handleModifyBtn = () => {
    console.log('수정');
  };

  const handleAddBtn = () => {
    console.log('추가');
  };

  return (
    <WrapContainer bgcolor={'#fff'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
            <StyledSectionText>즐겨찾기 멤버</StyledSectionText>
            <Stack direction={'row'} sx={{ gap: '8px' }}>
              <Box>
                <RectangleBtn
                  text={'수정'}
                  type={'button'}
                  category={'cancel'}
                  sx={{ padding: '10px 8px' }}
                  handlebtn={handleModifyBtn}
                />
              </Box>
              <Box>
                <RectangleBtn
                  text={'추가'}
                  type={'button'}
                  category={'modify'}
                  sx={{ padding: '10px 8px' }}
                  handlebtn={handleAddBtn}
                />
              </Box>
            </Stack>
          </Stack>
          <Grid item xs={12} sx={{ overflowY: 'scroll' }}>
            <List sx={{ height: '320px' }}>
              <MemberListItem isDisabled={true} />
              <MemberListItem isDisabled={true} />
              <MemberListItem isDisabled={true} />
              <MemberListItem isDisabled={true} />
              <MemberListItem isDisabled={true} />
              <MemberListItem isDisabled={true} />
              <MemberListItem isDisabled={true} />
              <MemberListItem isDisabled={true} />
            </List>
          </Grid>
        </Grid>
      </Grid>
    </WrapContainer>
  );
};

export default BmMemberSection;

const StyledSectionText = styled(Typography)(({ theme }) => ({
  paddingBottom: '6px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const StyledMemItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '2px',
  '&:hover': {
    backgroundColor: theme.palette.grey['100']
  }
}));

const StyledStarBtn = styled(IconButton)(({ theme }) => ({
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

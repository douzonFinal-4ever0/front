import styled from '@emotion/styled';
import {
  Avatar,
  AvatarGroup,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  Box
} from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FolderIcon from '@mui/icons-material/Folder';

import { palette } from '../../../../theme/palette';
import UserProfile from '../../../../assets/images/user/user-round.svg';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const GroupBtn = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <StyledGroupBtn>
        <FolderIcon
          sx={{
            fontSize: '280px',
            color: '#e6f1fc'
          }}
        />
      </StyledGroupBtn>
      <StyledGroupHeader>
        <StyledGroupName>그룹명이다</StyledGroupName>
        <StyledStarBtn disabled>
          <StarRoundedIcon fontSize="large" color="warning" />
        </StyledStarBtn>
      </StyledGroupHeader>
      <StyledGroupAvatars
        renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
        total={10}
      >
        <Avatar alt="Remy Sharp" src={UserProfile} />
        <Avatar alt="Travis Howard" src={UserProfile} />
        <Avatar alt="Agnes Walker" src={UserProfile} />
        <Avatar alt="Trevor Henderson" src={UserProfile} />
      </StyledGroupAvatars>
    </Box>
  );
};

const BmGroupSection = () => {
  return (
    <WrapContainer bgcolor={'#fff'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
            <StyledSectionTitle>즐겨찾기 그룹</StyledSectionTitle>
            <Stack direction={'row'} sx={{ gap: '8px' }}>
              <Box>
                <RectangleBtn
                  text={'수정'}
                  type={'button'}
                  category={'cancel'}
                  sx={{ padding: '10px 8px' }}
                />
              </Box>
              <Box>
                <RectangleBtn
                  text={'추가'}
                  type={'button'}
                  category={'modify'}
                  sx={{ padding: '10px 8px' }}
                />
              </Box>
            </Stack>
          </Stack>
          <Grid item xs={12}>
            <Box>
              <Stack
                direction={'row'}
                sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
              >
                <GroupBtn />
                <GroupBtn />
                <GroupBtn />
                <GroupBtn />
                <GroupBtn />
                <GroupBtn />
                <GroupBtn />
                <GroupBtn />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </WrapContainer>
  );
};

export default BmGroupSection;

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  paddingBottom: '6px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const StyledGroupHeader = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: '32%',
  left: '20%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '50px'
}));

const StyledGroupName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px'
}));

const StyledStarBtn = styled(IconButton)(({ theme }) => ({
  padding: 0
}));

const StyledGroupAvatars = styled(AvatarGroup)(({ theme }) => ({
  position: 'absolute',
  top: '60%',
  left: '16%'
}));

const StyledGroupBtn = styled(IconButton)(({ theme }) => ({
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

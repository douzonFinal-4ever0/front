import styled from '@emotion/styled';
import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { Box } from '@mui/system';

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import UserProfile from '../../../../assets/images/user/user-round.svg';
import { useState } from 'react';

const MemberListItem = ({
  isDisabled,
  data,
  deleteMemCodeList,
  setDeleteMemCodeList
}) => {
  const {
    bm_group_code,
    bm_group_name,
    mem_code,
    name,
    position_name,
    dept_name,
    email,
    tel,
    profile_url
  } = data;

  // 즐겨찾기 여부
  const [isBookmark, setIsBookMark] = useState(true);

  // 즐겨찾기 버튼 이벤트
  const handleStarBtnClick = (e) => {
    if (isBookmark) {
      setDeleteMemCodeList([...deleteMemCodeList, mem_code]);
    } else {
      const res = deleteMemCodeList.filter((item) => item !== mem_code);
      setDeleteMemCodeList([...res]);
    }

    setIsBookMark(!isBookmark);
  };

  return (
    <StyledMemItem>
      <ListItemAvatar sx={{ marginRight: '20px' }}>
        <Avatar src={UserProfile} />
      </ListItemAvatar>
      <Grid container>
        <Grid item xs={1.5}>
          <ListItemText primary={name} />
        </Grid>
        <Grid item xs={1.5}>
          <ListItemText primary={position_name} />
        </Grid>
        <Grid item xs={2}>
          <ListItemText primary={dept_name} />
        </Grid>
        <Grid item xs={3.5}>
          <ListItemText primary={email} />
        </Grid>
        <Grid item xs={3.5}>
          <ListItemText primary={tel} />
        </Grid>
      </Grid>
      <StyledStarBtn disabled={isDisabled} onClick={handleStarBtnClick}>
        {isBookmark ? (
          <StarRoundedIcon fontSize="large" color="warning" />
        ) : (
          <StarBorderRoundedIcon fontSize="large" color="warning" />
        )}
      </StyledStarBtn>
    </StyledMemItem>
  );
};

export default MemberListItem;

const StyledMemItem = styled(ListItem)(({ theme }) => ({
  marginBottom: '6px',
  borderRadius: '2px',
  border: `1px solid ${theme.palette.grey['300']}`,
  '&:hover': {
    backgroundColor: theme.palette.grey['300']
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

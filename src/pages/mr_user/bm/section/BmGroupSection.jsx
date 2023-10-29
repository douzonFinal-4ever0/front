import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Avatar,
  AvatarGroup,
  ListItemButton,
  ListItemText,
  IconButton,
  List,
  Collapse,
  Typography,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import UserProfile from '../../../../assets/images/user/user-round.svg';
import { palette } from '../../../../theme/palette';
import styled from '@emotion/styled';
import MemberListItem from '../list/MemberListItem';

const GroupItem = ({ isDisabled, index, openList, setOpenList }) => {
  const open = openList[index];

  const handleClick = () => {
    const updatedOpenList = [...openList];
    updatedOpenList[index] = !open;
    setOpenList(updatedOpenList);
  };

  return (
    <Accordion
      expanded={open}
      onChange={handleClick}
      sx={{
        boxShadow: 'none',
        border: `1px solid ${palette.grey['100']}`,
        borderRadius: '2px'
      }}
    >
      {/* 그룹  */}
      <AccordionSummary>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
        <Box sx={{ display: 'flex', gap: '50px', paddingLeft: '20px' }}>
          <ListItemText
            primary="그룹명이올시다"
            sx={{ display: 'flex', alignItems: 'center' }}
          />
          <ListItemText
            primary="총 6명"
            sx={{ display: 'flex', alignItems: 'center' }}
          />
          <AvatarGroup
            renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
            total={10}
          >
            <Avatar alt="Remy Sharp" src={UserProfile} />
            <Avatar alt="Travis Howard" src={UserProfile} />
            <Avatar alt="Agnes Walker" src={UserProfile} />
            <Avatar alt="Trevor Henderson" src={UserProfile} />
          </AvatarGroup>
        </Box>
        <StyledStarBtn disabled={isDisabled}>
          <StarRoundedIcon fontSize="large" color="warning" />
        </StyledStarBtn>
      </AccordionSummary>

      {/* 상세 멤버 리스트 */}
      <AccordionDetails>
        <List component="div">
          <MemberListItem isDisabled={true} />
          <MemberListItem isDisabled={true} />
          <MemberListItem isDisabled={true} />
          <MemberListItem isDisabled={true} />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

const BmGroupSection = () => {
  const [openList, setOpenList] = useState(Array(12).fill(false)); // 12개의 ListItem를 위한 open 상태 배열

  return (
    <Grid container sx={{ width: '100%', overflowY: 'auto' }}>
      <List
        sx={{
          width: '100%',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '6px'
        }}
      >
        {openList.map((open, index) => (
          <GroupItem
            key={index}
            isDisabled={true}
            index={index}
            openList={openList}
            setOpenList={setOpenList}
          />
        ))}
      </List>
    </Grid>
  );
};

export default BmGroupSection;

const StyledStarBtn = styled(IconButton)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'flex-end',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

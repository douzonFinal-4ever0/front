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

const GroupItem = ({ isDisabled, index, data }) => {
  const { bm_group_name, mem_list } = data;

  console.log(data);
  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        border: `1px solid ${palette.grey['300']}`,
        borderRadius: '2px'
      }}
    >
      {/* 그룹  */}
      <AccordionSummary>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
        <Grid container sx={{ marginLeft: '20px' }}>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemText
              primary={
                <Typography fontWeight={700}>{bm_group_name}</Typography>
              }
              sx={{ display: 'flex', alignItems: 'center' }}
            />
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemText
              primary={`${mem_list.length}명`}
              sx={{ display: 'flex', alignItems: 'center' }}
            />
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <AvatarGroup
              renderSurplus={(surplus) => (
                <span>+{surplus.toString()[0]}k</span>
              )}
              total={mem_list.length}
            >
              {mem_list.map((mem, index) => (
                <Avatar
                  alt="Remy Sharp"
                  src={mem.profile_img_url}
                  key={index}
                />
              ))}
            </AvatarGroup>
          </Grid>
        </Grid>
        <StyledStarBtn disabled={isDisabled}>
          <StarRoundedIcon fontSize="large" color="warning" />
        </StyledStarBtn>
      </AccordionSummary>

      {/* 상세 멤버 리스트 */}
      <AccordionDetails>
        <List component="div">
          {mem_list.map((item, index) => (
            <MemberListItem isDisabled={true} data={item} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

const BmGroupSection = ({ data }) => {
  return (
    <Grid
      container
      sx={{
        width: '100%',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: palette.grey['500'],
          borderRadius: '10px'
        },
        '&::-webkit-scrollbar': {
          width: '10px',
          backgroundColor: '#eee',
          borderRadius: '10px'
        }
      }}
    >
      <List
        sx={{
          width: '100%',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '6px'
        }}
      >
        {data.map((item, index) => (
          <GroupItem key={index} isDisabled={true} index={index} data={item} />
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

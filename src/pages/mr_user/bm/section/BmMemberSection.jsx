import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import styled from '@emotion/styled';
import MemberListItem from '../list/MemberListItem';

const BmMemberSection = ({ data }) => {
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
        <MemberListItem isDisabled={true} />
        <MemberListItem isDisabled={true} />
        <MemberListItem isDisabled={true} />
        <MemberListItem isDisabled={true} />
        <MemberListItem isDisabled={true} />
        <MemberListItem isDisabled={true} />
        <MemberListItem isDisabled={true} />
        <MemberListItem isDisabled={true} />
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
  );
};

export default BmMemberSection;

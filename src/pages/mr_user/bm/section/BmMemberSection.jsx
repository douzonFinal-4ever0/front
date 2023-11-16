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
import { palette } from '../../../../theme/palette';

const BmMemberSection = ({
  data,
  isModify,
  deleteMemCodeList,
  setDeleteMemCodeList
}) => {
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
          <MemberListItem
            key={index}
            isDisabled={!isModify}
            data={item}
            deleteMemCodeList={deleteMemCodeList}
            setDeleteMemCodeList={setDeleteMemCodeList}
          />
        ))}
      </List>
    </Grid>
  );
};

export default BmMemberSection;

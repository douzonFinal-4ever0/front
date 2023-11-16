import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography
} from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { palette } from '../../../../theme/palette';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Notice = ({ data }) => {
  return (
    <>
      <WrapContainer bgcolor={'#fff'}>
        <Stack
          direction={'row'}
          sx={{ justifyContent: 'space-between', marginBottom: '10px' }}
        >
          <Typography variant="h6">공지사항</Typography>
          <StyledLink to={''}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
              전체보기
            </Typography>
            <KeyboardArrowRightRoundedIcon />
          </StyledLink>
        </Stack>
        <Box>
          <List
            sx={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}
          >
            {data.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  padding: '10px 8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: `1px solid ${palette.grey['300']}`
                }}
              >
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <StyledLabel>회의실</StyledLabel>
                  <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                    {item.notice_title}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#aaa', fontSize: '14px' }}>
                  {item.updated_at.substring(0, 10)}
                </Typography>
              </ListItemButton>
            ))}
          </List>
          {/* <NoticeTable data={data} /> */}
        </Box>
      </WrapContainer>
    </>
  );
};

export default Notice;

const StyledLabel = styled(Typography)(({ theme }) => ({
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '13px',
  color: theme.palette.grey['700'],
  backgroundColor: theme.palette.grey['300']
}));

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: '#333',
  display: 'flex'
}));

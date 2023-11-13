import { Stack, Typography } from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const Statistics = () => {
  return (
    <WrapContainer bgcolor={'#fff'}>
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Typography variant="h6">실시간 회의실 현황</Typography>
        <Typography sx={{ fontSize: '14px', color: '#999' }}>
          2023.11.12 13:00 기준
        </Typography>
      </Stack>
    </WrapContainer>
  );
};

export default Statistics;

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: '#333',
  display: 'flex'
}));

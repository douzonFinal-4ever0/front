import { Box, Grid, List, Stack, Typography } from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import styled from '@emotion/styled';
import { palette } from '../../../../theme/palette';

const BmMrSection = () => {
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
      ></List>
    </Grid>
  );
};

export default BmMrSection;

const StyledSectionText = styled(Typography)(({ theme }) => ({
  paddingBottom: '6px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 'bold'
}));

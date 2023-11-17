import { Box, Grid, List, Stack, Typography } from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import styled from '@emotion/styled';
import { palette } from '../../../../theme/palette';
import MrListItem from '../list/MrListItem';
import MrInfoSection from '../../rez/section/MrInfoSection';

const BmMrSection = ({ data }) => {
  console.log(data);
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
          rowGap: '6px',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'flex-start'
        }}
      >
        {data &&
          data.map((mr, index) => (
            <Grid
              item
              xs={3.9}
              sx={{
                padding: '20px',
                border: `1px solid ${palette.grey['400']}`
              }}
            >
              <MrInfoSection data={mr.mr} key={index} />
            </Grid>
          ))}
      </List>
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

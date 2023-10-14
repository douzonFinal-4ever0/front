// @MUI--------------------------------------------------------------------
import { Box, Grid } from '@mui/material';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
// --------------------------------------------------------------------
import SectionTitle from '../../../../components/mr_user/SectionTitle';
import TimeTable from '../../../../components/mr_user/TimeTable';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import { BORDER_RADIUS, PAGE_INNER_PADDING } from '../../../../config';
import { palette } from '../../../../theme/palette';

const MrRezDashboard = ({ schedule }) => {
  return (
    <Box component="section">
      <Grid container spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <Box
            component={'section'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: `${PAGE_INNER_PADDING}px`
            }}
          >
            <SectionTitle title="회의실 예약 현황">
              <TableChartRoundedIcon />
            </SectionTitle>
            <WrapContainer bgColor={palette.grey['100']}>
              <Box sx={{ overflowX: 'scroll' }}>
                <TimeTable schedule={schedule} />
              </Box>
            </WrapContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MrRezDashboard;

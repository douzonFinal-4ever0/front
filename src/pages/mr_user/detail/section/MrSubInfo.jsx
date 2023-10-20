// @MUI--------------------------------------------------------------------
import { Box, Grid, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
// --------------------------------------------------------------------
import { PAGE_INNER_PADDING } from '../../../../config';
import { palette } from '../../../../theme/palette';
import SectionTitle from '../../../../components/mr_user/SectionTitle';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import styled from '@emotion/styled';
import Tag from '../../../../components/mr_user/Tag';

const MrSubInfo = ({ data }) => {
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
            <SectionTitle title="회의실 부가 정보">
              <InfoIcon />
            </SectionTitle>
            <WrapContainer bgcolor={palette.grey['100']}>
              <Grid container>
                <Grid item xs={2}>
                  <StyledTitle>기본 장비</StyledTitle>
                </Grid>
                <Grid item xs={10}>
                  <Stack direction={'row'} flexWrap={'wrap'} gap={'4px'}>
                    {data.map((item) => (
                      <Tag
                        text={item.name}
                        isHashTag={false}
                        bgcolor={palette.grey['600']}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </WrapContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MrSubInfo;

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightBold
}));

import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';

import SubHeader from '../../../components/common/SubHeader';
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';

const BmPage = () => {
  return (
    <>
      <SubHeader title={'즐겨찾기'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Grid container spacing={3}>
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <StyledStepText>즐겨찾기 그룹</StyledStepText>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Stack>
                      <GroupsIcon />
                      <GroupsIcon />
                      <GroupsIcon />
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <StyledStepText>즐겨찾기 멤버</StyledStepText>
              </Grid>
            </Grid>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default BmPage;

const StyledStepText = styled(Typography)(({ theme }) => ({
  paddingBottom: '6px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold'
}));

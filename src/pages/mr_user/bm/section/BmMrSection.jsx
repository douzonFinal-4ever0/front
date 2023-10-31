import { Box, Grid, Stack, Typography } from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import styled from '@emotion/styled';

const BmMrSection = () => {
  const handleModifyBtn = () => {
    console.log('수정');
  };

  const handleAddBtn = () => {
    console.log('추가');
  };
  return (
    <WrapContainer bgcolor={'#fff'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
            <StyledSectionText>즐겨찾기 회의실</StyledSectionText>
            <Stack direction={'row'} sx={{ gap: '8px' }}>
              <Box>
                <RectangleBtn
                  text={'수정'}
                  type={'button'}
                  category={'cancel'}
                  sx={{ padding: '10px 8px' }}
                  handlebtn={handleModifyBtn}
                />
              </Box>
              <Box>
                <RectangleBtn
                  text={'추가'}
                  type={'button'}
                  category={'modify'}
                  sx={{ padding: '10px 8px' }}
                  handlebtn={handleAddBtn}
                />
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </WrapContainer>
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

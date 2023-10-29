import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled
} from '@mui/material';

import SubHeader from '../../../components/common/SubHeader';
import MainContainer from '../../../components/mr_user/MainContainer';
import BmGroupSection from './section/BmGroupSection';
import BmMemberSection from './section/BmMemberSection';
import BmMrSection from './section/BmMrSection';

const BmPage = () => {
  return (
    <>
      <SubHeader title={'즐겨찾기'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <Stack spacing={3}>
            {/* 그룹 */}
            <BmGroupSection />
            {/* 멤버 */}
            <BmMemberSection />
            {/* 회의실 */}
            <BmMrSection />
          </Stack>
        </MainContainer>
      </Box>
    </>
  );
};

export default BmPage;

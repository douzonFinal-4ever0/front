import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled
} from '@mui/material';

import SubHeader from '../../../components/common/SubHeader';
import MainContainer from '../../../components/mr_user/MainContainer';
import BmGroupSection from './section/BmGroupSection';
import BmMemberSection from './section/BmMemberSection';
import BmMrSection from './section/BmMrSection';
import { useState } from 'react';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import RectangleBtn from '../../../components/common/RectangleBtn';

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const BmPage = () => {
  const [selectTab, setSelectTab] = useState(0);
  // 탭 버튼 이벤트
  const handleTabClick = (event, newValue) => {
    setSelectTab(newValue);
  };

  const handleModifyBtn = () => {
    console.log('수정');
  };

  const handleAddBtn = () => {
    console.log('추가');
  };
  return (
    <>
      <SubHeader title={'즐겨찾기'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Tabs
              value={selectTab}
              onChange={handleTabClick}
              sx={{ borderBottom: '1px solid #e8e8e8' }}
            >
              <Tab label="멤버" {...a11yProps(0)} sx={{ fontSize: '16px' }} />
              <Tab label="그룹" {...a11yProps(1)} sx={{ fontSize: '16px' }} />
              <Tab label="회의실" {...a11yProps(2)} sx={{ fontSize: '16px' }} />
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexGrow: 1,
                  justifyContent: 'flex-end',
                  gap: '8px'
                }}
              >
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
                    category={'register'}
                    sx={{ padding: '10px 8px' }}
                    handlebtn={handleAddBtn}
                  />
                </Box>
              </Stack>
            </Tabs>
            <CustomTabPanel value={selectTab} index={0}>
              <BmMemberSection />
            </CustomTabPanel>
            <CustomTabPanel value={selectTab} index={1}>
              <BmGroupSection />
            </CustomTabPanel>
            <CustomTabPanel value={selectTab} index={2}>
              Item Three
            </CustomTabPanel>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default BmPage;

// {/* <Stack spacing={3}>
// {/* 멤버 */}
// <BmMemberSection />
// </Stack> */}

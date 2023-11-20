import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';

import { setBmData } from '../../../redux/reducer/BmSlice';
import { setUserData } from '../../../redux/reducer/userSlice';
import axiosInstance from '../../../utils/axios';
import SubHeader from '../../../components/common/SubHeader';
import MainContainer from '../../../components/mr_user/MainContainer';
import BmGroupSection from './section/BmGroupSection';
import BmMemberSection from './section/BmMemberSection';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import RectangleBtn from '../../../components/common/RectangleBtn';
import BmMemModal from './modal/BmMemModal';
import BmMrSection from './section/BmMrSection';

const BmPage = () => {
  const dispatch = useDispatch();
  const bmData = useSelector(setBmData).payload.bm;
  // 사용자 정보
  const userData = useSelector(setUserData).payload.user;
  const { mem_code } = userData;

  // 삭제할 멤버 번호 리스트
  const [deleteMemCodeList, setDeleteMemCodeList] = useState([]);
  // 선택한 페이지 탭 (멤버/그룹/회의실)
  const [selectTab, setSelectTab] = useState(0);
  // 즐겨찾기 멤버
  const [memList, setMemList] = useState([]);
  // 즐겨찾기 그룹
  const [groupList, setGroupList] = useState([]);
  // 즐겨찾기 회의실
  const [mrList, setMrList] = useState([]);

  //=====================================================

  // 서버에서 전달받은 전체 멤버 리스트
  const [members, setMembers] = useState([]);
  // 모달창 적용 대상 리스트
  const [selectMems, setSelectMems] = useState([]);
  // 모달창 오픈
  const [openModal, setOpenModal] = useState(false);

  // 모달창 오픈 이벤트
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  // 첫 로드 시 서버로부터 즐겨찾기 데이터 가져오기
  useEffect(() => {
    bmMRApi();
    bmGroupMemApi();
  }, []);

  // 즐겨찾기 회의실 API
  const bmMRApi = async () => {
    const res = await axiosInstance.axiosInstance.get(
      `/mr/bm?mem_code=${mem_code}`
    );
    if (res.status !== 200) return;
    const { data } = res;
    // 즐겨찾기 회의실 리덕스 저장
    dispatch(setBmData({ data }));
    setMrList(data);
  };

  // 즐겨찾기 조회 API
  const bmGroupMemApi = async () => {
    const res = await axiosInstance.axiosInstance.get(
      `/mr/mem/bm?mem_code=${mem_code}`
    );
    const { data } = res;

    // 개별 멤버
    const memResult =
      data.length !== 0 && data.filter((item) => item.bm_group_name === null);
    // 그룹 & 그룹 멤버
    const groupResult =
      data.length !== 0 && data.filter((item) => item.bm_group_name !== null);

    // 그룹핑
    const groupedData = [];
    groupResult &&
      groupResult.forEach((item) => {
        const { bm_group_name, ...rest } = item;

        // 해당 bm_group_code가 이미 존재하는지 확인
        const existingGroup = groupedData.find(
          (group) => group.bm_group_name === bm_group_name
        );

        if (existingGroup) {
          // 이미 존재하는 경우 mem_list 배열에 추가
          existingGroup.mem_list.push(rest);
        } else {
          // 새로운 그룹 생성
          const newGroup = { bm_group_name, mem_list: [rest] };
          groupedData.push(newGroup);
        }
      });

    if (data.length !== 0) {
      setMemList([...memResult]);
      setGroupList([...groupedData]);
    }
  };

  // 페이지 탭 버튼 이벤트
  const handleTabClick = (event, newValue) => {
    setSelectTab(newValue);
  };

  // 삭제 버튼 이벤트
  const handleDeleteBtn = () => {
    console.log('삭제');
  };

  // 등록 버튼 이벤트
  const handleAddBtn = async () => {
    console.log('추가');

    const res = await axiosInstance.axiosInstance.get('/mr/mem');
    setMembers(res.data);
    setOpenModal(!openModal);
  };

  // 수정 취소 버튼 이벤트
  const handleCancelBtn = () => {
    console.log('취소');
  };

  // 수정 확인 버튼 이벤트
  const handleConfirmBtn = async () => {
    console.log('확인');
    // 삭제 리스트를 db에 보내서 deleted_at 업데이트 하기
    const res = await axiosInstance.axiosInstance.patch('/mr/mem/bm', {
      deleteMemCodeList
    });

    // 토스트 메시지 제공
  };

  const registerName = (selectTab) => {
    switch (selectTab) {
      case 0:
        return '그룹 등록';
      case 1:
        return '멤버 등록';
      case 2:
        return '회의실 등록';
      default:
        return;
    }
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
              <Tab label="그룹" {...a11yProps(0)} sx={{ fontSize: '16px' }} />
              <Tab label="멤버" {...a11yProps(1)} sx={{ fontSize: '16px' }} />
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
                    text={'삭제'}
                    type={'button'}
                    category={'cancel'}
                    sx={{ padding: '10px 8px' }}
                    handlebtn={handleDeleteBtn}
                  />
                </Box>
                <Box>
                  <RectangleBtn
                    text={registerName(selectTab)}
                    type={'button'}
                    category={'register'}
                    sx={{ padding: '10px 8px' }}
                    handlebtn={handleAddBtn}
                  />
                </Box>
              </Stack>
            </Tabs>
            <CustomTabPanel value={selectTab} index={0}>
              <BmGroupSection data={groupList} />
            </CustomTabPanel>
            <CustomTabPanel value={selectTab} index={1}>
              <BmMemberSection
                data={memList}
                deleteMemCodeList={deleteMemCodeList}
                setDeleteMemCodeList={setDeleteMemCodeList}
              />
            </CustomTabPanel>
            <CustomTabPanel value={selectTab} index={2}>
              <BmMrSection data={mrList} />
            </CustomTabPanel>
          </WrapContainer>
        </MainContainer>
      </Box>
      <BmMemModal
        selectTab={selectTab}
        open={openModal}
        handleModal={handleModal}
        list={members}
        initList={memList}
        selectMems={selectMems}
        setSelectMems={setSelectMems}
        master={mem_code}
        bmGroupMemApi={bmGroupMemApi}
      />
    </>
  );
};

export default BmPage;

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

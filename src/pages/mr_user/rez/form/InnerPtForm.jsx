import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import { setUserData } from '../../../../redux/reducer/userSlice';
import axiosInstance from '../../../../utils/axios';

import RectangleBtn from '../../../../components/common/RectangleBtn';
import { palette } from '../../../../theme/palette';
import PtModal from '../modal/PtModal';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

const InnerPtForm = ({ ptList, setPtList, clickTagData, setClickTagData }) => {
  const { pathname } = useLocation();
  const isDetailModal = pathname === '/mr/rez/history' ? true : false;

  const userData = useSelector(setUserData).payload.user;
  const { mem_code } = userData;
  // 모달창 오픈
  const [openModal, setOpenModal] = useState(false);
  // ------------------------------------------------------------

  // 전체 사용자 리스트
  const [totalMemberList, setTotalMemberList] = useState([]);
  // 적용 대상 리스트
  const [applyMemberList, setApplyMemberList] = useState([]);
  // 전체 사용자  토글 데이터
  const [isToggleMemList, setIsToggletMemList] = useState([]);
  // 적용 대상 토글 데이터
  const [isToggleApplyList, setIsToggleApplyList] = useState([]);
  // ------------------------------------------------------------
  // 즐겨찾기 그룹
  const [bmGroupList, setBmGroupList] = useState([]);
  // 즐겨찾기 멤버 토글 데이터
  const [isToggleBmMemList, setIsToggleBmMemList] = useState([]);

  useEffect(() => {
    getMembersApi(); // 전체 사용자 리스트 조회
  }, []);

  // 전체 사용자 데이터 받는 API
  const getMembersApi = async () => {
    try {
      const res = await axiosInstance.axiosInstance.get('/mr/mem');
      if (res.status !== 200) return;

      // 전체 사용자 리스트 업데이트
      setTotalMemberList(res.data);
      // 선택 토글 리스트 값 생성
      setIsToggletMemList(
        Array.from({ length: totalMemberList.length }, () => false)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 즐겨찾기 데이터 받는 API
  const getBmMemberApi = async (mem_code) => {
    try {
      const res = await axiosInstance.axiosInstance.get(
        `/mr/mem/bm?mem_code=${mem_code}`
      );
      // console.log(res);
      if (res.status !== 200) return;
      //  즐겨찾기 그룹 리스트 업데이트
      setBmGroupList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 모달창 오픈 이벤트
  const handleModalOpen = () => {
    setOpenModal(!openModal);
  };

  // 참석자 추가 버튼 이벤트
  const handleInnerPtBtn = async () => {
    if (bmGroupList.length === 0) {
      getBmMemberApi(mem_code);
    }

    handleModalOpen();
  };

  return (
    <>
      {ptList && (
        <List sx={{ width: '100%' }}>
          <PtCardList
            mem_code={mem_code}
            data={ptList}
            setPtList={setPtList}
            clickTagData={clickTagData}
            setClickTagData={setClickTagData}
          />
        </List>
      )}
      <RectangleBtn
        type={'button'}
        text={'참석자 추가'}
        sx={{ padding: '14px 12px', backgroundColor: palette.grey['500'] }}
        handlebtn={handleInnerPtBtn}
      />
      <PtModal
        open={openModal}
        handleModal={handleModalOpen}
        userCode={mem_code}
        ptList={ptList}
        setPtList={setPtList}
        totalMemberList={totalMemberList}
        setTotalMemberList={setTotalMemberList}
        applyMemberList={applyMemberList}
        setApplyMemberList={setApplyMemberList}
        isToggleMemList={isToggleMemList}
        setIsToggletMemList={setIsToggletMemList}
        isToggleApplyList={isToggleApplyList}
        setIsToggleApplyList={setIsToggleApplyList}
        bmGroupList={bmGroupList}
        setBmGroupList={setBmGroupList}
        setIsToggleBmMemList={setIsToggleBmMemList}
      />
    </>
  );
};

export default InnerPtForm;

// 참석자 카드 리스트 컴포넌트
const PtCardList = ({
  mem_code,
  data,
  setPtList,
  tagData,
  clickTagData,
  setClickTagData,
  ptList,
  setApplyMemberList
}) => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const masterCode = mem_code;

  // 참석자 카드 삭제 버튼 이벤트
  const handleCardDeleteBtn = (e) => {
    const deleteIndex = e.currentTarget.tabIndex;

    let copyList = [...data];
    copyList.splice(deleteIndex, 1);
    const newRez = { ...rezData, mr_pt_list: copyList };
    dispatch(setRezData({ data: newRez }));
    setPtList(copyList);
  };

  const handleRecomIcon = (e) => {
    // recomList 에서 제거
    if (tagData) {
      const copy = [...tagData];
      const a =
        copy && copy.filter((item) => item.mem_code !== e.currentTarget.name);

      setClickTagData([...a]);
      //setClickTagData(a);

      // const mem =
      //   tagData.length &&
      //   tagData.filter((item) => item.mem_code === e.currentTarget.name);

      // const memInfo = {
      //   dept_name: mem[0].memVO.deptVO.dept_name,
      //   mem_code: mem[0].memVO.mem_code,
      //   name: mem[0].memVO.name,
      //   position: mem[0].memVO.position_name
      // };

      // setPtList([...data, memInfo]);
    }
    // data 에 추가
  };

  console.log(data);
  return (
    <>
      {/* 추가된 참석자 리스트  */}
      {data.map((mem, index) => (
        <ListItem
          key={index}
          secondaryAction={
            mem.mem_code === masterCode ? (
              <Box
                sx={{
                  padding: '4px',
                  fontSize: '12px',
                  backgroundColor: palette.grey['300'],
                  borderRadius: '2px'
                }}
              >
                예약자
              </Box>
            ) : (
              <IconButton
                edge="end"
                aria-label="delete"
                tabIndex={index}
                onClick={handleCardDeleteBtn}
              >
                <DeleteForeverRoundedIcon />
              </IconButton>
            )
          }
        >
          <ListItemAvatar>
            <Avatar src={mem.profile_img_url} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Stack direction={'row'} gap={1}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {mem.name}
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}
                >
                  {mem.position_name}
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}
                >
                  | {mem.deptVO ? mem.deptVO.dept_name : mem.dept_name}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      ))}
    </>
  );
};

// // 전체 멤버 조회
// const res = await axiosInstance.axiosInstance.get('/mr/mem');
// setMembers(res.data);
// // 즐겨찾기 멤버 조회
// const bmRes = await axiosInstance.axiosInstance.get(
//   `/mr/mem/bm?mem_code=${mem_code}`
// );
// const { data } = bmRes;
// // 개별 멤버
// const memResult = data.filter((item) => item.bm_group_name === null);
// // 그룹 & 그룹 멤버
// const groupResult = data.filter((item) => item.bm_group_name !== null);
// // 그룹핑
// const groupedData = [];
// groupResult.forEach((item) => {
//   const { bm_group_name, ...rest } = item;
//   // 해당 bm_group_code가 이미 존재하는지 확인
//   const existingGroup = groupedData.find(
//     (group) => group.bm_group_name === bm_group_name
//   );
//   if (existingGroup) {
//     // 이미 존재하는 경우 mem_list 배열에 추가
//     existingGroup.mem_list.push(rest);
//   } else {
//     // 새로운 그룹 생성
//     const newGroup = { bm_group_name, mem_list: [rest] };
//     groupedData.push(newGroup);
//   }
// });
// setMemList([...memResult]);
// setGroupList([...groupedData]);
// setButtonStates(Array.from({ length: memResult.length }, () => false));
// setIsApplyToggle(Array.from({ length: mr_pt_list.length }, () => false));
// setSelectMems(mr_pt_list);
// setOpenModal(!openModal);

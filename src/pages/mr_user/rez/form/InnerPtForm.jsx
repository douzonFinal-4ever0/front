import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const InnerPtForm = () => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const userData = useSelector(setUserData).payload.user;
  const { mem_code } = userData;

  // 모달창 오픈
  const [openModal, setOpenModal] = useState(false);
  // 참석자 리스트
  const [ptList, setPtList] = useState([]);
  // 전체 사용자 리스트
  const [totalMemberList, setTotalMemberList] = useState([]);
  // 적용 대상 리스트
  const [applyMemberList, setApplyMemberList] = useState([]);
  // 전체 사용자  토글 데이터
  const [isToggleMemList, setIsToggletMemList] = useState([]);
  // 적용 대상 토글 데이터
  const [isToggleApplyList, setIsToggleApplyList] = useState([]);

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
      //setBmGroupList(res.data);
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
    handleModalOpen();
  };

  // 참석자 카드 삭제 버튼 이벤트
  const handleCardDeleteBtn = (e) => {
    const index = e.currentTarget.tabIndex;
    const copyList = [...ptList];
    copyList.splice(index, 1);
    setPtList(copyList);
    setApplyMemberList(copyList);
  };

  // 참석자 카드 리스트 컴포넌트
  const PtCardList = ({ data }) => {
    return (
      <List sx={{ width: '100%' }}>
        {data.map((mem, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                tabIndex={index}
                onClick={handleCardDeleteBtn}
              >
                <DeleteForeverRoundedIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack direction={'row'} gap={1}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {mem.name}
                  </Typography>
                </Stack>
              }
              secondary={
                <Typography sx={{ fontSize: '14px' }}>{mem.email}</Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      {ptList && <PtCardList data={ptList} />}
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
      />
    </>
  );
};

export default InnerPtForm;

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

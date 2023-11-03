import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import { setUserData } from '../../../../redux/reducer/userSlice';
import axiosInstance from '../../../../utils/axios';

import RectangleBtn from '../../../../components/common/RectangleBtn';
import { palette } from '../../../../theme/palette';
import InnterPtModal from '../modal/InnerPtModal';

import {
  Avatar,
  Box,
  ListItem,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';

const InnerPtForm = () => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const userData = useSelector(setUserData).payload.user;
  const { mr_pt_list } = rezData;
  const { mem_code } = userData;

  // 모달창 오픈
  const [openModal, setOpenModal] = useState(false);
  // 서버에서 전달받은 멤버 리스트
  const [members, setMembers] = useState([]);
  // 모달창 적용 대상 리스트
  const [selectMems, setSelectMems] = useState([]);
  // 즐겨찾기 멤버
  const [memList, setMemList] = useState([]);
  // 즐겨찾기 그룹
  const [groupList, setGroupList] = useState([]);
  // 전체 멤버 리스트 클릭 시 컬러 활성화 여부
  const [buttonStates, setButtonStates] = useState([]);
  // 적용 대상 리스트 클릭 시 컬러 활성화 여부
  const [isApplyToggle, setIsApplyToggle] = useState([]);
  // 참석자 추가 버튼 이벤트
  const handleInnerPtBtn = async () => {
    // 전체 멤버 조회
    const res = await axiosInstance.get('/mr/mem');
    setMembers(res.data);

    // 즐겨찾기 멤버 조회
    const bmRes = await axiosInstance.get(`/mr/mem/bm?mem_code=${mem_code}`);
    const { data } = bmRes;

    // 개별 멤버
    const memResult = data.filter((item) => item.bm_group_name === null);
    // 그룹 & 그룹 멤버
    const groupResult = data.filter((item) => item.bm_group_name !== null);

    // 그룹핑
    const groupedData = [];
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

    setMemList([...memResult]);
    setGroupList([...groupedData]);
    setButtonStates(Array.from({ length: memResult.length }, () => false));
    setIsApplyToggle(Array.from({ length: mr_pt_list.length }, () => false));

    setSelectMems(mr_pt_list);
    setOpenModal(!openModal);
  };

  // 모달창 오픈 이벤트
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  // 멤버 삭제 버튼 이벤트
  const handleDeleteMem = (e) => {
    const lestMems = mr_pt_list.filter(
      (user) => user.mem_code !== mr_pt_list[e.currentTarget.tabIndex].mem_code
    );
    const newRezData = { ...rezData, mr_pt_list: lestMems };
    dispatch(setRezData({ data: newRezData }));
  };

  const MemList = ({ list }) => {
    return (
      <Box>
        <List>
          {list.map((user, index) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
              <IconButton
                tabIndex={index}
                edge="end"
                aria-label="delete"
                onClick={handleDeleteMem}
              >
                <ClearIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <>
      {mr_pt_list.length !== 0 ? <MemList list={mr_pt_list} /> : null}
      <RectangleBtn
        type={'button'}
        text={'참석자 추가'}
        sx={{ padding: '14px 12px', backgroundColor: palette.grey['500'] }}
        handlebtn={handleInnerPtBtn}
      />
      <InnterPtModal
        open={openModal}
        handleModal={handleModal}
        list={members}
        ptList={mr_pt_list}
        selectMems={selectMems}
        setSelectMems={setSelectMems}
        groupList={groupList}
        buttonStates={buttonStates}
        setButtonStates={setButtonStates}
        isApplyToggle={isApplyToggle}
        setIsApplyToggle={setIsApplyToggle}
      />
    </>
  );
};

export default InnerPtForm;

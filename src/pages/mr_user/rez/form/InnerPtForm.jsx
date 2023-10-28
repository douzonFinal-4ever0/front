import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
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
  const { mr_pt_list } = rezData;

  // 모달창 오픈
  const [openModal, setOpenModal] = useState(false);
  // 서버에서 전달받은 멤버 리스트
  const [members, setMembers] = useState([]);
  // 모달창 적용 대상 리스트
  const [selectMems, setSelectMems] = useState([]);

  // 참석자 추가 버튼 이벤트
  const handleInnerPtBtn = async () => {
    const res = await axiosInstance.get('/mr/mem');
    setMembers(res.data);
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
      />
    </>
  );
};

export default InnerPtForm;

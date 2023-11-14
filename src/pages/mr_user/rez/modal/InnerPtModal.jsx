import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import Toggle from '../../../../components/common/Toggle';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import { palette } from '../../../../theme/palette';

const InnerPtModal = ({
  open,
  handleModal,
  list,
  selectMems,
  setSelectMems,
  groupList,
  buttonStates,
  setButtonStates,
  isApplyToggle,
  setIsApplyToggle
}) => {
  const dispatch = useDispatch();
  const rezData = useSelector(setRezData).payload.mrUser;
  const { mr_pt_list } = rezData;

  // (우측창) 적용 대상 리스트에서 선택된 멤버
  const [checkMemName, setCheckMemName] = useState([]);

  // (좌측창) 전체 리스트에서 선택된 멤버 리스트
  const [addMemList, setAddMemList] = useState([]);

  // 즐겨찾기 리스트에서 선택된 멤버
  const [addBmMems, setAddBmMems] = useState([]);

  // 선택된 토글 버튼 값
  const [selectBtn, setSelectBtn] = useState('all');

  // 토글버튼 데이터
  const toggleData = [
    {
      index: 0,
      value: 'all',
      name: '전체'
    },
    {
      index: 1,
      value: 'search',
      name: '검색'
    },
    {
      index: 2,
      value: 'bm',
      name: '즐겨찾기'
    }
  ];

  // 부서명 추출
  const uniqueDeptNames = new Set();
  list.forEach((user) => {
    if (user.deptVO && user.deptVO['dept_name']) {
      uniqueDeptNames.add(user.deptVO['dept_name']);
    }
  });
  // 부서명 array
  const uniqueDeptNamesArray = Array.from(uniqueDeptNames);

  // 부서별 사원 array
  const deptList = [];
  uniqueDeptNamesArray.forEach((i) => {
    const dept = list.filter((user) => user.deptVO['dept_name'] === i);
    deptList.push(dept);
  });

  // 트리 데이터
  const result = uniqueDeptNamesArray.map((item, index) => ({
    dept: item,
    members: deptList[index]
  }));

  // 토글 버튼 이벤트
  const handleToggleBtn = (e) => {
    setSelectBtn(e.currentTarget.value);
  };

  // 트리 데이터 아이템 클릭 이벤트
  const handleSelect = (event, nodeIds) => {
    // 아이템 클릭 시 컬러 변경
    const index = list.findIndex((item) => item.name === nodeIds);

    if (index !== -1) {
      const newButtonStates = [...buttonStates];
      newButtonStates[index] = !newButtonStates[index];
      setButtonStates(newButtonStates);
    }

    // 선택 클릭 해제 시 addMemList 리스트에서 제거
    if (buttonStates[index]) {
      const mem = list.filter((item) => item.name === nodeIds);
      const newArr = [...addMemList].filter((item) => item !== mem[0].mem_code);
      setAddMemList(newArr);
    }

    //그룹명 클릭 오류 방지
    const groupList = [];
    result.forEach((group) => groupList.push(group.dept));
    const isGroup = groupList.filter((item) => item === nodeIds);
    if (isGroup.length !== 0) return;

    // 클릭된 멤버 정보 찿기
    const selectMem = list.filter((mem) => mem.name === nodeIds);

    // 멤버 중복 오류 방지
    addMemList.forEach((item) => {
      if (item === selectMem.mem_code) return;
    });

    // 기존에 등록된 멤버 오류 방지
    const isExist = addMemList.filter((mem) => mem === selectMem[0].mem_code);
    if (isExist.length !== 0) return;

    // 선택된 멤버 코드 addMemList에 담기
    if (selectMem.length !== 0 && !buttonStates[index]) {
      const res = [...addMemList, selectMem[0].mem_code];
      setAddMemList(res);
      setIsApplyToggle([
        ...isApplyToggle,
        ...Array.from({ length: res.length }, () => false)
      ]);
    }
  };

  // 적용 대상 아이템 클릭 이벤트
  const handlePtItem = (event, nodeId) => {
    // 아이템 클릭 시 컬러 변경
    const index = mr_pt_list.findIndex((item) => item.mem_code === nodeId);

    if (index !== -1) {
      const newButtonStates = [...isApplyToggle];
      newButtonStates[index] = !newButtonStates[index];
      setIsApplyToggle(newButtonStates);
    }

    // 중복 선택 오류 방지
    const res = checkMemName.filter((item) => item === nodeId);
    if (res.length !== 0) return;

    setCheckMemName([...checkMemName, nodeId]);
  };

  // 즐겨찾기 트리 데이터 클릭 이벤트
  const handleBmGroup = (event, nodeId) => {
    const res = groupList.filter((group) => group.bm_group_name === nodeId);
    setAddBmMems([...res[0].mem_list]);
  };

  // 추가 버튼 이벤트
  const handleAddBtn = () => {
    // 1) 전체 토글================================================
    if (selectBtn === 'all') {
      // 적용 대상 리스트에 이미 존재하는 멤버일 경우 제외시키기
      let copyArr = [...addMemList];
      selectMems.forEach((item) => {
        const res = copyArr.filter((a) => a !== item.mem_code);
        copyArr = [...res];
      });

      setAddMemList(copyArr);

      // 최종 멤버들
      const res = [];
      copyArr.forEach((pickMem) => {
        const member = list.filter((item) => item.mem_code === pickMem);
        res.push(...member);
      });
      setSelectMems([...selectMems, ...res]);
      setAddMemList([]); //초기화
      setButtonStates(Array.from({ length: list.length }, () => false)); // 초기화
    }

    // 2) 즐겨찾기 토글================================================
    if (selectBtn === 'bm') {
      setSelectMems([...selectMems, ...addBmMems]);
      return;
    }
  };

  // 제외 버튼 이벤트
  const handleDeleteBtn = () => {
    let res = [...selectMems];

    checkMemName.forEach((item) => {
      const member = res.filter((mem) => mem.mem_code !== item);
      res = member;
    });

    setSelectMems(res);
    setIsApplyToggle(Array.from({ length: res.length }, () => false));
  };

  // 확인 버튼 이벤트
  const handleConfirm = () => {
    const newRezData = { ...rezData, mr_pt_list: selectMems };
    handleModal();
    dispatch(setRezData({ data: newRezData }));
    //setSelectMems([]); //초기화
  };

  // 취소 버튼 이벤트
  const handleCancelBtn = () => {
    setAddMemList([]); // 초기화
    setButtonStates(Array.from({ length: list.length }, () => false)); // 초기화
    handleModal();
  };

  // 이미 등록된 멤버 표시하는 라벨
  const InitLabel = ({ code }) => {
    const res = mr_pt_list.filter((item) => item.mem_code === code);

    if (res.length !== 0) {
      return (
        <Typography
          sx={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '11px',
            borderRadius: '2px',
            backgroundColor: palette.grey['100']
          }}
        >
          등록
        </Typography>
      );
    }

    return null;
  };

  const ContentByToggle = () => {
    switch (selectBtn) {
      case 'all':
        return (
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={handleSelect}
          >
            {result.map((item, index) => (
              <TreeItem nodeId={item.dept} label={item.dept} key={item.dept}>
                {item.members.map((item, index) => (
                  <TreeItem
                    key={item.mem_code}
                    nodeId={item.name}
                    label={
                      <Stack direction={'row'} gap={1}>
                        <Typography
                          sx={{ fontSize: '14px', fontWeight: 'bold' }}
                        >
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: '13px' }}>
                          ({item.email})
                        </Typography>
                        <InitLabel code={item.mem_code} />
                      </Stack>
                    }
                    sx={{
                      color: buttonStates[
                        list.findIndex((i) => i.name === item.name)
                      ]
                        ? palette.primary.main
                        : palette.grey['900']
                    }}
                  />
                ))}
              </TreeItem>
            ))}
          </TreeView>
        );
      case 'search':
        return <Box>서치</Box>;
      case 'bm':
        return (
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={handleBmGroup}
          >
            {groupList.map((item, index) => (
              <TreeItem
                nodeId={item.bm_group_name}
                label={item.bm_group_name}
                key={index}
              >
                {item.mem_list.map((item, index) => (
                  <TreeItem
                    nodeId={item.name}
                    label={
                      <Stack direction={'row'} gap={1}>
                        <Typography
                          sx={{ fontSize: '14px', fontWeight: 'bold' }}
                        >
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: '13px' }}>
                          ({item.email})
                        </Typography>
                      </Stack>
                    }
                  />
                ))}
              </TreeItem>
            ))}
          </TreeView>
        );
      default:
        return;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth={true}
      maxWidth={'md'}
      PaperProps={{
        sx: {
          height: '550px'
        }
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">참석자 추가</Typography>
        </DialogTitle>
        <IconButton
          onClick={handleModal}
          aria-label="close"
          sx={{ padding: '24px' }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <Grid container sx={{ display: 'flex', height: '100%' }}>
          <Grid item xs={5}>
            <Stack sx={{ rowGap: '20px' }}>
              <Toggle
                data={toggleData}
                selectBtn={selectBtn}
                handleToggleBtn={handleToggleBtn}
                sx={{ width: '100%' }}
              />
              <Box
                sx={{
                  padding: '20px 10px',
                  height: '300px',
                  border: '1px solid #aaa',
                  overflowY: 'scroll'
                }}
              >
                {ContentByToggle()}
              </Box>
            </Stack>
          </Grid>

          {/* 버튼 영역 */}
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Stack spacing={1}>
              <StyledArrowBtn aria-label="add" onClick={handleAddBtn}>
                추가
              </StyledArrowBtn>
              <StyledArrowBtn aria-label="delete" onClick={handleDeleteBtn}>
                제외
              </StyledArrowBtn>
            </Stack>
          </Grid>

          {/* 적용 영역 */}
          <Grid item xs={5} sx={{ paddingTop: '40px' }}>
            <Typography variant="h6">적용 대상 </Typography>
            <Box
              sx={{
                padding: '20px 10px',
                height: '300px',
                border: '1px solid #aaa',
                overflowY: 'scroll'
              }}
            >
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                onNodeSelect={handlePtItem}
              >
                {selectMems &&
                  selectMems.map((item, index) => (
                    <TreeItem
                      nodeId={item.mem_code}
                      key={item.mem_code}
                      label={
                        <Stack direction={'row'} gap={1}>
                          <Typography
                            sx={{ fontSize: '14px', fontWeight: 'bold' }}
                          >
                            {item.name}
                          </Typography>
                          <Typography sx={{ fontSize: '13px' }}>
                            ({item.email})
                          </Typography>
                        </Stack>
                      }
                      sx={{
                        color:
                          isApplyToggle &&
                          isApplyToggle[
                            mr_pt_list.findIndex(
                              (i) => i.mem_code === item.mem_code
                            )
                          ]
                            ? palette.primary.main
                            : palette.grey['900']
                      }}
                    />
                  ))}
              </TreeView>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ paddingBottom: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',

            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex', gap: '10px', width: '300px' }}>
            <RectangleBtn
              type={'button'}
              text={'취소'}
              category={'cancel'}
              sx={{ padding: '10px 8px' }}
              handlebtn={handleCancelBtn}
            />
            <RectangleBtn
              type={'button'}
              text={'확인'}
              category={'register'}
              sx={{ padding: '10px 8px' }}
              handlebtn={handleConfirm}
            />
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default InnerPtModal;

const StyledListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.grey['500']}`
}));

const StyledArrowBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey['100']
}));

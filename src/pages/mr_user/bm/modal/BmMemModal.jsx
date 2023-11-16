import { TreeItem, TreeView } from '@mui/x-tree-view';
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSpring, animated } from '@react-spring/web';
import { alpha, styled } from '@mui/material/styles';
import {
  Badge,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Toggle from '../../../../components/common/Toggle';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import Label from '../../../../components/common/Label';
import Collapse from '@mui/material/Collapse';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';

import { palette } from '../../../../theme/palette';
import axiosInstance from '../../../../utils/axios';
import { useEffect } from 'react';

// 좌측 선택 영역 (조직도)
const ContentByToggle = ({
  selectBtn,
  uniqueDeptNamesArray,
  tempAddList,
  selectTab,
  setTempAddList,
  result,
  InitLabel
}) => {
  switch (selectBtn) {
    case 'all':
      // 멤버 클릭 시 이벤트
      const handleItemClick = (e, nodeId) => {
        // nodeId : 이름
        // 부서명 클릭 시 오류 선택 불가 처리
        if (uniqueDeptNamesArray.includes(nodeId)) return;

        // 기존 임시 리스트 중복 체크
        const res = tempAddList.filter((item) => item === nodeId);
        if (res.length !== 0) return;

        // 임시 리스트에 추가
        setTempAddList([...tempAddList, nodeId]);
      };
      return (
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={handleItemClick}
        >
          {result &&
            result.map((item, index) => (
              <TreeItem nodeId={item.dept} label={item.dept} key={index}>
                {item.members.map((item, index) => (
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
                        {selectTab === 0 ? (
                          <InitLabel code={item.mem_code} />
                        ) : null}
                      </Stack>
                    }
                    sx={{
                      margin: '4px 0'
                    }}
                  />
                ))}
              </TreeItem>
            ))}
        </TreeView>
      );
    case 'search':
      return <Box>서치</Box>;
    case 'bookmark':
      return <Box>즐겨찾기</Box>;
    default:
      return;
  }
};

// 우측 적용 영역 (적용 대상)
const ApplyTrees = ({
  selectMems,
  setTemApplyList,
  tempApplyList,
  applyList,
  list
}) => {
  // 선택된 참석자 아이템 클릭 이벤트
  const handlePtItem = (event, nodeId) => {
    // 중복 제거
    const res = tempApplyList.filter((item) => item === nodeId);
    if (res.length !== 0) return;
    // 중복 제거한 데이터 업데이트
    setTemApplyList([...tempApplyList, nodeId]);
  };

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handlePtItem}
    >
      {applyList &&
        applyList.map((item, index) => (
          <TreeItem
            nodeId={item.mem_code}
            label={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '2px 0px'
                }}
              >
                <Stack direction={'row'} gap={'4px'}>
                  <StyledUserName>{item.name}</StyledUserName>
                  <StyledUserEmail>{item.position_name}</StyledUserEmail>
                  <StyledUserEmail>| {item.deptVO.dept_name}</StyledUserEmail>
                </Stack>
              </Box>
            }
            key={index}
          />
        ))}
    </TreeView>
  );
};

const BmMemModal = ({
  selectTab, // 멤버, 그룹, 회의실
  open,
  handleModal,
  list,
  initList,
  selectMems,
  setSelectMems,
  master,
  bmGroupMemApi
}) => {
  // (좌측창) 전체 리스트에서 선택된 멤버 리스트
  const [addMemName, setAddMemName] = useState([]);
  // 좌측창 임시 리스트
  const [tempAddList, setTempAddList] = useState([]);
  // 좌측창 선택 여부 tf 리스트
  const [leftGroup, setLeftGroup] = useState([]);

  // 우측창 적용 대상 리스트
  const [applyList, setApplyList] = useState([]);
  // (우측창) 적용 대상 리스트에서 선택된 멤버
  const [tempApplyList, setTemApplyList] = useState([]);

  // 모달창 그룹명
  const [groupName, setGroupName] = useState('');
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
    const selecMem = list.filter((mem) => mem.name === nodeIds);
    if (selecMem.length !== 0) {
      setAddMemName([...addMemName, selecMem[0].mem_code]);
    }
  };

  // 그룹명 인풋 이벤트
  const handleGroupNameInput = (e) => {
    setGroupName(e.target.value);
  };

  // 추가 버튼 이벤트
  const handleAddBtn = () => {
    const res = [];

    tempAddList.forEach((item) => {
      const addMem = list.filter((mem) => mem.name === item);
      res.push(...addMem);
    });

    setApplyList(res);

    // // 이미 등록된 사용자일 경우 경고창
    // const res = initList.filter((item) => item.mem_code === addMemName);
    // if (res.length !== 0 && selectTab === 0) {
    //   alert('이미 등록된 사용자입니다.');
    //   return;
    // }

    // const isExist = selectMems.find(
    //   (item) => item.mem_code === addMem[0].mem_code
    // );
    // if (isExist) return;
    // setSelectMems([...selectMems, ...addMem]);
  };

  // 제외 버튼 이벤트
  const handleDeleteBtn = () => {
    // 적용 대상 리스트 업데이트
    const list = [...applyList];
    let res = list.filter((item) => !tempApplyList.includes(item.mem_code));
    setApplyList(res);
  };

  // 확인 버튼 이벤트
  const handleConfirm = async () => {
    const result = [];

    tempAddList.forEach((item) => {
      const res = list.filter((mem) => mem.name === item);

      result.push(res[0].mem_code);
    });

    const data = {
      groupName: groupName,
      master: master,
      members: result
    };

    try {
      const res = await axiosInstance.axiosInstance.post('/mr/mem/bm', data);
      if (res.status === 201) {
        alert('즐겨찾기 등록 성공하였습니다.');
        bmGroupMemApi(); // 즐겨찾기 리스트 조회
        setSelectMems([]); // 적용 대상 리스트 초기화
        setGroupName(''); // 그룹명 초기화
        handleModal(); // 모달창 닫기
      } else {
        alert('서버에 문제가 발생하였습니다. 나중에 다시 시도해주세요 ');
        handleModal();
      }
    } catch (err) {
      console.log('API 요청 오류 발생');
    }
  };

  // 취소 버튼 이벤트
  const handleCancel = () => {
    setSelectMems([]); // 적용 대상 리스트 초기화
    setGroupName(''); // 그룹명 초기화
    handleModal();
  };

  // 이미 등록된 멤버 표시하는 라벨
  const InitLabel = ({ code }) => {
    const res = initList.filter((item) => item.mem_code === code);
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
          // height: '600px'
        }
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">
            {selectTab === 0 ? '즐겨찾기 그룹 등록' : '즐겨찾기 멤버 등록'}
          </Typography>
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
        {selectTab == 0 ? (
          <Grid
            item
            container
            sx={{
              display: 'flex',
              paddingBottom: '20px',
              marginBottom: '20px',
              borderBottom: '1px solid #aaa'
            }}
          >
            <Grid sx={{ display: 'flex', width: '100%' }} xs={5}>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Label
                  text={'그룹명'}
                  sx={{ width: '70px', display: 'flex', alignItems: 'center' }}
                />
                <TextField
                  placeholder="그룹명을 입력해주세요"
                  value={groupName}
                  onChange={handleGroupNameInput}
                  sx={{ display: 'flex', flexFlow: 1, width: '100%' }}
                />
              </Box>
            </Grid>
          </Grid>
        ) : null}

        <Grid item container sx={{ display: 'flex', height: '100%' }}>
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
                <ContentByToggle
                  selectBtn={selectBtn}
                  uniqueDeptNamesArray={uniqueDeptNamesArray}
                  tempAddList={tempAddList}
                  setTempAddList={setTempAddList}
                  result={result}
                  selectTab={selectTab}
                  InitLabel={InitLabel}
                />
              </Box>
            </Stack>
          </Grid>

          {/* 버튼 영역 */}
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            xs={2}
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
          <Grid item sx={{ paddingTop: '40px' }} xs={5}>
            <Typography variant="h6">적용 대상 </Typography>
            <Box
              sx={{
                padding: '20px 10px',
                height: '300px',
                border: '1px solid #aaa',
                overflowY: 'scroll'
              }}
            >
              <ApplyTrees
                tempApplyList={tempApplyList}
                setTemApplyList={setTemApplyList}
                selectMems={selectMems}
                applyList={applyList}
                list={list}
              />
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
              handlebtn={handleCancel}
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

export default BmMemModal;

const TransitionComponent = (props) => {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
};

const CustomTreeItem = React.forwardRef((props, ref) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
));

const StyledArrowBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey['100']
}));

const StyledTreeItem = styled(CustomTreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 10,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}));

const StyledUserName = styled(Typography)(({ theme, isSelect, isConfirm }) => ({
  fontSize: '15px',
  fontWeight: 'bold',
  color: isConfirm
    ? theme.palette.grey['400']
    : isSelect
    ? theme.palette.primary.main
    : theme.palette.grey['900']
}));

const StyledUserEmail = styled(Typography)(
  ({ theme, isSelect, isConfirm }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: isConfirm
      ? theme.palette.grey['400']
      : isSelect
      ? theme.palette.primary.main
      : theme.palette.grey['900']
  })
);

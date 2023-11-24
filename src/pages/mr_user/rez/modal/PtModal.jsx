import { useState, useEffect } from 'react';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Autocomplete,
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
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSpring, animated } from '@react-spring/web';
import SvgIcon from '@mui/material/SvgIcon';
import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';

import { setUserData } from '../../../../redux/reducer/userSlice';
import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import Toggle from '../../../../components/common/Toggle';
import axiosInstance from '../../../../utils/axios';
import RectangleBtn from '../../../../components/common/RectangleBtn';

// 토글버튼 데이터
const toggleData = [
  {
    index: 0,
    value: 'all',
    name: '조직도'
  },
  // {
  //   index: 1,
  //   value: 'search',
  //   name: '검색'
  // },
  {
    index: 2,
    value: 'bmGroup',
    name: '즐겨찾기 그룹'
  },
  {
    index: 3,
    value: 'bmMember',
    name: '즐겨찾기 멤버'
  }
];

const PtModal = ({
  open,
  handleModal,
  userCode,
  ptList,
  setPtList,
  totalMemberList,
  setTotalMemberList,
  applyMemberList,
  setApplyMemberList,
  isToggleMemList,
  setIsToggletMemList,
  isToggleApplyList,
  setIsToggleApplyList,
  bmGroupList,
  setBmGroupList,
  setIsToggleBmMemList
}) => {
  const dispatch = useDispatch();
  const userData = useSelector(setUserData).payload.user;
  const master = userData;
  const rezData = useSelector(setRezData).payload.mrUser;
  // 좌측 탭 메뉴 (토글)
  const [selectTab, setSelectTab] = useState('all');
  // 선택된 사용자 임시 리스트 (*적용 대상에 추가되기 전 선택된 사용자들)
  const [tempSelectMemList, setTempSelectMemLsit] = useState([]);
  // 선택된 적용대상 임시 리스트 (*참석자 완료리스트에 추가되기 전 선택된 적용대상들)
  const [tempApplyMemList, setTempApplyMemList] = useState([]);

  // 즐겨찾기 적용대상 리스트
  const [applyBmGroupList, setApplyBmGroupList] = useState([]);
  // 선택된 즐겨찾기 그룹 임시 리스트
  const [tempGroupList, setTempGroupList] = useState([]);
  // 선택된 즐겨찾기 멤버 임시 리스트
  const [tempBmMemList, setTempBmMemList] = useState([]);

  // 좌측 토글 메뉴 클릭 이벤트
  const handleToggleClick = (e) => {
    setSelectTab(e.currentTarget.value);
  };

  // 추가 버튼 클릭 이벤트
  const handleAddBtn = () => {
    if (selectTab === 'all') {
      let list = [];
      tempSelectMemList &&
        tempSelectMemList.forEach((mem) => {
          const res = totalMemberList.filter((i) => i.mem_code === mem);
          if (res.length !== 0) {
            list.push(...res);
          }
        });

      // 적용 대상 리스트 업데이트
      setApplyMemberList([...applyMemberList, ...list]);
      // 적용 대상 리스트 수만큼 토글 리스트 생성
      setIsToggleApplyList(Array.from({ length: list.length }, () => false));
      // 토글 리스트 값 생성
      setIsToggletMemList(
        Array.from({ length: totalMemberList.length }, () => false)
      );
      // 임시 리스트 초기화
      setTempSelectMemLsit([]);

      return;
    }

    if (selectTab === 'bmGroup') {
      let list = [];
      tempGroupList.forEach((group) => {
        bmGroupList.forEach((data) => {
          if (data.bm_group_name === group) {
            list.push(data);
          }
        });
      });

      setApplyBmGroupList(list); // 데이터 업데이트
      setTempGroupList([]); //초기화

      return;
    }

    if (selectTab === 'bmMember') {
      let list = [];
      tempBmMemList &&
        tempBmMemList.forEach((mem) => {
          const res = totalMemberList.filter((i) => i.mem_code === mem);
          if (res.length !== 0) {
            list.push(...res);
          }
        });

      // 적용 대상 리스트 업데이트
      setApplyMemberList(list);

      return;
    }
  };

  // 제외 버튼 클릭 이벤트
  const handleDeleteBtn = () => {
    // 제외된 후 적용대상에 남아있는 멤버 리스트
    const res = applyMemberList.filter(
      (mem) => !tempApplyMemList.includes(mem.mem_code)
    );
    setApplyMemberList(res);

    // 적용 대상 리스트 수만큼 토글 리스트 생성
    setIsToggleApplyList(
      Array.from({ length: applyMemberList.length }, () => false)
    );
  };

  // 취소 버튼 클릭 이벤트
  const handleCancelBtn = () => {
    // 적용 대상 리스트 초기화
    setApplyMemberList(ptList);
    setApplyBmGroupList([]);
    setBmGroupList([]);

    // 임시 리스트 초기화
    setTempSelectMemLsit([]);
    setTempApplyMemList([]);
    setTempGroupList([]);
    setTempBmMemList([]);

    handleModal();
  };

  // 확인 버튼 클릭 이벤트
  const handleConfirmBtn = () => {
    // 조직도 적용 대상에 데이터가 있는 경우
    if (applyMemberList.length !== 0) {
      setPtList([...applyMemberList, master]);
      dispatch(
        setRezData({
          data: { ...rezData, mr_pt_list: [...applyMemberList, master] }
        })
      );
    }

    if (applyBmGroupList.length !== 0) {
      setPtList(applyBmGroupList);
    }

    handleModal();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancelBtn}
      fullWidth={true}
      maxWidth={'md'}
    >
      {/* Modal Header */}
      <Stack direction={'row'} justifyContent={'space-between'}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">참석자 추가</Typography>
        </DialogTitle>
        <IconButton
          onClick={handleModal}
          aria-label="close"
          sx={{ padding: '24px' }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      {/* Modal Content */}
      <DialogContent>
        <Grid container sx={{ display: 'flex', height: '100%' }}>
          {/* 선택 영역 */}
          <Grid item xs={5}>
            <Stack sx={{ rowGap: '20px' }}>
              <Toggle
                data={toggleData}
                sx={{ width: '100%' }}
                handleToggleBtn={handleToggleClick}
                selectBtn={selectTab}
              />
              <SelectContainer
                tab={selectTab}
                totalMemberList={totalMemberList}
                tempSelectMemList={tempSelectMemList}
                setTempSelectMemLsit={setTempSelectMemLsit}
                isToggleMemList={isToggleMemList}
                setIsToggletMemList={setIsToggletMemList}
                applyMemberList={applyMemberList}
                ptList={ptList}
                bmGroupList={bmGroupList}
                tempGroupList={tempGroupList}
                setTempGroupList={setTempGroupList}
                setIsToggleBmMemList={setIsToggleBmMemList}
                tempBmMemList={tempBmMemList}
                setTempBmMemList={setTempBmMemList}
              />
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
          <Grid item xs={5}>
            <Stack sx={{ rowGap: '20px' }}>
              <Typography variant="h6" sx={{ marginTop: '46px' }}>
                적용 대상
              </Typography>
              <ApplyContainer
                tab={selectTab}
                applyMemberList={applyMemberList}
                setApplyMemberList={setApplyMemberList}
                isToggleApplyList={isToggleApplyList}
                setIsToggleApplyList={setIsToggleApplyList}
                tempApplyMemList={tempApplyMemList}
                setTempApplyMemList={setTempApplyMemList}
                applyBmGroupList={applyBmGroupList}
                setApplyBmGroupList={setApplyBmGroupList}
                ptList={ptList}
                master={master}
              />
            </Stack>
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
              handlebtn={handleConfirmBtn}
            />
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

// 선택 영역 콘텐츠 컨테이너
const SelectContainer = ({
  tab,
  totalMemberList,
  tempSelectMemList,
  setTempSelectMemLsit,
  isToggleMemList,
  setIsToggletMemList,
  applyMemberList,
  ptList,
  bmGroupList,
  tempGroupList,
  setTempGroupList,
  setIsToggleBmMemList,
  tempBmMemList,
  setTempBmMemList
}) => {
  // ****************[START] 조직도 데이터 변환 *************************
  // 부서명 추출
  const uniqueDeptNames = new Set();
  totalMemberList &&
    totalMemberList.forEach((user) => {
      if (user.deptVO && user.deptVO['dept_name']) {
        uniqueDeptNames.add(user.deptVO['dept_name']);
      }
    });

  // 부서명 리스트 생성
  const listByDeptName = Array.from(uniqueDeptNames);

  // 부서별 사원 리스트 생성
  const listByDeptUser = [];
  listByDeptName &&
    listByDeptName.forEach((i) => {
      const dept = totalMemberList.filter(
        (user) => user.deptVO['dept_name'] === i
      );
      listByDeptUser.push(dept);
    });

  // 트리 데이터 형식으로 변환
  const treeData = listByDeptName.map((item, index) => ({
    dept: item,
    members: listByDeptUser[index]
  }));
  // ****************[END] 조직도 데이터 변환 *************************

  // ****************[START] 즐겨찾기 데이터 변환 *************************

  // 개별 멤버
  const memResult = bmGroupList.filter((item) => item.bm_group_name === null);
  // 그룹 & 그룹 멤버
  const groupResult = bmGroupList.filter((item) => item.bm_group_name !== null);

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
  // ****************[END] 즐겨찾기 데이터 변환 *************************

  // [조직도] 트리 아이템 클릭 이벤트
  const handleTreeItemClick = (e, nodeId) => {
    // 부서명 클릭 시 오류 선택 불가 처리
    if (listByDeptName.includes(nodeId)) return;

    // 이미 적용대상에 등록된 아이템이면 선택 불가 처리
    const isDuplicate = applyMemberList.filter(
      (item) => item.mem_code === nodeId
    );
    if (isDuplicate.length !== 0) return;

    // 토글 상태 변경
    const findIndex = totalMemberList.findIndex(
      (mem) => mem.mem_code === nodeId
    );
    const copyIsToggleList = [...isToggleMemList];
    copyIsToggleList[findIndex] = !isToggleMemList[findIndex];
    setIsToggletMemList(copyIsToggleList);

    if (!isToggleMemList[findIndex]) {
      // 임시 선택 멤버 리스트에 추가
      setTempSelectMemLsit([...tempSelectMemList, nodeId]);
    } else {
      const res = tempSelectMemList.filter((mem) => mem === nodeId);
      if (res.length !== 0) {
        const newArr = tempSelectMemList.filter((mem) => mem !== nodeId);
        setTempSelectMemLsit(newArr);
      }
    }
  };

  // [즐겨찾기 그룹] 트리 아이템 클릭 이벤트
  const handleBmGroupTreeClick = (e, nodeId) => {
    setTempGroupList([...tempGroupList, nodeId]);
  };

  // [즐겨찾기 멤버] 트리 아이템 클릭 이벤트]
  const handleBmMemTreeClick = (e, nodeId) => {
    setTempBmMemList([...tempBmMemList, nodeId]);
  };

  switch (tab) {
    case 'all':
      // 사용자 트리 아이템
      const TreeLabel = ({ userTree }) => {
        const findIndex = totalMemberList.findIndex(
          (mem) => mem.mem_code === userTree.mem_code
        );

        const isSelect = isToggleMemList[findIndex];

        const res = ptList.filter((mem) => mem.mem_code === userTree.mem_code);
        // 이미 등록된 여부
        const isConfirm = res.length !== 0 ? true : false;

        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '2px 0',
              cursor: isConfirm ? 'not-allowed' : 'pointer'
            }}
          >
            <Stack direction={'row'} gap={'4px'}>
              <StyledUserName isSelect={isSelect} isConfirm={isConfirm}>
                {userTree.name}
              </StyledUserName>
              <StyledUserEmail isSelect={isSelect} isConfirm={isConfirm}>
                {userTree.position_name}
              </StyledUserEmail>
            </Stack>
            {isConfirm ? (
              <Box
                sx={{
                  padding: '2px',
                  fontSize: '12px',
                  backgroundColor: '#eee',
                  borderRadius: '2px'
                }}
              >
                등록
              </Box>
            ) : null}
          </Box>
        );
      };

      return (
        <>
          <StyledContainer>
            <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
              <TreeView
                aria-label="customized"
                defaultExpanded={['1']}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
                defaultEndIcon={<CircleIcon />}
                onNodeSelect={handleTreeItemClick}
                sx={{ overflowX: 'hidden' }}
              >
                {treeData &&
                  treeData.map((deptTree, index) => (
                    <StyledTreeItem
                      nodeId={deptTree.dept}
                      label={deptTree.dept}
                      key={index}
                    >
                      {deptTree.members.map((userTree, index) => (
                        <StyledTreeItem
                          nodeId={userTree.mem_code}
                          label={<TreeLabel userTree={userTree} />}
                          key={index}
                        />
                      ))}
                    </StyledTreeItem>
                  ))}
              </TreeView>
            </Box>
          </StyledContainer>
        </>
      );
    case 'search':
      let newTotList = [];
      totalMemberList.forEach((mem) => {
        newTotList.push({
          label: `${mem.name} (${mem.position_name} | ${mem.deptVO.dept_name})`
        });
      });
      return (
        <Autocomplete
          disablePortal
          options={newTotList}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} />}
        />
      );
    case 'bmGroup':
      const BmGroupMemLabel = ({ memTree }) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '2px 20px'
            }}
          >
            <Stack direction={'row'} gap={'4px'}>
              <StyledUserName>{memTree.name}</StyledUserName>
              <StyledUserEmail>{memTree.position_name}</StyledUserEmail>
            </Stack>
          </Box>
        );
      };

      return (
        <StyledContainer>
          <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
            <TreeView
              aria-label="customized"
              defaultExpanded={['1']}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              onNodeSelect={handleBmGroupTreeClick}
              sx={{
                overflowX: 'hidden'
              }}
            >
              {groupedData &&
                groupedData.map((bmGroup, index) => (
                  <StyledTreeItem
                    nodeId={bmGroup.bm_group_name}
                    label={bmGroup.bm_group_name}
                    key={index}
                    sx={{}}
                  >
                    {bmGroup.mem_list.map((memTree, index) => (
                      <BmGroupMemLabel memTree={memTree} />
                    ))}
                  </StyledTreeItem>
                ))}
            </TreeView>
          </Box>
        </StyledContainer>
      );
    case 'bmMember':
      const MemLabel = ({ memTree }) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '2px 0px'
            }}
          >
            <Stack direction={'row'} gap={'4px'}>
              <StyledUserName>{memTree.name}</StyledUserName>
              <StyledUserEmail>{memTree.position_name}</StyledUserEmail>
              <StyledUserEmail>| {memTree.dept_name}</StyledUserEmail>
            </Stack>
          </Box>
        );
      };
      return (
        <StyledContainer>
          <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
            <TreeView
              aria-label="customized"
              defaultExpanded={['1']}
              defaultEndIcon={<CircleIcon />}
              onNodeSelect={handleBmMemTreeClick}
              sx={{
                overflowX: 'hidden'
              }}
            >
              {memResult &&
                memResult.map((mem, index) => (
                  <StyledTreeItem
                    nodeId={mem.mem_code}
                    label={<MemLabel memTree={mem} />}
                    key={index}
                    sx={{}}
                  />
                ))}
            </TreeView>
          </Box>
        </StyledContainer>
      );
    default:
      return;
  }
};

// 적용 영역 콘텐츠 컨테이너
const ApplyContainer = ({
  tab,
  applyMemberList,
  isToggleApplyList,
  setIsToggleApplyList,
  tempApplyMemList,
  setTempApplyMemList,
  applyBmGroupList,
  setApplyBmGroupList,
  ptList,
  setApplyMemberList,
  master
}) => {
  useEffect(() => {
    // 적용대상에서 본인(예약자)는 제외
    const res = ptList.filter((mem) => mem.mem_code !== master.mem_code);
    setApplyMemberList(res);
  }, []);

  switch (tab) {
    case 'all':
    case 'bmMember':
    case 'search':
      const handleApplyTreeItem = (e, nodeId) => {
        // 토글 상태 변경
        const findIndex = applyMemberList.findIndex(
          (mem) => mem.mem_code === nodeId
        );
        const copyIsToggleList = [...isToggleApplyList];
        copyIsToggleList[findIndex] = !isToggleApplyList[findIndex];
        setIsToggleApplyList(copyIsToggleList);

        if (!isToggleApplyList[findIndex]) {
          // 적용대상 제외 임시 리스트 추가
          setTempApplyMemList([...tempApplyMemList, nodeId]);
        } else {
          const res = tempApplyMemList.filter((mem) => mem === nodeId);
          if (res.length !== 0) {
            const newArr = tempApplyMemList.filter((mem) => mem !== nodeId);
            setTempApplyMemList(newArr);
          }
        }
      };

      // 사용자 트리 아이템 컴포넌트
      const TreeLabel = ({ userTree }) => {
        const findIndex = applyMemberList.findIndex(
          (mem) => mem.mem_code === userTree.mem_code
        );
        const isSelect = isToggleApplyList[findIndex];
        return (
          <Box sx={{ display: 'flex', gap: '4px' }}>
            <StyledUserName isSelect={isSelect}>{userTree.name}</StyledUserName>
            <StyledUserEmail isSelect={isSelect}>
              {userTree.position_name}
            </StyledUserEmail>
          </Box>
        );
      };

      return (
        <StyledContainer>
          <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
            <TreeView
              aria-label="customized"
              defaultExpanded={['1']}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<CircleIcon />}
              onNodeSelect={handleApplyTreeItem}
              sx={{ overflowX: 'hidden' }}
            >
              {applyMemberList &&
                applyMemberList.map((mem, index) => (
                  <StyledTreeItem
                    nodeId={mem.mem_code}
                    label={<TreeLabel userTree={mem} />}
                    key={index}
                  ></StyledTreeItem>
                ))}
            </TreeView>
          </Box>
        </StyledContainer>
      );

    case 'bmGroup':
      // 그룹 & 그룹 멤버
      const groupResult = applyBmGroupList.filter(
        (item) => item.bm_group_name !== null
      );

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

      const BmGroupMemLabel = ({ memTree }) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '2px 20px'
            }}
          >
            <Stack direction={'row'} gap={'4px'}>
              <StyledUserName>{memTree.name}</StyledUserName>
              <StyledUserEmail>{memTree.position_name}</StyledUserEmail>
            </Stack>
          </Box>
        );
      };

      return (
        <StyledContainer>
          <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
            <TreeView
              aria-label="customized"
              defaultExpanded={['1']}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
              defaultEndIcon={<CircleIcon />}
              sx={{ overflowX: 'hidden' }}
            >
              {groupedData &&
                groupedData.map((group, index) => (
                  <StyledTreeItem
                    nodeId={group.bm_group_name}
                    label={group.bm_group_name}
                    key={index}
                  >
                    {group.mem_list.map((memTree, index) => (
                      <BmGroupMemLabel memTree={memTree} />
                    ))}
                  </StyledTreeItem>
                ))}
            </TreeView>
          </Box>
        </StyledContainer>
      );

    default:
      return;
  }
};

export default PtModal;

const MinusSquare = (props) => {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
};

const PlusSquare = (props) => {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
};

function CircleIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

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

// ---------------------------------------------------------------
const StyledArrowBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey['100']
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: '20px',
  height: '300px',
  border: `1px solid ${theme.palette.grey['500']}`,
  borderRadius: '2px',
  overflowY: 'auto'
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

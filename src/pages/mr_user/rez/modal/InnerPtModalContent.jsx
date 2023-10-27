import { useState } from 'react';
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider
} from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';

import styled from '@emotion/styled';
import { Box, Button, Grid, IconButton, Stack } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import Toggle from '../../../../components/common/Toggle';

const InnerPtModalContent = ({ list }) => {
  // 선택된 토글 버튼 값
  const [selectBtn, setSeletBtn] = useState('all');

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
      index: 1,
      value: 'bookmark',
      name: '즐겨찾기'
    }
  ];

  // 토글 버튼 이벤트
  const handleToggleBtn = (e) => {
    setSeletBtn(e.currentTarget.value);
  };

  const dataProvider = new StaticTreeDataProvider(list, (item, newName) => ({
    ...item,
    data: newName
  }));

  return (
    <Grid container spacing={2} sx={{}}>
      <Grid item xs={5} sx={{ width: '700px' }}>
        <Stack sx={{ rowGap: '10px' }}>
          <Toggle
            data={toggleData}
            selectBtn={selectBtn}
            handleToggleBtn={handleToggleBtn}
            sx={{ width: '33.4%' }}
          />
          <StyledListContainer>
            <UncontrolledTreeEnvironment
              dataProvider={dataProvider}
              getItemTitle={(item) => item.data}
              viewState={{}}
              canDragAndDrop={true}
              canDropOnFolder={true}
              canReorderItems={true}
            >
              <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example" />
            </UncontrolledTreeEnvironment>
          </StyledListContainer>
        </Stack>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Stack spacing={1}>
          <StyledArrowBtn aria-label="add">
            <KeyboardDoubleArrowRightIcon />
          </StyledArrowBtn>
          <StyledArrowBtn aria-label="delete">
            <KeyboardDoubleArrowLeftIcon />
          </StyledArrowBtn>
        </Stack>
      </Grid>
      <Grid item xs={5}>
        엄마
      </Grid>
    </Grid>
  );
};

export default InnerPtModalContent;

const StyledListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.grey['500']}`
}));

const StyledArrowBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey['100']
}));

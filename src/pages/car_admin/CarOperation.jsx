import { Box, Container, Stack } from '@mui/system';
import SubHeader from '../../components/common/SubHeader';
import MainContainer from '../../components/mr_user/MainContainer';
import Searchbar from '../../components/common/Searchbar';
import { useEffect, useState } from 'react';
import CarOperationTable from '../../components/car_admin/operation/CarOperationTable';
import styled from '@emotion/styled';
import axiosInstance from '../../utils/axios';
import { PAGE_INNER_PADDING } from '../../config';
import { Button } from '@mui/material';
import { palette } from '../../theme/palette';

const CarOperationPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchBtn = (e) => {
    e.preventDefault();
    // alert('검색 : ' + searchInput);
    // 여기서 필터링 해줄 상태를 체크!
    setSearchValue(searchInput);
  };

  return (
    <>
      <SubHeader title={'운행 내역'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <StyledMain>
          <Box sx={{ width: '100%', padding: 3, backgroundColor: '#ffffff' }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '1200px',
                height: 'auto',
                margin: '0px auto',
                padding: '0px 24px',
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <Button
                sx={{
                  color: palette.grey['600'],
                  border: `1px solid ${palette.grey['500']}`,
                  borderRadius: '2px',
                  '&:hover': { backgroundColor: '#ffffff' },
                  height: '35px',
                  marginRight: '15px'
                }}
              >
                검색 상세
              </Button>
              <Box sx={{ width: '30%' }}>
                <Searchbar
                  placeholder={'차량명 검색'}
                  value={searchInput}
                  handleInputChange={handleInput}
                  handleSearchBtnClick={handleSearchBtn}
                  inputHeight={'35px !important'}
                />
              </Box>
            </Box>
            <StyledContainer>
              <CarOperationTable />
            </StyledContainer>
          </Box>
        </StyledMain>
      </Box>
    </>
  );
};

export default CarOperationPage;

const StyledMain = styled(Box)(({ theme }) => ({
  padding: PAGE_INNER_PADDING,
  width: '100%',
  maxWidth: '1400px'
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  height: 'auto',
  padding: '20px',
  borderRadius: 10
}));

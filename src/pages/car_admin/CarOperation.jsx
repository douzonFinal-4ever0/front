import { Box, Container, Stack } from '@mui/system';
import SubHeader from '../../components/common/SubHeader';
import MainContainer from '../../components/mr_user/MainContainer';
import Searchbar from '../../components/common/Searchbar';
import { useEffect, useState } from 'react';
import CarOperationTable from '../../components/car_admin/operation/CarOperationTable';
import styled from '@emotion/styled';
import axiosInstance from '../../utils/axios';

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

  const [operation, setOperation] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <SubHeader title={'운행 내역'} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <Box sx={{ width: '100%', padding: 3, backgroundColor: '#ffffff' }}>
            <Stack
              sx={{
                width: '100%',
                maxWidth: '1200px',
                height: 'auto',
                margin: '0px auto',
                padding: '0px 20px'
              }}
            >
              <Box sx={{ width: '40%' }}>
                <Searchbar
                  placeholder={'차량명 검색'}
                  value={searchInput}
                  handleInputChange={handleInput}
                  handleSearchBtnClick={handleSearchBtn}
                />
              </Box>
            </Stack>
            <StyledContainer>
              <CarOperationTable />
            </StyledContainer>
          </Box>
        </MainContainer>
      </Box>
    </>
  );
};

export default CarOperationPage;

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: '100%',
  height: 'auto',
  padding: '20px',
  borderRadius: 10
}));

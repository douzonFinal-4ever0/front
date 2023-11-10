import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../../components/common/DataGrid';
import RectangleBtn from '../../components/common/RectangleBtn';
import SubHeader from '../../components/common/SubHeader';
import MainContainer2 from '../../components/mr_admin/MainContainer2';
import WrapContainer from '../../components/mr_user/WrapContainer';
import axiosInstance from '../../utils/axios.js';
const MrNoticeList = () => {
  /*-------------------------------------url 이동---------------------------------------------------*/
  const navigate = useNavigate();
  const handleWriteNotice = () => {
    navigate('../Notice');
  };
  /*-----------------------------------공지사항 가져오기------------------------------------------------------ */
  const [noticeList, setNoticeList] = useState([]);
  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/mr/notice')
      .then((res) => {
        const processedData = res.data.map((item) => ({
          ...item,
          id: item.notice_code
        }));
        setNoticeList(processedData);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);
  /*---------------------------상세 내용으로 이동-------------------------------------------------- */
  const handleClickEvent = (params) => {
    const notice_code = params.row.notice_code;
    axiosInstance.axiosInstance
      .get(`/mr/notice/${notice_code}`)
      .then((res) => {
        navigate(`../NoticeDetail/${notice_code}`);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  return (
    <>
      <SubHeader title={'공지사항 조회'} />
      <Box sx={{ display: 'flex' }}>
        <MainContainer2>
          <WrapContainer bgcolor={'#fff'}>
            <Container sx={{ width: 'auto' }}>
              <div style={{ height: 'auto', width: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#f0f0f0'
                    },
                    border: '1px solid'
                  }}
                >
                  <DataGrid
                    columns={columns}
                    rows={noticeList}
                    pageSize={10}
                    pageSizeOptions={[5, 10]}
                    //   disableRow={false}
                    clickEvent={handleClickEvent}
                  />
                </Box>
              </div>
              <RectangleBtn
                category={'register'}
                type={'submit'}
                text={'공지사항 작성'}
                sx={{
                  padding: '14px 12px'
                }}
                handlebtn={handleWriteNotice}
              />
            </Container>
          </WrapContainer>
        </MainContainer2>
      </Box>
    </>
  );
};

export default MrNoticeList;

// DataGrid 시작
const columns = [
  { field: 'notice_code', headerName: '번호', width: 170 },
  { field: 'notice_title', headerName: '제목', width: 600 },
  {
    field: 'updated_at',
    headerName: '작성일',
    width: 300
  }
];

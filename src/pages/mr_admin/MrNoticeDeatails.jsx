import React from 'react';
import SubHeader from '../../components/common/SubHeader';
import { Box, Grid } from '@mui/material';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import DataGrid from '../../components/common/DataGrid';
import RectangleBtn from '../../components/common/RectangleBtn';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { useState } from 'react';
import { useEffect } from 'react';

const MrNoticeDeatails = () => {
  /*------------------------제목 번호 가져오기-------------------------------- */
  const { notice_code } = useParams();
  // console.log(notice_code);
  /*-----------------------선택된 데이터 가져오기---------------------------------*/
  const [selectedNotice, setSelectedNotice] = useState([]);
  useEffect(() => {
    axiosInstance.get(`/mr/notice/${notice_code}`).then((res) => {
      setSelectedNotice(res.data);
    });
  }, []);
  // console.log(selectedNotice);
  /**html 코드 가져오기 */
  const htmlString = selectedNotice.contents;
  /**제목 가져오기 */
  const title = selectedNotice.notice_title;
  return (
    <>
      <SubHeader title={title} />
      <Box sx={{ display: 'flex' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <div style={{ height: 'auto', width: '100%' }}>
              <Grid container spacing={1}>
                <Grid item container>
                  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
                </Grid>
              </Grid>
            </div>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrNoticeDeatails;

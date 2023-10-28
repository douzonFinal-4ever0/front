import React from 'react';
import SubHeader from '../../components/common/SubHeader';
import { Box, Button, Collapse, Fade, Grid } from '@mui/material';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import DataGrid from '../../components/common/DataGrid';
import RectangleBtn from '../../components/common/RectangleBtn';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  /**목록으로 이동 */
  const handleMrList = () => {
    navigate('../NoticeList');
  };

  const [checked, setChecked] = useState(false);
  const handleTest = () => {
    setChecked((prev) => !prev);
  };
  const handleDeleteNotice = () => {
    axiosInstance.delete(`mr/notice/delete/${notice_code}`).then((res) => {
      alert('삭제가 완료되었습니다.');
      navigate('../NoticeList');
    });
  };

  return (
    <>
      <SubHeader title={title} />
      <Box sx={{ display: 'flex' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <div style={{ height: 'auto', width: '100%' }}>
              <Grid container spacing={1}>
                <Grid item container spacing={2}>
                  <Grid item xs={11}>
                    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button onClick={handleTest}>도구</Button>
                  </Grid>

                  <Grid item xs={2}>
                    <Fade in={checked}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <RectangleBtn
                            category={'modify'}
                            text={'수정'}
                            sx={{
                              padding: '14px 12px'
                            }}
                            handlebtn={handleMrList}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <RectangleBtn
                            category={'delete'}
                            text={'삭제'}
                            sx={{
                              padding: '14px 12px'
                            }}
                            handlebtn={handleDeleteNotice}
                          />
                        </Grid>
                      </Grid>
                    </Fade>
                  </Grid>
                  <Grid item xs>
                    {/* <Button onClick={handleTest}>test</Button> */}
                  </Grid>
                  <Grid item xs={1}>
                    <RectangleBtn
                      category={'register'}
                      text={'목록'}
                      sx={{
                        padding: '14px 12px'
                      }}
                      handlebtn={handleMrList}
                    />
                  </Grid>
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

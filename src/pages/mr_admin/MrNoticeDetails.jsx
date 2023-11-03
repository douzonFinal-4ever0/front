import React from 'react';
import SubHeader from '../../components/common/SubHeader';
import { Box, Button, Collapse, Fade, Grid, IconButton } from '@mui/material';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import DataGrid from '../../components/common/DataGrid';
import RectangleBtn from '../../components/common/RectangleBtn';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MainContainer2 from '../../components/mr_admin/MainContainer2';
import {
  openSanckbar,
  setSnackbarContent
} from '../../redux/reducer/SnackbarSlice';
import { useDispatch } from 'react-redux';

const MrNoticeDetails = () => {
  const dispatch = useDispatch();
  // snackbar 상태 관리 함수
  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  /*------------------------제목 번호 가져오기-------------------------------- */
  const { notice_code } = useParams();
  // console.log(notice_code);
  /*-----------------------선택된 데이터 가져오기---------------------------------*/
  const [selectedNotice, setSelectedNotice] = useState([]);
  useEffect(() => {
    axiosInstance.axiosInstance.get(`/mr/notice/${notice_code}`).then((res) => {
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

  /**더보기 버튼을 누를시 실행하는 이벤트 */
  const handleOption = () => {
    setChecked((prev) => !prev);
  };

  /**공지 삭제 이벤트 */
  const handleDeleteNotice = () => {
    axiosInstance.axiosInstance
      .delete(`mr/notice/delete/${notice_code}`)
      .then((res) => {
        handleOpenSnackbar();
        handleSetSnackbarContent('삭제가 완료되었습니다.');
        navigate('../NoticeList');
      });
  };

  return (
    <>
      <SubHeader title={title} />
      <Box sx={{ display: 'flex' }}>
        <MainContainer2>
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
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start'
                    }}
                  >
                    <IconButton
                      onClick={handleOption}
                      size="large"
                      component="label"
                      variant="contained"
                    >
                      <MoreVertIcon />
                    </IconButton>
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
        </MainContainer2>
      </Box>
    </>
  );
};

export default MrNoticeDetails;

// <Button
//               component="span"
//               variant="contained"
//               startIcon={<CloudUploadIcon />}
//               color="info"
//               sx={{ width: '100%' }}
//             >
//               회의실 사진 업로드
//             </Button>

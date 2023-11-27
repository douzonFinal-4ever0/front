import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import { useLocation } from 'react-router-dom';

import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import QRcode from '../../../../components/mr_user/QRcode';
import { palette } from '../../../../theme/palette';

const RezInfo = ({ data }) => {
  const { pathname } = useLocation();
  const detailModal = pathname === '/mr/rez/history' ? true : false;
  const {
    m_name,
    mr_name,
    location,
    rez_date,
    rez_start_time,
    rez_end_time,
    master,
    created_at,
    pt_list,
    mr_rez_code //예약 코드
  } = data;
  console.log(pt_list); // 예약코드가 undefined가 나옴
  return (
    <Box
      component={'section'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: palette.grey['500'],
          borderRadius: '10px'
        },
        '&::-webkit-scrollbar': {
          width: '10px',
          backgroundColor: '#eee',
          borderRadius: '10px'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '650px'
        }}
      >
        {detailModal ? null : (
          <StyledStepText>
            <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
            예약 정보
          </StyledStepText>
        )}

        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            회의 정보
          </Typography>
          <Box>
            {/* 회의명  */}
            <Grid
              item
              xs={12}
              sx={{
                '& .infoTitle': {
                  backgroundColor: palette.grey['100']
                },
                '& .MuiListItem-gutters': {
                  borderBottom: `1px solid ${palette.grey['400']}`,
                  borderTop: `1px solid ${palette.grey['400']}`
                }
              }}
            >
              <Stack direction={'row'}>
                <Grid item xs={5}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="회의명" />
                  </ListItem>
                </Grid>
                <Grid item xs={7}>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="subtitle1">{m_name}</Typography>
                    </ListItemText>
                  </ListItem>
                </Grid>
              </Stack>
            </Grid>

            {/* 예약자  */}
            {detailModal ? (
              <Grid
                item
                xs={12}
                sx={{
                  '& .infoTitle': {
                    backgroundColor: palette.grey['100']
                  },
                  '& .MuiListItem-gutters': {
                    borderBottom: `1px solid ${palette.grey['400']}`
                  }
                }}
              >
                <Stack direction={'row'}>
                  <Grid item xs={5}>
                    <ListItem className="infoTitle">
                      <ListItemText primary="예약자" />
                    </ListItem>
                  </Grid>
                  <Grid item xs={7}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          {detailModal && master.name}{' '}
                          {detailModal && master.position_name} (
                          {detailModal && master.deptVO.dept_name})
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </Grid>
                </Stack>
              </Grid>
            ) : null}

            {/* 예약신청일   */}
            {detailModal ? (
              <Grid
                item
                xs={12}
                sx={{
                  '& .infoTitle': {
                    backgroundColor: palette.grey['100']
                  },
                  '& .MuiListItem-gutters': {
                    borderBottom: `1px solid ${palette.grey['400']}`
                  }
                }}
              >
                <Stack direction={'row'}>
                  <Grid item xs={5}>
                    <ListItem className="infoTitle">
                      <ListItemText primary="예약신청일" />
                    </ListItem>
                  </Grid>
                  <Grid item xs={7}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="subtitle1">
                          {created_at}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </Grid>
                </Stack>
              </Grid>
            ) : null}
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            회의실 정보
          </Typography>
          <Box>
            {/* 회의실명  */}
            <Grid
              item
              xs={12}
              sx={{
                '& .infoTitle': {
                  backgroundColor: palette.grey['100']
                },
                '& .MuiListItem-gutters': {
                  borderBottom: `1px solid ${palette.grey['400']}`,
                  borderTop: `1px solid ${palette.grey['400']}`
                }
              }}
            >
              <Stack direction={'row'}>
                <Grid item xs={5}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="회의실명" />
                  </ListItem>
                </Grid>
                <Grid item xs={7}>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="subtitle1">{mr_name}</Typography>
                    </ListItemText>
                  </ListItem>
                </Grid>
              </Stack>
            </Grid>

            {/* 회의실 장소  */}
            <Grid
              item
              xs={12}
              sx={{
                '& .infoTitle': {
                  backgroundColor: palette.grey['100']
                },
                '& .MuiListItem-gutters': {
                  borderBottom: `1px solid ${palette.grey['400']}`
                }
              }}
            >
              <Stack direction={'row'}>
                <Grid item xs={5}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="회의장소" />
                  </ListItem>
                </Grid>
                <Grid item xs={7}>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="subtitle1">{location}</Typography>
                    </ListItemText>
                  </ListItem>
                </Grid>
              </Stack>
            </Grid>

            {/* 예약일자  */}
            <Grid
              item
              xs={12}
              sx={{
                '& .infoTitle': {
                  backgroundColor: palette.grey['100']
                },
                '& .MuiListItem-gutters': {
                  borderBottom: '1px solid #bdbdbd'
                }
              }}
            >
              <Stack direction={'row'}>
                <Grid item xs={5}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="예약일자" />
                  </ListItem>
                </Grid>
                <Grid item xs={7}>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="subtitle1">
                        {detailModal ? rez_date.split(' ')[0] : rez_date}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </Grid>
              </Stack>
            </Grid>

            {/* 예약시간  */}
            <Grid
              item
              xs={12}
              sx={{
                '& .infoTitle': {
                  backgroundColor: palette.grey['100']
                },
                '& .MuiListItem-gutters': {
                  borderBottom: `1px solid ${palette.grey['400']}`
                }
              }}
            >
              <Stack direction={'row'}>
                <Grid item xs={5}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="예약시간" />
                  </ListItem>
                </Grid>
                <Grid item xs={7}>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="subtitle1">
                        {detailModal
                          ? `${rez_start_time
                              .split(' ')[1]
                              .slice(0, -3)} ~ ${rez_end_time
                              .split(' ')[1]
                              .slice(0, -3)}`
                          : `${rez_start_time} ~ ${rez_end_time}`}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </Grid>
              </Stack>
            </Grid>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ margin: '16px 0 8px' }}>
            참석자 정보
          </Typography>
          <Box>
            {/* 회의명  */}
            <Grid
              item
              xs={12}
              sx={{
                '& .infoTitle': {
                  backgroundColor: palette.grey['100']
                },
                '& .MuiListItem-gutters': {
                  borderBottom: `1px solid ${palette.grey['400']}`,
                  borderTop: `1px solid ${palette.grey['400']}`
                }
              }}
            >
              <Stack direction={'row'}>
                <Grid item xs={12}>
                  <ListItem className="infoTitle">
                    <ListItemText primary="참석자" />
                  </ListItem>
                  <ListItemText sx={{ padding: '10px ' }}>
                    {pt_list.map((mem, index) => (
                      <Stack direction={'row'} sx={{ marginBottom: '10px' }}>
                        <Avatar src={mem.memVO.profile_img_url} />
                        <Typography
                          key={index}
                          variant="subtitle1"
                          sx={{
                            marginLeft: '10px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {detailModal ? mem.memVO.name : mem.name}{' '}
                          {detailModal
                            ? mem.memVO.position_name
                            : mem.position_name}{' '}
                          (
                          {detailModal
                            ? mem.memVO.deptVO.dept_name
                            : mem.deptVO === undefined
                            ? mem.dept_name
                            : mem.deptVO.dept_name}
                          )
                        </Typography>
                      </Stack>
                    ))}
                  </ListItemText>
                </Grid>
              </Stack>
            </Grid>
          </Box>
        </Box>

        {/* QR 코드 */}
        {detailModal ? (
          <Box>
            <Typography variant="subtitle1" sx={{ margin: '16px 0 8px' }}>
              QR 코드 정보
            </Typography>
            <Box>
              <Grid
                item
                xs={12}
                sx={{
                  '& .infoTitle': {
                    backgroundColor: palette.grey['100']
                  },
                  '& .MuiListItem-gutters': {
                    borderBottom: `1px solid ${palette.grey['400']}`,
                    borderTop: `1px solid ${palette.grey['400']}`
                  }
                }}
              >
                <Stack direction={'row'}>
                  <Grid item xs={12}>
                    <ListItem className="infoTitle">
                      <ListItemText primary="QR 코드" />
                    </ListItem>
                    <ListItemText
                      sx={{
                        padding: '10px ',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {/* <QRcode srcValue={'http://www.naver.com'} /> */}
                      <QRcode
                        // QR코드 생성 및 주소
                        srcValue={`http://192.168.0.177:3000/mr/rez/${mr_rez_code}`}
                      />
                    </ListItemText>
                  </Grid>
                </Stack>
              </Grid>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default RezInfo;

const StyledStepText = styled(Typography)(({ theme }) => ({
  paddingBottom: '6px',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderBottom: '3px solid black'
}));

import { useLocation } from 'react-router-dom';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

import {
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Box,
  Avatar
} from '@mui/material';
import styled from '@emotion/styled';
import QRcode from '../../../../components/mr_user/QRcode';

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
    pt_list
  } = data;

  return (
    <Box
      component={'section'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: '8px'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                  backgroundColor: '#eeeeee'
                },
                '& .MuiListItem-gutters': {
                  borderBottom: '1px solid #bdbdbd',
                  borderTop: '1px solid #bdbdbd'
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
                    backgroundColor: '#eeeeee'
                  },
                  '& .MuiListItem-gutters': {
                    borderBottom: '1px solid #bdbdbd'
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
                    backgroundColor: '#eeeeee'
                  },
                  '& .MuiListItem-gutters': {
                    borderBottom: '1px solid #bdbdbd'
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
                  backgroundColor: '#eeeeee'
                },
                '& .MuiListItem-gutters': {
                  borderBottom: '1px solid #bdbdbd',
                  borderTop: '1px solid #bdbdbd'
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
                  backgroundColor: '#eeeeee'
                },
                '& .MuiListItem-gutters': {
                  borderBottom: '1px solid #bdbdbd'
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
                  backgroundColor: '#eeeeee'
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
                  backgroundColor: '#eeeeee'
                },
                '& .MuiListItem-gutters': {
                  borderBottom: '1px solid #bdbdbd'
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
                  backgroundColor: '#eeeeee'
                },
                '& .MuiListItem-gutters': {
                  borderBottom: '1px solid #bdbdbd',
                  borderTop: '1px solid #bdbdbd'
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
                        <Avatar />
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
                            : mem.dept_name}
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
                    backgroundColor: '#eeeeee'
                  },
                  '& .MuiListItem-gutters': {
                    borderBottom: '1px solid #bdbdbd',
                    borderTop: '1px solid #bdbdbd'
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
                      <QRcode srcValue={'http://www.naver.com'} />
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
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderBottom: '3px solid black'
}));

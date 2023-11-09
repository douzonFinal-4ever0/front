import { useLocation } from 'react-router-dom';

import {
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Box
} from '@mui/material';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import styled from '@emotion/styled';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';

const RezInfo = ({
  mr_name,
  location,
  rez_date,
  rez_start_time,
  rez_end_time
}) => {
  const { pathname } = useLocation();
  const detailModal = pathname === '/mr/rez/history' ? true : false;
  console.log(pathname);
  return (
    <Box
      component={'section'}
      sx={{
        // padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'auto'
      }}
    >
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

        {/*  ******************************************************  */}
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
              <Grid item xs={5}>
                <ListItem className="infoTitle">
                  <ListItemText primary="예약자" />
                </ListItem>
              </Grid>
              <Grid item xs={7}>
                <ListItem>
                  <ListItemText>
                    <Typography variant="subtitle1">{'에스더씨'}</Typography>
                  </ListItemText>
                </ListItem>
              </Grid>
            </Stack>
          </Grid>

          {/* 회의실명  */}
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
                  <ListItemText primary="회의실명" />
                </ListItem>
              </Grid>
              <Grid item xs={7}>
                <ListItem>
                  <ListItemText>
                    <Typography variant="subtitle1">
                      {'내일 저와 함께 간다니'}
                    </Typography>
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
                    <Typography variant="subtitle1">
                      {'너모 기대되어요'}
                    </Typography>
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
                      {'앞으로도 함께 해요..❤️'}
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
                      {'남은 시간 열공해요🤭'}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </Grid>
            </Stack>
          </Grid>
        </Box>
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

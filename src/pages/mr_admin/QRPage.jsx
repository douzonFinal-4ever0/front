import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RectangleBtn from '../../components/common/RectangleBtn';
import axiosInstance from '../../utils/axios';
import MrInfoSection from '../mr_user/rez/section/MrInfoSection';

const QRPage = () => {
  const { mr_rez_code } = useParams();
  const [rezData, setRezData] = useState();
  const [mr_code, setMr_code] = useState();
  const [mr, setMr] = useState();
  const [status, setStatus] = useState(true);
  console.log(mr_rez_code);
  useEffect(() => {
    axiosInstance.axiosQR
      .get(`/mr/mrRez/${mr_rez_code}`)
      .then((res) => {
        setRezData(res.data);
        setMr_code(res.data.mr_code);
        // const mr_code = res.data.mr_code;
        axiosInstance.axiosQR.get(`/mr/${res.data.mr_code}`).then((res) => {
          setMr(res.data);
          setStatus(res.data.is_used);
        });
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);
  console.log(mr_code);
  console.log(status);
  console.log(rezData);
  const handleCheckIn = () => {
    axiosInstance.axiosQR
      .patch(`/mr/mrCheckIn/${mr_code}`)
      .then((res) => {
        console.log(res.data);
        setStatus(false);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };
  const handleCheckOut = () => {
    axiosInstance.axiosQR
      .patch(`/mr/mrCheckOut/${mr_code}`)
      .then((res) => {
        console.log(res.data);
        setStatus(true);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '15px',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        margin: 'auto'
      }}
    >
      <Box sx={{ width: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {mr && <MrInfoSection data={mr} />}
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mt: 1, mb: 2 }} variant="h4" component="div">
              예약 정보
            </Typography>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: '#000000' }}>
                  <DnsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={rezData && rezData.m_name} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <PersonAddAltOutlinedIcon sx={{ color: '#000000' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    rezData &&
                    rezData.name +
                      ' ' +
                      rezData.position_name +
                      ' (' +
                      rezData.dept_name +
                      ')'
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CalendarMonthOutlinedIcon sx={{ color: '#000000' }} />
                </ListItemIcon>
                <ListItemText primary={rezData && rezData.rez_date} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <ScheduleOutlinedIcon sx={{ color: '#000000' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    rezData && rezData.start_time + ' ~ ' + rezData.end_time
                  }
                />
              </ListItem>
              <Divider />
            </List>
          </Grid>
        </Grid>
        {status ? (
          <RectangleBtn
            category={'register'}
            text={'입실'}
            sx={{
              padding: '14px 12px'
            }}
            handlebtn={handleCheckIn}
          />
        ) : (
          <RectangleBtn
            category={'delete'}
            text={'퇴실'}
            sx={{
              padding: '14px 12px'
            }}
            handlebtn={handleCheckOut}
          />
        )}
      </Box>
    </Paper>
    // </Container>
  );
};

export default QRPage;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// -------------------------------------------------------------
import styled from '@emotion/styled';
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
// -------------------------------------------------------------
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import SubHeader from '../../../components/common/SubHeader';

const MrRezHistoryPage = () => {
  return (
    <>
      <SubHeader title="예약현황" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <Grid container spacing={2}>
            <Grid item container xs={12}>
              <WrapContainer bgcolor={'#fff'}>
                <Grid container sx={{ height: '200px' }}>
                  <Grid item xs={3}>
                    이번주 회의실 예약 횟수
                  </Grid>
                  <Grid item xs={3}>
                    평균 회의실 이용 시간
                  </Grid>
                  <Grid item xs={3}>
                    dasd
                  </Grid>
                  <Grid item xs={3}>
                    dasd
                  </Grid>
                </Grid>
              </WrapContainer>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={9}>
                <WrapContainer bgcolor={'#fff'}>
                  <Typography variant="subtitle1">
                    내 회의실 예약 현황
                  </Typography>
                </WrapContainer>
              </Grid>

              {/* 오늘 회의실 예약 일정 */}
              <Grid item xs={3}>
                <WrapContainer bgcolor={'#fff'}>
                  <Typography variant="subtitle1">오늘 예약 현황</Typography>
                  <Timeline
                    sx={{
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0
                      }
                    }}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="subtitle1" component="div">
                          09:00 ~ 11:30
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                          개발1팀 회의
                        </Typography>
                        <Typography variant="body2">
                          소회의실 A - 201
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="subtitle1" component="div">
                          09:00 ~ 11:30
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                          포인트 기능 개발 회의
                        </Typography>
                        <Typography variant="body2">
                          소회의실 A - 201
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="subtitle1" component="div">
                          09:00 ~ 11:30
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                          위하고 TF 회의
                        </Typography>
                        <Typography variant="body2">
                          소회의실 A - 201
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </WrapContainer>
              </Grid>
            </Grid>
          </Grid>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrRezHistoryPage;

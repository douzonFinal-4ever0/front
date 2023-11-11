import { Avatar, AvatarGroup, Box, Stack, Typography } from '@mui/material';
import WrapContainer from '../../../../components/mr_user/WrapContainer';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@mui/lab';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { palette } from '../../../../theme/palette';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const RezList = ({ todayRezList }) => {
  console.log(todayRezList);
  return (
    <WrapContainer bgcolor={'#fff'}>
      <Stack
        direction={'row'}
        sx={{ justifyContent: 'space-between', marginBottom: '20px' }}
      >
        <Typography variant="h6">오늘 예약 현황</Typography>
        <StyledLink to={'/mr/rez/history'}>
          <Typography sx={{ fontWeight: 'bold' }}>전체보기</Typography>
          <KeyboardArrowRightRoundedIcon />
        </StyledLink>
      </Stack>
      <Timeline
        sx={{
          maxHeight: '500px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: palette.grey['500'],
            borderRadius: '10px'
          },
          '&::-webkit-scrollbar': {
            width: '10px',
            backgroundColor: '#eee',
            borderRadius: '10px'
          },
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0
          }
        }}
      >
        {todayRezList.length !== 0 ? (
          todayRezList.map((item, index) => (
            <TimelineItem
              key={index}
              sx={{ display: 'flex', height: '100%', minHeight: 'auto' }}
            >
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ width: '100%', height: '100%' }}>
                <Box
                  sx={{
                    margin: '6px 0 10px 20px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '6px',
                    border: `1px solid ${palette.grey['400']}`,
                    borderRadius: '4px'
                    //backgroundColor: palette.grey['100']
                  }}
                >
                  <Stack
                    direction={'row'}
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        color: palette.primary.main,
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginRight: '14px'
                      }}
                    >
                      {item.newTime}
                    </Typography>
                    {item.role === '예약자' ? (
                      <Typography
                        sx={{
                          padding: '2px 4px',
                          backgroundColor: palette.grey['300'],
                          borderRadius: '2px',
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: 'bold'
                        }}
                      >
                        예약자
                      </Typography>
                    ) : null}
                  </Stack>
                  <Typography
                    component="div"
                    sx={{
                      color: palette.grey['900'],
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.m_name}
                  </Typography>
                  <Stack
                    direction={'row'}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-end'
                    }}
                  >
                    <Typography variant="subtitle1">
                      {item.mr && item.mr.mr_name}
                    </Typography>
                    <AvatarGroup
                      renderSurplus={(surplus) => (
                        <span>+{surplus.toString()[0]}k</span>
                      )}
                      total={item.mr_pt_list.length}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: 30,
                          height: 30,
                          fontSize: 15
                        }
                      }}
                    >
                      {item.mr_pt_list.map((mem, index) => (
                        <Avatar alt="Remy Sharp" src={''} key={index} />
                      ))}
                    </AvatarGroup>
                  </Stack>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <StyledNoCalendarIcon />
            <Typography variant="body2" sx={{ color: '#666' }}>
              오늘 일정이 없습니다
            </Typography>
          </Box>
        )}
      </Timeline>
    </WrapContainer>
  );
};

export default RezList;

const StyledNoCalendarIcon = styled(EventBusyRoundedIcon)(() => ({
  color: '#666'
}));

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: '#333',
  display: 'flex'
}));

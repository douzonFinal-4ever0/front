// @MUI--------------------------------------------------------------------
import { Grid, Stack } from '@mui/material';
// --------------------------------------------------------------------
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import MrInfo from './section/MrInfo';
// --------------------------------------------------------------------
import RoomImage1 from '../../../assets/images/room/room1.jpeg';
import RoomImage2 from '../../../assets/images/room/room2.jpeg';
import RoomImage3 from '../../../assets/images/room/room3.jpeg';
import MrRezDashboard from './section/MrRezDashboard';
import MrSubInfo from './section/MrSubInfo';
import RezCard from './form/RezCard';

const MrDetailPage = () => {
  // 회의실 더미 데이터
  const data = {
    mrCode: 'R001',
    mrName: '더존 스카이 라운지',
    mrType: '미팅룸',
    maximumCapacity: 10,
    location: '더존 A사옥 105호',
    avlStartTime: '09:00:00',
    avlEndTime: '18:00:00',
    isOpened: true,
    isUsed: false,
    images: [
      {
        index: 0,
        imgCode: 'I001',
        url: RoomImage1
      },
      {
        index: 1,
        imgCode: 'I002',
        url: RoomImage2
      },
      {
        index: 2,
        imgCode: 'I003',
        url: RoomImage3
      }
    ],
    mrOpDay: [
      {
        index: 0,
        opDayCode: 'D001',
        day: 0
      },
      {
        index: 1,
        opDayCode: 'D002',
        day: 1
      },
      {
        index: 2,
        opDayCode: 'D003',
        day: 2
      }
    ],
    tags: [
      {
        index: 0,
        value: '브레인스토밍'
      },
      {
        index: 1,
        value: '프로젝트회의'
      },
      {
        index: 2,
        value: '주간회의'
      },
      {
        index: 3,
        value: '미팅룸'
      },
      {
        index: 4,
        value: '컨퍼런스'
      }
    ],
    mrSupplies: [
      {
        index: 0,
        name: '빔프로젝터'
      },
      {
        index: 1,
        name: '화상회의장비'
      },
      {
        index: 2,
        name: '마이크'
      },
      {
        index: 3,
        name: '스피커'
      },
      {
        index: 4,
        name: '화이트보드'
      },
      {
        index: 5,
        name: '포인터'
      },
      {
        index: 6,
        name: '강연대'
      }
    ]
  };
  // 회의실 예약 현황 더미 데이터
  const schedule = [
    {
      index: 0,
      hour: 9,
      firstHalf: true,
      secondHalf: false
    },
    {
      index: 1,
      hour: 10,
      firstHalf: true,
      secondHalf: true
    },
    {
      index: 2,
      hour: 11,
      firstHalf: false,
      secondHalf: false
    },
    {
      index: 3,
      hour: 12,
      firstHalf: true,
      secondHalf: false
    },
    {
      index: 4,
      hour: 13,
      firstHalf: false,
      secondHalf: true
    },
    {
      index: 5,
      hour: 14,
      firstHalf: false,
      secondHalf: true
    },
    {
      index: 6,
      hour: 15,
      firstHalf: false,
      secondHalf: false
    },
    {
      index: 7,
      hour: 16,
      firstHalf: false,
      secondHalf: true
    },
    {
      index: 8,
      hour: 17,
      firstHalf: true,
      secondHalf: true
    },
    {
      index: 9,
      hour: 18,
      firstHalf: true,
      secondHalf: true
    }
  ];
  // 회의실 종류 더미 데이터
  const mrCategory = [
    {
      index: 0,
      value: '미팅룸',
      name: '미팅룸'
    },
    {
      index: 1,
      value: '화상회의룸',
      name: '화상회의룸'
    },
    {
      index: 2,
      value: '컨퍼런스룸',
      name: '컨퍼런스룸'
    }
  ];

  return (
    <MainContainer>
      <WrapContainer bgcolor={'#fff'}>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Stack rowGap={8} sx={{ height: '2000px' }}>
              <MrInfo data={data} />
              <MrRezDashboard schedule={schedule} />
              <MrSubInfo data={data.mrSupplies} />
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <RezCard mrCategory={mrCategory} />
          </Grid>
        </Grid>
      </WrapContainer>
    </MainContainer>
  );
};

export default MrDetailPage;

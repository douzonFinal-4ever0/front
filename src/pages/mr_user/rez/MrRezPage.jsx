import { useEffect, useState } from 'react';
import axios from 'axios';
// -------------------------------------------------------------
import styled from '@emotion/styled';
import { Box, Grid, Stack, Typography } from '@mui/material';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
// -------------------------------------------------------------
import MainContainer from '../../../components/mr_user/MainContainer';
import WrapContainer from '../../../components/mr_user/WrapContainer';
import RecommendSection from './section/RecommendSection';
import MrInfoSection from './section/MrInfoSection';
import RezSection from './section/RezSection';
import SubHeader from '../../../components/common/SubHeader';
import RoomImage1 from '../../../assets/images/room/room1.jpeg';
import RoomImage2 from '../../../assets/images/room/room2.jpeg';
import RoomImage3 from '../../../assets/images/room/room3.jpeg';

const MrRezPage = () => {
  const data = [
    {
      mrCode: 'r001',
      mrName: '스카이룸',
      location: '더존 별관 3F 301호',
      maximumCapacity: 10,
      avlStartTime: '9:00',
      avlEndTime: '18:00',
      days: ['월', '화', '수', '목', '금'],
      keywords: [
        {
          keywordCode: 'k001',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k002',
          keywordName: '슬기공쥬'
        },
        {
          keywordCode: 'k003',
          keywordName: '유나스'
        },
        {
          keywordCode: 'k004',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k005',
          keywordName: '슬기공쥬'
        },
        {
          keywordCode: 'k006',
          keywordName: '유나프린스'
        }
      ],
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
      ]
    },
    {
      mrCode: 'r002',
      mrName: '스카이룸',
      location: '더존 별관 3F 301호',
      maximumCapacity: 10,
      keywords: [
        {
          keywordCode: 'k001',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k002',
          keywordName: '슬기곤쥬'
        },
        {
          keywordCode: 'k003',
          keywordName: '유나야구왕'
        }
      ],
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
      ]
    },
    {
      mrCode: 'r003',
      mrName: '스카이룸',
      location: '더존 별관 3F 301호',
      maximumCapacity: 10,
      keywords: [
        {
          keywordCode: 'k001',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k002',
          keywordName: '슬기곤쥬'
        },
        {
          keywordCode: 'k003',
          keywordName: '유나야구왕'
        }
      ],
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
      ]
    },
    {
      mrCode: 'r004',
      mrName: '스카이룸',
      location: '더존 별관 3F 301호',
      maximumCapacity: 10,
      keywords: [
        {
          keywordCode: 'k001',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k002',
          keywordName: '슬기곤쥬'
        },
        {
          keywordCode: 'k003',
          keywordName: '유나야구왕'
        }
      ],
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
      ]
    },
    {
      mrCode: 'r005',
      mrName: '스카이룸',
      location: '더존 별관 3F 301호',
      maximumCapacity: 10,
      keywords: [
        {
          keywordCode: 'k001',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k002',
          keywordName: '슬기공쥬'
        },
        {
          keywordCode: 'k003',
          keywordName: '유나프린스'
        }
      ],
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
      ]
    },
    {
      mrCode: 'r006',
      mrName: '스카이룸',
      location: '더존 별관 3F 301호',
      maximumCapacity: 10,
      keywords: [
        {
          keywordCode: 'k001',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k002',
          keywordName: '슬기곤쥬'
        },
        {
          keywordCode: 'k003',
          keywordName: '유나야구왕'
        }
      ],
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
      ]
    },
    {
      mrCode: 'r007',
      mrName: '스카이룸',
      location: '더존 별관 3F 301호',
      maximumCapacity: 10,
      keywords: [
        {
          keywordCode: 'k001',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k002',
          keywordName: '슬기곤쥬'
        },
        {
          keywordCode: 'k003',
          keywordName: '유나야구왕'
        }
      ],
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
      ]
    },
    {
      mrCode: 'r008',
      mrName: '스카이룸',
      location: '더존 별관 3F 301호',
      maximumCapacity: 10,
      keywords: [
        {
          keywordCode: 'k001',
          keywordName: '희지니천재'
        },
        {
          keywordCode: 'k002',
          keywordName: '슬기곤쥬'
        },
        {
          keywordCode: 'k003',
          keywordName: '유나야구왕'
        }
      ],
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
      ]
    }
  ];

  const [mrList, setMrList] = useState([]);

  useEffect(() => {
    const requestMrList = async () => {
      const res = await axios.get('http://localhost:3000/mr/mrList');
      setMrList([...res.data]);
    };

    requestMrList();
  }, []);

  return (
    <>
      <SubHeader title="회의실 예약" />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Grid container direction={'row'} spacing={3}>
              {/* row - 회의실 정보 */}
              <Grid item container xs={8} spacing={3}>
                <Grid item xs={5.5}>
                  <Stack spacing={2}>
                    <StyledStepText>
                      <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                      Step 1 - 추천 회의실 선택
                    </StyledStepText>
                    <RecommendSection data={data} />
                  </Stack>
                </Grid>
                <Grid item xs={6.5}>
                  <Stack spacing={2}>
                    <StyledStepText>
                      <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                      Step 2 - 회의실 상세정보 확인
                    </StyledStepText>
                    <MrInfoSection data={data[0]} />
                  </Stack>
                </Grid>
              </Grid>
              {/* row - 예약 정보 */}
              <Grid item xs={4}>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <StyledStepText>
                      <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                      Step 3 - 예약 정보 입력
                    </StyledStepText>
                    <RezSection />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrRezPage;

const StyledStepText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  borderBottom: '3px solid black'
}));

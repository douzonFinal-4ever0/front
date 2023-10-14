import { useState } from 'react';
import styled from '@emotion/styled';
// @MUI--------------------------------------------------------------------
import { Badge, Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
// --------------------------------------------------------------------
import { BORDER_RADIUS, PAGE_INNER_PADDING } from '../../../../config';
import SectionTitle from '../../../../components/mr_user/SectionTitle';
import ImageBtn from '../../../../components/mr_user/ImageBtn';
import { convertDayToText } from '../../../../utils/convertDayToText';
import Tag from '../../../../components/mr_user/Tag';
import { palette } from '../../../../theme/palette';

const MrInfo = ({ data }) => {
  const {
    images,
    mrName,
    location,
    maximumCapacity,
    avlStartTime,
    avlEndTime,
    mrOpDay,
    tags
  } = data;
  // 즐겨찾기 유무
  const [bookmark, setBookmark] = useState(false);
  // 메인 이미지
  const [mainImg, setMainImg] = useState(data.images[0].url);
  // 요일 리스트
  const dayList = [];
  // 요일 데이터 변환 (숫자 -> 문자)
  mrOpDay.forEach((day) => {
    const res = convertDayToText(day.day);
    dayList.push(res);
  });

  // 이미지 썸네일에 마우스 올려두었을 때 이벤트 (이미지 변경)
  const handleRoomImg = (e) => {
    setMainImg(e.target.src);
  };

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <Box component="section">
      <Grid container spacing={2}>
        <Grid item xs={5.5}>
          <Box
            component={'section'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: `${PAGE_INNER_PADDING}px`
            }}
          >
            <SectionTitle title="회의실 정보">
              <MeetingRoomRoundedIcon />
            </SectionTitle>
            <Box
              component={'div'}
              sx={{
                borderRadius: BORDER_RADIUS,
                width: '100%',
                objectFit: 'cover'
              }}
            >
              <StyledImage
                width={'100%'}
                height={'100%'}
                src={mainImg}
                alt="회의실 이미지"
                loading="lazy"
              />
            </Box>
            <BtnsContainer>
              {images.map((img) => (
                <Box sx={{ borderRadius: BORDER_RADIUS }}>
                  <StyledImage
                    onMouseEnter={handleRoomImg}
                    width={'60px'}
                    height={'60px'}
                    src={img.url}
                    alt="회의실 이미지"
                  />
                </Box>
              ))}
              <ImageBtn></ImageBtn>
            </BtnsContainer>
          </Box>
        </Grid>
        <Grid item xs={6.5}>
          <Stack sx={{ paddingTop: '50px', rowGap: `${PAGE_INNER_PADDING}px` }}>
            {/* 회의실명 영역 */}
            <StyledRoomInfoWrap>
              <StyledRoomName>{mrName}</StyledRoomName>
              <IconButton onClick={handleBookmark}>
                {bookmark ? (
                  <StarRoundedIcon fontSize="large" />
                ) : (
                  <StarBorderRoundedIcon fontSize="large" />
                )}
              </IconButton>
            </StyledRoomInfoWrap>
            <Stack sx={{ rowGap: '4px' }}>
              {/* 위치 영역 */}
              <StyledRoomInfoWrap>
                <LocationOnRoundedIcon fontSize="small" />
                <StyledInfoText>{location}</StyledInfoText>
              </StyledRoomInfoWrap>
              {/* 최대 인원수 영역 */}
              <StyledRoomInfoWrap>
                <PersonRoundedIcon fontSize="small" />
                <StyledInfoText>최대 {maximumCapacity} 명</StyledInfoText>
              </StyledRoomInfoWrap>
              {/* 이용시간 영역 */}
              <StyledRoomInfoWrap>
                <AccessTimeFilledRoundedIcon fontSize="small" />
                <StyledInfoText>
                  {avlStartTime} - {avlEndTime}
                </StyledInfoText>
              </StyledRoomInfoWrap>
              {/* 요일 영역 */}
              <StyledRoomInfoWrap>
                <DateRangeRoundedIcon fontSize="small" />
                {dayList.map((day) => (
                  <StyledInfoText>{day}</StyledInfoText>
                ))}
              </StyledRoomInfoWrap>
            </Stack>
            {/* 태그 영역 */}
            <Stack sx={{ marginTop: `${PAGE_INNER_PADDING}px` }}>
              <StyledRoomTagsWrap>
                {tags.map((tag) => (
                  <Tag
                    text={tag.value}
                    isHashTag={true}
                    bgColor={palette.grey['800']}
                  />
                ))}
              </StyledRoomTagsWrap>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MrInfo;

const BtnsContainer = styled(Box)(({ width, height }) => ({
  display: 'flex',
  gap: '14px'
}));

const StyledImage = styled('img')(({ width, height }) => ({
  width,
  height,
  borderRadius: BORDER_RADIUS,
  objectFit: 'cover'
}));

const StyledRoomName = styled('h3')(({ theme }) => ({
  margin: 0,
  fontSize: '26px',
  fontWeight: theme.typography.fontWeightbold
}));

const StyledRoomInfoWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '4px',
  alignItems: 'center'
}));

const StyledRoomTagsWrap = styled(StyledRoomInfoWrap)(({ theme }) => ({
  flexWrap: 'wrap'
}));

const StyledInfoText = styled(Typography)(({ theme }) => ({
  fontSize: '16px'
}));

import { Box, IconButton, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';

import { setMrRecommendData } from '../../../../redux/reducer/MrRecommendSlice';
import Carousel from '../../../../components/mr_user/Carousel';
import { useState } from 'react';
import { PAGE_INNER_PADDING } from '../../../../config';
import Tag from '../../../../components/mr_user/Tag';
import { convertDayToText } from '../../../../utils/convertDayToText';

const MrInfoSection = ({ data }) => {
  const {
    mr_name,
    location,
    maximum_capacity,
    avl_start_time,
    avl_end_time,
    mr_keyword,
    mr_img,
    mr_op_day
  } = data;

  // 요일 number -> string으로 변경
  const newDays = [];
  if (mr_op_day) {
    mr_op_day.forEach((item) => newDays.push(convertDayToText(item.day)));
  }

  // 즐겨찾기 유무
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <Box
      component={'section'}
      sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
    >
      <Box>
        {/* <Carousel data={data} /> */}
        <Stack sx={{ padding: '10px 20px 10px', rowGap: '6px' }}>
          <StyledRoomTitleInfoWrap>
            {/* 회의실명 영역 */}
            <StyledRoomName>{mr_name}</StyledRoomName>
            <IconButton onClick={handleBookmark}>
              {bookmark ? (
                <StarRoundedIcon fontSize="large" />
              ) : (
                <StarBorderRoundedIcon fontSize="large" />
              )}
            </IconButton>
          </StyledRoomTitleInfoWrap>
          <Stack sx={{ rowGap: '6px' }}>
            {/* 위치 영역 */}
            <StyledRoomInfoWrap>
              <FmdGoodOutlinedIcon fontSize="small" />
              <StyledInfoText>{location}</StyledInfoText>
            </StyledRoomInfoWrap>
            {/* 최대 인원수 영역 */}
            <StyledRoomInfoWrap>
              <PermIdentityOutlinedIcon fontSize="small" />
              <StyledInfoText>최대 {maximum_capacity} 명</StyledInfoText>
            </StyledRoomInfoWrap>
            {/* 이용시간 영역 */}
            <StyledRoomInfoWrap>
              <AccessTimeRoundedIcon fontSize="small" />
              <StyledInfoText>
                {new Date(avl_start_time)
                  .toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })
                  .replace(/:\d+\s/, ' ')}
                -
                {new Date(avl_end_time)
                  .toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })
                  .replace(/:\d+\s/, ' ')}
              </StyledInfoText>
            </StyledRoomInfoWrap>
            {/* 요일 영역 */}
            <StyledRoomInfoWrap>
              <DateRangeRoundedIcon fontSize="small" />
              {newDays &&
                newDays.map((day, index) => (
                  <StyledInfoText key={index}>{day}</StyledInfoText>
                ))}
            </StyledRoomInfoWrap>
          </Stack>
          {/* 태그 영역 */}
          <Stack sx={{ marginTop: `${PAGE_INNER_PADDING}px` }}>
            <StyledRoomTagsWrap>
              {mr_keyword &&
                mr_keyword.map((tag) => (
                  <Tag
                    key={tag.keyword_code}
                    text={tag.keyword_name}
                    isHashTag={true}
                  />
                ))}
            </StyledRoomTagsWrap>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default MrInfoSection;

const StyledRoomTitleInfoWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const StyledRoomInfoWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '4px',
  alignItems: 'center'
}));

const StyledRoomName = styled('h3')(({ theme }) => ({
  margin: 0,
  fontSize: '24px',
  fontWeight: theme.typography.fontWeightbold
}));

const StyledInfoText = styled(Typography)(({ theme }) => ({
  fontSize: '16px'
}));

const StyledRoomTagsWrap = styled(StyledRoomInfoWrap)(({ theme }) => ({
  flexWrap: 'wrap'
}));

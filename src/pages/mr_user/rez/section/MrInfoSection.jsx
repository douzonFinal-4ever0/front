import { Box, IconButton, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';

import SectionTitle from '../../../../components/mr_user/SectionTitle';
import Carousel from '../../../../components/mr_user/Carousel';
import { useState } from 'react';
import { PAGE_INNER_PADDING } from '../../../../config';
import Tag from '../../../../components/mr_user/Tag';

const MrInfoSection = ({ data }) => {
  const {
    mrName,
    location,
    maximumCapacity,
    avlStartTime,
    avlEndTime,
    days,
    keywords
  } = data;

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
      {/* <SectionTitle title="회의실 정보" sx={{ fontSize: '16px' }}>
        <MeetingRoomIcon />
      </SectionTitle> */}
      <Box>
        <Carousel data={data} />
        <Stack sx={{ padding: '10px 20px 10px', rowGap: '6px' }}>
          <StyledRoomTitleInfoWrap>
            {/* 회의실명 영역 */}
            <StyledRoomName>{mrName}</StyledRoomName>
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
              <StyledInfoText>최대 {maximumCapacity} 명</StyledInfoText>
            </StyledRoomInfoWrap>
            {/* 이용시간 영역 */}
            <StyledRoomInfoWrap>
              <AccessTimeRoundedIcon fontSize="small" />
              <StyledInfoText>
                {avlStartTime} - {avlEndTime}
              </StyledInfoText>
            </StyledRoomInfoWrap>
            {/* 요일 영역 */}
            <StyledRoomInfoWrap>
              <DateRangeRoundedIcon fontSize="small" />
              {days.map((day, index) => (
                <StyledInfoText key={index}>{day}</StyledInfoText>
              ))}
            </StyledRoomInfoWrap>
          </Stack>
          {/* 태그 영역 */}
          <Stack sx={{ marginTop: `${PAGE_INNER_PADDING}px` }}>
            <StyledRoomTagsWrap>
              {keywords.map((tag) => (
                <Tag
                  key={tag.keywordCode}
                  text={tag.keywordName}
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

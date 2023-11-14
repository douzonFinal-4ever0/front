import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Chip } from '@mui/material';
import styled from '@emotion/styled';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';

import { setMrRecommendData } from '../../../../redux/reducer/MrRecommendSlice';
import RoomPreferencesRoundedIcon from '@mui/icons-material/RoomPreferencesRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';
import Carousel from '../../../../components/mr_user/Carousel';
import { useState } from 'react';
import { PAGE_INNER_PADDING } from '../../../../config';
import Tag from '../../../../components/mr_user/Tag';
import { convertDayToText } from '../../../../utils/convertDayToText';
import { palette } from '../../../../theme/palette';

const MrInfoSection = ({ data }) => {
  const {
    mr_name,
    location,
    maximum_capacity,
    avl_start_time,
    avl_end_time,
    mr_keyword,
    mr_img,
    mr_op_day,
    mr_supplies
  } = data;

  console.log(mr_supplies);

  // 요일 number -> string으로 변경
  let newDays = [];

  if (mr_op_day) {
    const arr = [...mr_op_day];
    arr.sort((a, b) => a.day - b.day);
    arr.forEach((item) => newDays.push(convertDayToText(item.day)));
  }

  // 즐겨찾기 유무
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  console.log(mr_supplies);
  return (
    <Box
      component={'section'}
      sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
    >
      <Box>
        <Carousel data={mr_img} />
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

            {/* 장비 영역 */}
            <Stack sx={{ marginTop: '10px', rowGap: '6px' }}>
              <Stack direction={'row'} sx={{ alignItems: 'center' }}>
                <RoomPreferencesRoundedIcon
                  fontSize="small"
                  sx={{ marginRight: '4px' }}
                />
                <StyledInfoTilte>기본 장비</StyledInfoTilte>
              </Stack>

              <StyledRoomTagsWrap>
                {mr_supplies &&
                  mr_supplies.map((item, index) => (
                    <>
                      {item.supplies.supplies_name === null ? null : (
                        <Chip
                          label={item.supplies.supplies_name}
                          sx={{ backgroundColor: palette.grey['300'] }}
                        />
                      )}
                    </>
                  ))}
              </StyledRoomTagsWrap>
            </Stack>

            {/* 태그 영역 */}
            <Stack sx={{ marginTop: '10px', rowGap: '6px' }}>
              <Stack direction={'row'} sx={{ alignItems: 'center' }}>
                <TagRoundedIcon fontSize="small" sx={{ marginRight: '4px' }} />
                <StyledInfoTilte>회의실 태그</StyledInfoTilte>
              </Stack>
              <StyledRoomTagsWrap>
                {mr_keyword &&
                  mr_keyword.map((tag, index) => (
                    <Chip
                      label={tag.keyword_name}
                      sx={{ backgroundColor: palette.grey['300'] }}
                    />
                  ))}
              </StyledRoomTagsWrap>
            </Stack>
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

const StyledInfoTilte = styled(Typography)(({ theme }) => ({
  fontSize: '16x'
}));

const StyledRoomTagsWrap = styled(StyledRoomInfoWrap)(({ theme }) => ({
  flexWrap: 'wrap'
}));

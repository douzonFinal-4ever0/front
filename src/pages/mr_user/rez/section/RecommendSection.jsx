import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import styled from '@emotion/styled';

import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import SectionTitle from '../../../../components/mr_user/SectionTitle';
import Tag from '../../../../components/mr_user/Tag';
import { palette } from '../../../../theme/palette';

const MrCard = ({ data }) => {
  const { mr_code, mr_name, location, maximum_capacity, mr_keyword } = data;

  const handleCardClick = (e) => {
    console.log(mr_code);
  };

  console.log(mr_keyword);
  return (
    <StyledCard
      onClick={handleCardClick}
      // isselected={selectCard === mr_code ? true : false}
      name={mr_code}
    >
      <CardContent
        sx={{
          '&:last-child': {
            paddingBottom: '16px'
          }
        }}
      >
        <Stack sx={{ rowGap: '8px' }}>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <StyledMrName>{mr_name}</StyledMrName>
            <StyledCapacity>최대 {maximum_capacity}명</StyledCapacity>
          </Stack>
          <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <PlaceRoundedIcon fontSize="small" />
            <Typography>{location}</Typography>
          </Stack>
          <Stack
            direction={'row'}
            sx={{
              mt: '10px',
              gap: '4px',
              overflowX: 'scroll',
              overflowY: 'hidden',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            {mr_keyword.map((item) => (
              <Tag
                key={item.keyword_code}
                text={item.keyword_name}
                isHashTag={true}
                sx={{ backgroundColor: palette.grey['500'], fontSize: '12px' }}
              />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
  return <></>;
};

const MrCardList = ({ data }) => {
  return (
    <ContainerWithScroll>
      <StyledList sx={{ width: '100%' }}>
        {data.map((item) => (
          <StyledListItem key={item.mr_code}>
            <MrCard data={item} />
          </StyledListItem>
        ))}
      </StyledList>
    </ContainerWithScroll>
  );
};

const RecommendSection = ({ data }) => {
  return (
    <Box
      component={'section'}
      sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
    >
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '2px',
          paddingRight: '10px'
        }}
      >
        <Tooltip
          title="사용자 데이터를 분석하여 회의실을 추천드립니다 :-D"
          placement="top"
        >
          <StyledInfoIcon fontSize="small" color="#555" />
        </Tooltip>
        <SectionTitle
          title={`추천 ${data.length}건`}
          sx={{ fontSize: '14px', marginLeft: '0', color: '#555' }}
        />
      </Stack>
      <MrCardList data={data} />
    </Box>
  );
};

export default RecommendSection;

const ContainerWithScroll = styled('div')(() => ({
  height: '800px',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  rowGap: '12px',
  width: '100%'
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  display: 'display',
  width: '100%'
}));

const StyledCard = styled(Card)(({ theme, isselected }) => ({
  margin: '0 4px',
  width: '100%',
  backgroundColor: isselected
    ? theme.palette.grey['100']
    : theme.palette.common.white,
  border: '1px solid #eee'
}));

const StyledMrName = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightBold
}));

const StyledCapacity = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: theme.typography.fontWeightBold
}));

const StyledInfoIcon = styled(InfoRoundedIcon)(({ theme }) => ({
  color: '#555'
}));

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

const MrCard = ({ data, selectMrCard, handleCardClick }) => {
  const { mr_code, mr_name, location, maximum_capacity, mr_keyword, priority } =
    data;
  let score = priority;

  const convertScore = () => {
    const itemWeights = [1, 10, 100, 1000];
    let itemCounts = {};

    for (let i = itemWeights.length - 1; i >= 0; i--) {
      let itemWeight = itemWeights[i];
      let itemCount = Math.floor(score / itemWeight);
      itemCounts[`item${i + 1}`] = itemCount;
      score -= itemCount * itemWeight;
    }
    const tags = [];

    if (itemCounts.item4 == 1) {
      tags.push({ tag: '즐겨찾기' });
    }

    if (itemCounts.item3 == 1) {
      tags.push({ tag: '최근이용한' });
    }

    if (itemCounts.item2 == 1) {
      tags.push({ tag: '가까운' });
    }

    if (itemCounts.item1 == 1) {
      tags.push({ tag: '주제적합' });
    }

    return tags;
  };

  const cardTags = convertScore();

  return (
    <StyledCard
      onClick={handleCardClick}
      isselected={selectMrCard['mr_code'] === mr_code ? true : false}
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
            {cardTags &&
              cardTags.map((item) => (
                <Tag
                  key={item.tag}
                  text={item.tag}
                  isHashTag={true}
                  sx={{
                    backgroundColor: palette.grey['500'],
                    fontSize: '12px'
                  }}
                />
              ))}
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

const MrCardList = ({ data, selectMrCard, handleCardClick }) => {
  console.log(data);
  return (
    <ContainerWithScroll>
      <StyledList sx={{ width: '100%' }}>
        {data &&
          data.map((item) => (
            <StyledListItem key={item.mr_code}>
              <MrCard
                data={item}
                selectMrCard={selectMrCard}
                handleCardClick={handleCardClick}
              />
            </StyledListItem>
          ))}
      </StyledList>
    </ContainerWithScroll>
  );
};

const RecommendSection = ({ data, selectMrCard, handleCardClick }) => {
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
      <MrCardList
        data={data}
        selectMrCard={selectMrCard}
        handleCardClick={handleCardClick}
      />
    </Box>
  );
};

export default RecommendSection;

const ContainerWithScroll = styled('div')(({ theme }) => ({
  height: '800px',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey['500'],
    borderRadius: '10px'
  },
  '&::-webkit-scrollbar': {
    width: '10px',
    backgroundColor: '#eee',
    borderRadius: '10px'
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
    ? theme.palette.grey['300']
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

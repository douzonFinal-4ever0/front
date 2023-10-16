import { useEffect, useRef, useState } from 'react';
// @MUI--------------------------------------------------------------------
import { Card, CardContent, CardHeader } from '@mui/material';
import styled from '@emotion/styled';
import FeedIcon from '@mui/icons-material/Feed';
// --------------------------------------------------------------------
import { BORDER_RADIUS } from '../../../../config';
import SectionTitle from '../../../../components/mr_user/SectionTitle';
import MrForm from './MrForm';

const RezCard = ({ mrCategory }) => {
  const [step, setStep] = useState(1);
  const [cardWidth, setCardWidth] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const refEl = useRef();

  // 예약 카드 width 값 구하기
  useEffect(() => {
    setCardWidth(refEl.current.offsetWidth);
  }, []);

  // 예약 카드 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 30) {
        setIsSticky(false);
        setIsFixed(false);
      }

      if (window.scrollY > 30) {
        setIsSticky(true);
      }

      if (window.scrollY > 500) {
        setIsSticky(false);
        setIsFixed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledContainer
      ref={refEl}
      cardWidth={cardWidth}
      isSticky={isSticky}
      isFixed={isFixed}
    >
      <StyledHeader
        avatar={
          <SectionTitle title="예약 정보">
            <FeedIcon />
          </SectionTitle>
        }
      />
      <CardContent sx={{ position: 'relative' }}>
        <MrForm mrCategory={mrCategory} />
      </CardContent>
    </StyledContainer>
  );
};

export default RezCard;

const StyledContainer = styled(Card)(
  ({ theme, cardWidth, isSticky, isFixed }) => ({
    position: isSticky ? 'fixed' : 'sticky',
    top: isSticky ? '110px' : isFixed ? '500px' : '0px',
    right: isSticky ? '44px' : isFixed ? '44px' : '0px',
    width: '100%',
    maxWidth: isSticky ? cardWidth : '100%',
    border: `1px solid ${theme.palette.grey['300']}`,
    borderRadius: BORDER_RADIUS,
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    zIndex: isFixed ? 1 : 1200
  })
);

const StyledHeader = styled(CardHeader)(({ theme }) => ({
  height: '70px',
  border: `1px solid ${theme.palette.grey['100']}`,
  borderTopLeftRadius: BORDER_RADIUS,
  borderTopRightRadius: BORDER_RADIUS,
  borderBottomLeftRadius: '0',
  borderBottomRightRadius: '0',
  backgroundColor: theme.palette.grey['100']
}));

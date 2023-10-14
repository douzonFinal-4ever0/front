import { useEffect, useRef, useState } from 'react';
// @MUI--------------------------------------------------------------------
import { Card, CardHeader } from '@mui/material';
import styled from '@emotion/styled';
// --------------------------------------------------------------------
import { BORDER_RADIUS } from '../../../../config';
import { palette } from '../../../../theme/palette';
import FeedIcon from '@mui/icons-material/Feed';
import SectionTitle from '../../../../components/mr_user/SectionTitle';

const RezCard = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const refEl = useRef();

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

  useEffect(() => {
    console.log(isSticky);
  }, [isSticky]);

  return (
    <StyledContainer ref={refEl} isSticky={isSticky} isFixed={isFixed}>
      <StyledHeader
        avatar={
          <SectionTitle title="예약 정보">
            <FeedIcon />
          </SectionTitle>
        }
      ></StyledHeader>
    </StyledContainer>
  );
};

export default RezCard;

const StyledContainer = styled(Card)(({ theme, isSticky, isFixed }) => ({
  position: isSticky ? 'fixed' : 'sticky',
  top: isSticky ? '110px' : isFixed ? '500px' : '0px',
  height: '400px',
  border: `1px solid ${theme.palette.grey['300']}`,
  borderRadius: BORDER_RADIUS,
  backgroundColor: theme.palette.common.white,
  zIndex: isFixed ? 1 : 2000
}));

const StyledHeader = styled(CardHeader)(({ theme }) => ({
  height: '70px',
  border: `1px solid ${theme.palette.grey['100']}`,
  borderTopLeftRadius: BORDER_RADIUS,
  borderTopRightRadius: BORDER_RADIUS,
  borderBottomLeftRadius: '0',
  borderBottomRightRadius: '0',
  backgroundColor: theme.palette.grey['100']
}));

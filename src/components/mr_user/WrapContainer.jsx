import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { PAGE_INNER_PADDING, BORDER_RADIUS } from '../../config';

const WrapContainer = ({ bgcolor, children }) => {
  return <StyledContainer bgcolor={bgcolor}>{children}</StyledContainer>;
};

export default WrapContainer;

const StyledContainer = styled(Container)(({ theme, bgcolor }) => ({
  padding: PAGE_INNER_PADDING,
  borderRadius: BORDER_RADIUS,
  backgroundColor: bgcolor,
  boxShadow: 'rgba(195, 198, 202, 0.2) 0px 8px 24px',
  [theme.breakpoints.up('md')]: {
    minWidth: '100%'
  }
}));

import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { PAGE_INNER_PADDING, BORDER_RADIUS } from '../../config';

const WrapContainer = ({ bgcolor, children, sx }) => {
  return (
    <StyledContainer bgcolor={bgcolor} sx={sx}>
      {children}
    </StyledContainer>
  );
};

export default WrapContainer;

const StyledContainer = styled(Container)(({ theme, bgcolor, sx }) => ({
  padding: PAGE_INNER_PADDING,
  borderRadius: BORDER_RADIUS,
  border: `1px solid ${theme.palette.grey['300']}`,
  backgroundColor: bgcolor,
  boxSizing: 'border-box',
  boxShadow: 'rgba(195, 198, 202, 0.2) 0px 8px 24px',
  [theme.breakpoints.up('md')]: {
    minWidth: '100%'
  },
  ...sx
}));

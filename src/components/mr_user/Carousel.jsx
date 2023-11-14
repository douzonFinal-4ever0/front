import MuiCarousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

const Carousel = ({ data }) => {
  return (
    <MuiCarousel indicators={false} autoPlay={false}>
      {data &&
        data.map((item) => (
          <StyledImageBox key={item.img_code}>
            <StyledImage src={item.url} />
          </StyledImageBox>
        ))}
    </MuiCarousel>
  );
};

export default Carousel;

const StyledImageBox = styled(Box)(() => ({
  height: '300px',
  borderRadius: '2px'
}));

const StyledImage = styled('img')(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '2px'
}));

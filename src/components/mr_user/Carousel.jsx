import MuiCarousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

const Carousel = ({ data }) => {
  const list = data.images;

  return (
    <MuiCarousel indicators={false} autoPlay={false}>
      {list.map((item) => (
        <StyledImageBox key={item.imgCode}>
          <StyledImage src={item.url} />
        </StyledImageBox>
      ))}
    </MuiCarousel>
  );
};

export default Carousel;

const StyledImageBox = styled(Box)(() => ({
  height: '300px',
  borderRadius: '10px'
}));

const StyledImage = styled('img')(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '10px'
}));

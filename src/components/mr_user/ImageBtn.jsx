import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

const ImageBtn = ({ src, alt, width, height, borderRadius }) => {
  return (
    <Box sx={{ borderRadius }}>
      <Button
        sx={{
          width,
          height,
          '&:hover &:active': {
            backgroundColor: 'transparent' // 호버 시 배경색을 투명하게 설정 (변경 가능)
          }
        }}
      >
        <StyledImage src={src} alt={alt} borderRadius={borderRadius} />
      </Button>
    </Box>
  );
};

export default ImageBtn;

const StyledImage = styled('img')(({ borderRadius }) => ({
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: borderRadius,
  objectFit: 'cover'
}));

import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';

// category 값에 따라 컬러 변경
const RectangleBtn = ({ type, text, sx, handlebtn, category }) => {
  const fontColor = () => {
    switch (category) {
      case 'cancel':
        return '#1A6ECE';
      default:
        return '#fff';
    }
  };

  const bgColor = () => {
    switch (category) {
      case 'register':
      case 'modify':
        return '#5092E1';
      case 'delete':
        return '#F4877F';
      case 'cancel':
        return '#fff';
      default:
        return '#5092E1';
    }
  };

  const bgHoverColor = () => {
    switch (category) {
      case 'register':
      case 'modify':
        return '#1a6ece';
      case 'delete':
        return '#EA6E64';
      case 'cancel':
        return '#fff';
      default:
        return '#1a6ece';
    }
  };

  return (
    <StyledBtn
      type={type}
      sx={sx}
      onClick={handlebtn}
      category={category}
      fontColor={fontColor(category)}
      bgColor={bgColor(category)}
      bgHoverColor={bgHoverColor(category)}
    >
      <Typography sx={{ fontWeight: 'bold' }}>{text}</Typography>
    </StyledBtn>
  );
};

export default RectangleBtn;

const StyledBtn = styled(Button)(
  ({ theme, sx, fontColor, category, bgColor, bgHoverColor }) => ({
    padding: '18px 16px',
    width: '100%',
    backgroundColor:
      category !== undefined ? bgColor : theme.palette.grey['700'],
    color: category !== undefined ? fontColor : theme.palette.common.white,
    border: category === 'cancel' ? '1px solid #dfdfdf' : 'none',
    '&:hover': {
      backgroundColor:
        category !== undefined ? bgHoverColor : theme.palette.grey['800']
    },
    ...sx
  })
);

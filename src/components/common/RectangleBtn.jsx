import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';

// category 값에 따라 컬러 변경
const RectangleBtn = ({
  type,
  text,
  sx,
  handlebtn,
  category,
  handleKeyDown,
  isDisabled
}) => {
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
      onKeyDown={handleKeyDown}
      category={category}
      fontcolor={fontColor(category)}
      bgcolor={bgColor(category)}
      bghovercolor={bgHoverColor(category)}
      isDisabled={isDisabled}
    >
      <Typography sx={{ fontWeight: 'bold' }}>{text}</Typography>
    </StyledBtn>
  );
};

export default RectangleBtn;

const StyledBtn = styled(Button)(
  ({ theme, sx, fontcolor, category, bgcolor, bghovercolor, isDisabled }) => ({
    padding: '18px 16px',
    width: '100%',
    color: category !== undefined ? fontcolor : theme.palette.common.white,
    border: category === 'cancel' ? '1px solid #dfdfdf' : 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: isDisabled
      ? '#ddd'
      : category !== undefined
      ? bgcolor
      : theme.palette.grey['700'],
    '&:hover': {
      backgroundColor: isDisabled
        ? '#ddd'
        : category !== undefined
        ? bghovercolor
        : theme.palette.grey['800']
    },
    ...sx
  })
);

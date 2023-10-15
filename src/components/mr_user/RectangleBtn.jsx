import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';

const RectangleBtn = ({ type, text, sx }) => {
  return (
    <StyledBtn type={type} sx={sx}>
      <Typography sx={{ fontWeight: 'bold' }}>{text}</Typography>
    </StyledBtn>
  );
};

export default RectangleBtn;

const StyledBtn = styled(Button)(({ theme, sx }) => ({
  padding: '18px 16px',
  width: '100%',
  backgroundColor: theme.palette.grey['900'],
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.grey['700']
  },
  ...sx
}));

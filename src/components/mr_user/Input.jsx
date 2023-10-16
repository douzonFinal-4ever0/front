import styled from '@emotion/styled';

const Input = ({ id, type, placeholder, sx }) => {
  return <StyledInput type={type} id={id} placeholder={placeholder} sx={sx} />;
};

export default Input;

const StyledInput = styled('input')(({ theme, sx }) => ({
  padding: '16px 14px',
  display: 'flex',
  width: '100%',
  height: '56px',
  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  fontSize: '14px',
  '&:hover': {
    outline: `1px solid ${theme.palette.grey['900']}`
  },
  ...sx
}));

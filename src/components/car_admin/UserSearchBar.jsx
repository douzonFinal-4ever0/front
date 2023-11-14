import { InputBase, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const UserSearchBar = (props) => {
  const { width, placeholder, value, handleInput } = props;

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: width,
        height: '50px'
      }}
    >
      <StyledInput
        sx={{
          ml: 1,
          flex: 1
        }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': '검색' }}
        value={value}
        onChange={handleInput}
      />
      <SearchIcon />
    </Paper>
  );
};

export default UserSearchBar;

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    border: 'none',
    backgroundColor: '#fff'
  },
  '&:hover fieldset, &:hover input': {
    border: 'none'
  },
  '& .Mui-focused fieldset': {
    border: 'none'
  }
}));

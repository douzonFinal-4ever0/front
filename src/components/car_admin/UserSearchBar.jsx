import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UserSearchBar = (props) => {
    const { width, placeholder, value, handleInput } = props;

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: width }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
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

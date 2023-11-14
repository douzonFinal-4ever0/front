import { Box } from '@mui/system';
import RectangleIcon from '@mui/icons-material/Rectangle';
import { Typography } from '@mui/material';

const CommonTitle = ({ title }) => {
  return (
    <Box
      display="flex"
      marginTop="15px"
      sx={{
        width: '100%',
        borderBottom: '3px solid black',
        padding: '5px 0px'
      }}
    >
      <RectangleIcon
        sx={{
          color: 'black',
          marginTop: 'auto',
          marginBottom: 'auto',
          width: '6px',
          height: '6px'
        }}
      />
      <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default CommonTitle;

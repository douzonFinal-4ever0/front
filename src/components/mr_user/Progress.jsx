import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Progress = ({ open, handleClose }) => {
  const { pathname } = useLocation();
  return (
    <Backdrop
      sx={{ color: '#eee', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '40px',
          alignItems: 'center'
        }}
      >
        {pathname === '/mr/dashboard' ? (
          <Typography variant="h4" sx={{ color: '#fff' }}>
            최적의 회의실 탐색 중.. 🧐
          </Typography>
        ) : null}

        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  );
};

export default Progress;

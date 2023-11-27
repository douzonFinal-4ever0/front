import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import RectangleBtn from '../common/RectangleBtn';
import DangerousIcon from '@mui/icons-material/Dangerous';

const CarDeleteModal = ({
  style,
  handleDeleteModalClose,
  handleDeleteBtn,
  buttonText,
  title,
  children
}) => {
  return (
    <Box sx={{ ...style, width: 400 }}>
      <Container width="100%" height="auto" sx={{ padding: '15px' }}>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          marginBottom="20px"
        >
          <DangerousIcon
            sx={{ width: '80px', height: '80px', color: '#c62828' }}
          />
        </Box>

        <Typography variant="h5" align="center">
          {title}
        </Typography>
        <Typography align="center">{children}</Typography>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          marginTop="20px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            width="140px"
            height="36px"
          >
            <RectangleBtn
              text={buttonText}
              category={'delete'}
              sx={{ width: '64px' }}
              handlebtn={handleDeleteBtn}
            />
            <RectangleBtn
              text={'취소'}
              category={'cancel'}
              sx={{ width: '64px' }}
              handlebtn={handleDeleteModalClose}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CarDeleteModal;

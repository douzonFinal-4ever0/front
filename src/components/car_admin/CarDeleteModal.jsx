import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import RectangleBtn from '../common/RectangleBtn';
import DangerousIcon from '@mui/icons-material/Dangerous';

const CarDeleteModal = ({ style, handleDeleteModalClose }) => {
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
          차량 삭제
        </Typography>
        <Typography align="center">
          정말로 선택한 차량을 삭제하시겠습니까?
          <br />
          삭제된 차량은 삭제된 차량에서 조회할 수 있습니다.
        </Typography>
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
              text={'삭제'}
              category={'modify'}
              sx={{ width: '64px' }}
              handlebtn={handleDeleteModalClose}
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

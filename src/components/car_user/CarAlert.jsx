import { Alert, Box, AlertTitle } from '@mui/material';

const CarAlert = ({ open }) => {
  //차량 상세 정보
  const carDetail = () => {};
  return (
    <div>
      <Alert
        open={open}
        onClose={carDetail} //차량을 선택하면 해당 차량 정보를 가져온다 useState로 설정 set으로 설정해서
        severity="info" // 'error', 'warning', 'info', 'success' 중 선택
        closeText="확인"
      >
        <AlertTitle>확인</AlertTitle>
        해당 차량을 선택하시겠습니까?
      </Alert>
    </div>
  );
};

export default CarAlert;

import { Box } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import DouzoneLogo from '../../assets/images/logo/douzone_logo.png';

const QRcode = ({ srcValue }) => {
  // 추후 data에 회의실 예약 정보 가져와서
  return (
    <Box>
      <QRCodeCanvas
        value={srcValue}
        includeMargin={true} //QR 테두리 여부
        bgColor="transparent"
        fgColor={'#333'} //QR색
        size={250}
        imageSettings={{
          width: 100,
          height: 30,
          src: DouzoneLogo
        }}
      />
    </Box>
  );
};

export default QRcode;

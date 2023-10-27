import { Chip } from '@mui/material';
import { useParams } from 'react-router-dom';

const CreateChip = ({ params }) => {
  if (useParams === '1') {
    return <Chip label="미처리" color="primary" variant="outlined" />;
  }
  if (params === '2') {
    return <Chip label="확정" color="success" variant="outlined" />;
  }
  if (params === '3') {
    return <Chip label="완료" variant="outlined" />;
  }
  if (params === '4') {
    return <Chip label="취소" color="error" variant="outlined" />;
  }
};
export default CreateChip;

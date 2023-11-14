import { Chip } from '@mui/material';
import { useParams } from 'react-router-dom';

const CreateChip = ({ params }) => {
  if (params === '1') {
    return (
      <Chip
        label="미처리"
        sx={{ color: '#f9a825', borderColor: '#f9a825' }}
        variant="outlined"
      />
    );
  }
  if (params === '2') {
    return <Chip label="취소" color="error" variant="outlined" />;
  }
  if (params === '3') {
    return <Chip label="확정" color="success" variant="outlined" />;
  }
  if (params === '4') {
    return <Chip label="운행중" color="primary" variant="outlined" />;
  }
  if (params === '5') {
    return <Chip label="완료" variant="outlined" />;
  }
};
export default CreateChip;

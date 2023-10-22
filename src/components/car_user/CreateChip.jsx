import { Chip } from '@mui/material';

const CreateChip = ({ params }) => {
  if (params === '1') {
    return <Chip label="확정" color="success" variant="outlined" />;
  }
  if (params === '2') {
    return <Chip label="완료" color="primary" variant="outlined" />;
  }
  if (params === '3') {
    return <Chip label="취소" color="error" variant="outlined" />;
  }
};
export default CreateChip;

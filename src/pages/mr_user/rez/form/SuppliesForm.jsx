import RectangleBtn from '../../../../components/common/RectangleBtn';
import { palette } from '../../../../theme/palette';

const SuppliesForm = () => {
  return (
    <RectangleBtn
      type={'button'}
      text={'장비 추가'}
      sx={{ padding: '14px 12px', backgroundColor: palette.grey['500'] }}
    />
  );
};

export default SuppliesForm;

import RectangleBtn from '../../../../components/mr_user/RectangleBtn';
import { palette } from '../../../../theme/palette';

const InnerPtForm = () => {
  return (
    <>
      <RectangleBtn
        type={'button'}
        text={'참석자 추가'}
        sx={{ padding: '14px 12px', backgroundColor: palette.grey['500'] }}
      />
    </>
  );
};

export default InnerPtForm;

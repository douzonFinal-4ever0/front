import { useState } from 'react';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import { palette } from '../../../../theme/palette';
import Modal from '../../../../components/common/Modal';
import InnerPtModalContent from '../modal/InnerPtModalContent';

const InnerPtForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleInnerPtBtn = () => {
    setOpenModal(!openModal);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <RectangleBtn
        type={'button'}
        text={'참석자 추가'}
        sx={{ padding: '14px 12px', backgroundColor: palette.grey['500'] }}
        handlebtn={handleInnerPtBtn}
      />
      <Modal
        open={openModal}
        handleModal={handleModal}
        modalTitle={'참석자 추가'}
        content={<InnerPtModalContent />}
      />
    </>
  );
};

export default InnerPtForm;

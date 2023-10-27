import { useState } from 'react';
import axios from 'axios';

import RectangleBtn from '../../../../components/common/RectangleBtn';
import { palette } from '../../../../theme/palette';
import Modal from '../../../../components/common/Modal';
import InnerPtModalContent from '../modal/InnerPtModalContent';
import { convertDataTree } from '../../../../utils/ConvertDataTree';

const InnerPtForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [members, setMembers] = useState([]);

  const handleInnerPtBtn = async () => {
    const res = await axios.get('/mr/mem');
    const memList = convertDataTree(res.data); // 사원 리스트
    setMembers(memList);
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
        content={<InnerPtModalContent list={members} />}
      />
    </>
  );
};

export default InnerPtForm;

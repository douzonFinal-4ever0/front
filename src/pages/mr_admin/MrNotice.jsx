import React from 'react';
import Editor from '../../components/mr_admin/Editor';
import SubHeader from '../../components/common/SubHeader';
import { Paper, styled, Button, Stack } from '@mui/material';
import { useState } from 'react';
import OnOffSwitch from '../../components/mr_admin/OnOffSwitch';
import axios from 'axios';
const MrNotice = () => {
  const [editorData, setEditorData] = useState('');
  const [isPublic, setIsPublic] = useState(true); // OnOff 스위치의 상태를 관리
  const handleSwitchChange = (event) => {
    setIsPublic(event.target.checked);
  };
  const FormtoData = {
    contents: editorData,
    is_opened: isPublic ? 0 : 1
  };
  const handleClick = () => {
    axios.post('http://localhost:8081/mr/notice', FormtoData).then(() => {
      alert('공지사항이 등록되었습니다.');
    });
    // console.log('텍스트:' + editorData);
    // console.log('공개 여부: ' + isPublic); // OnOff 스위치 상태 출력
  };
  return (
    <Item>
      <SubHeader title={'공지사항'} />
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <OnOffSwitch checked={isPublic} onChange={handleSwitchChange} />
        <Button variant="text" onClick={handleClick}>
          작성 완료
        </Button>
      </Stack>
      <Editor onEditorChange={(data) => setEditorData(data)} />
    </Item>
  );
};

export default MrNotice;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%'
}));

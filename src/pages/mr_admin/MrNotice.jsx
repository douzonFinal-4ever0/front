import React from 'react';
import Editor from '../../components/mr_admin/Editor';
import SubHeader from '../../components/common/SubHeader';
import {
  Paper,
  styled,
  Button,
  Stack,
  Box,
  TextField,
  Container,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { useState } from 'react';
import OnOffSwitch from '../../components/mr_admin/OnOffSwitch';
import axios from 'axios';
import SubSidebar from '../../components/common/SubSidebar';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../../components/common/RectangleBtn';
import { useEffect } from 'react';
const MrNotice = () => {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState('');
  const [isPublic, setIsPublic] = useState(true); // OnOff 스위치의 상태를 관리
  const [notice_title, setNotice_title] = useState('');
  const [template, setTemplate] = useState([]);

  const handleSwitchChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const FormtoData = {
    contents: editorData,
    is_opened: isPublic ? 0 : 1,
    notice_title
  };
  const handleClick = () => {
    axiosInstance.post('/mr/notice', FormtoData).then(() => {
      alert('공지사항이 등록되었습니다.');
      navigate('../NoticeList');
    });
    // console.log('텍스트:' + editorData);
    // console.log('공개 여부: ' + isPublic); // OnOff 스위치 상태 출력
  };

  const handleSelectChange = (event) => {
    // setMrType(event.target.value);
  };

  useEffect(() => {
    axiosInstance.get('/mr/template').then((res) => {
      console.log(res.data);
      setTemplate(res.data);
    });
  }, []);
  return (
    <>
      <SubHeader title={'공지사항 작성'} />
      <Box sx={{ display: 'flex' }}>
        <MainContainer>
          <WrapContainer bgcolor={'#fff'}>
            <Container sx={{ width: 'auto' }}>
              <TextField
                id="outlined-basic"
                label="제목"
                variant="outlined"
                sx={{ width: '100%', backgroundColor: '#f5f5f5' }}
                placeholder="제목을 입력하세요"
                onChange={(e) => {
                  setNotice_title(e.target.value);
                }}
              />
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <OnOffSwitch checked={isPublic} onChange={handleSwitchChange} />
                {/* <Select
                  value={template}
                  placeholder="탬플릿"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="미팅룸">미팅룸</MenuItem>
                  <MenuItem value="소회의실">소회의실</MenuItem>
                  <MenuItem value="중회의실">중회의실</MenuItem>
                  <MenuItem value="대회의실">대회의실</MenuItem>
                </Select> */}

                <RectangleBtn
                  category={'register'}
                  type={'submit'}
                  text={'작성 완료'}
                  sx={{
                    padding: '14px 12px',
                    margin: '1px',
                    width: '100px'
                  }}
                  handlebtn={handleClick}
                />
              </Stack>

              <Editor onEditorChange={(data) => setEditorData(data)} />
            </Container>
          </WrapContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default MrNotice;

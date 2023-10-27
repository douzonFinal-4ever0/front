import React from 'react';
import Editor from '../../components/mr_admin/Editor';
import SubHeader from '../../components/common/SubHeader';
import {
  Box,
  TextField,
  Container,
  Select,
  MenuItem,
  FormControl,
  Grid
} from '@mui/material';
import { useState } from 'react';
import OnOffSwitch from '../../components/mr_admin/OnOffSwitch';
import MainContainer from '../../components/mr_user/MainContainer';
import WrapContainer from '../../components/mr_user/WrapContainer';
import { Form, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.js';
import RectangleBtn from '../../components/common/RectangleBtn';
import Selectbox from '../../components/common/Selectbox';
import styled from 'styled-components';
import Label from '../../components/common/Label';
const MrNotice = () => {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState('');
  const [isPublic, setIsPublic] = useState(true); // OnOff 스위치의 상태를 관리
  const [notice_title, setNotice_title] = useState('');
  const [template, setTemplate] = useState('');

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
    setTemplate(event.target.value);
  };

  const templateOptions = [
    {
      index: 'NT001',
      key: 'NT001',
      value:
        '<h2>안녕하세요, OOO입니다.</h2><p>최근 특정 요일에 회의실이 몰리는 것을 확인했습니다.</p><p>이에 회의실 OOO을 추가했습니다.</p><p>위치는 OOO에 있습니다.</p><p>많은 사용 부탁드립니다.</p><p>감사합니다.&nbsp;</p>'
    }
  ];
  // useEffect(() => {
  //   axiosInstance.get('/mr/template').then((res) => {
  //     console.log(res.data);
  //     setTemplate(res.data);
  //   });
  // }, []);
  return (
    <>
      <SubHeader title={'공지사항 작성'} />
      <MainContainer>
        <WrapContainer bgcolor={'#fff'}>
          <Grid container spacing={1} sx={{ display: 'flex' }}>
            <Grid item container spacing={2}>
              {/* <StyledLabelGrid item xs={1}>
                <Label htmlFor={'title'} text={'제목'} />
              </StyledLabelGrid> */}
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <OnOffSwitch checked={isPublic} onChange={handleSwitchChange} />
              </Grid>
              <Grid item xs={5} sx={{ width: '100%' }}>
                {/* <FormControl>
                  <Select
                    value={notice_title}
                    placeholder="탬플릿"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="미팅룸">미팅룸</MenuItem>
                    <MenuItem value="소회의실">소회의실</MenuItem>
                    <MenuItem value="중회의실">중회의실</MenuItem>
                    <MenuItem value="대회의실">대회의실</MenuItem>
                  </Select>
                </FormControl> */}
              </Grid>
              <Grid item xs={1}>
                <RectangleBtn
                  category={'register'}
                  type={'submit'}
                  text={'작성 완료'}
                  sx={{
                    width: '100%'
                  }}
                  handlebtn={handleClick}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor onEditorChange={(data) => setEditorData(data)} />
              </Grid>
            </Grid>
          </Grid>
        </WrapContainer>
      </MainContainer>
    </>
  );
};

export default MrNotice;
// index,value
const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));

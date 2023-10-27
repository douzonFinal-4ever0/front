import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Input,
  Paper,
  TextField,
  styled
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../../components/common/Label';
import LogoImage from '../../assets/images/logo/logo.png';
import RectangleBtn from '../../components/common/RectangleBtn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jwt, setJwt] = useState('');
  const navigate = useNavigate();
  const FormToData = {
    email,
    password
  };
  /**로그인 할때 쓰는 핸들러 */
  const handleLogin = () => {
    axiosInstance.post('/api/v1/user/login', FormToData).then((res) => {
      setJwt('Bearer ' + res.data.token);
      console.log(res.data);
    });
  };
  // JWT 토큰을 localStorage에 저장
  localStorage.setItem('jwtToken', jwt);
  if (jwt != '') {
    if (jwt != 'Bearer undefined') {
      navigate('/mr/dashboard');
    }
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        justifyItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '10px',
        height: '100%',
        width: '500px'
      }}
    >
      <Paper elevation={3} sx={{ padding: '15px', height: '600px' }}>
        <StyledLogo>
          <StyledLogoImage src={LogoImage} alt="logo" />
        </StyledLogo>

        <Grid container spacing={2} mt={6}>
          <Grid item container spacing={4}>
            {/* <StyledLabelGrid item xs={3}>
              <Label htmlFor={'email'} text={'이메일'} />
            </StyledLabelGrid> */}
            <Grid item xs={12}>
              <TextField
                id="email"
                variant="outlined"
                value={email}
                label="email"
                placeholder="이메일을 입력하세요"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            {/* <StyledLabelGrid item xs={3}>
              <Label htmlFor={'password'} text={'비밀번호'} />
            </StyledLabelGrid> */}
            <Grid item xs={12}>
              <TextField
                id="password"
                variant="outlined"
                value={password}
                label="password"
                placeholder="비밀번호를 입력하세요"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox />
              <span>로그인 기억하기</span>
            </Grid>
            <Grid item xs={12}>
              <RectangleBtn
                category={'register'}
                type={'submit'}
                text={'로그인'}
                sx={{
                  padding: '14px 12px'
                }}
                handlebtn={handleLogin}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
const StyledLabelGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));

const StyledLogoImage = styled('img')({
  width: '200px',
  height: 'auto', // 이미지 높이를 자동 조정하여 가로 중앙 정렬 유지
  marginBottom: '25px',
  marginTop: '25px'
});

const StyledLogo = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex', // 수평 가운데 정렬을 위해 flex 사용
  justifyContent: 'center', // 수평 가운데 정렬
  alignItems: 'center', // 수직 가운데 정렬
  borderBottom: '1px solid lightgrey'
}));

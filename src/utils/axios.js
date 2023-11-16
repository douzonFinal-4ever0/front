import axios from 'axios';

// JWT 토큰을 가져오는 함수
const getJwtToken = () => {
  return localStorage.getItem('jwtToken');
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081', // API의 기본 URL
  // baseURL: 'http://192.168.0.177:8081', // API의 기본 URL 시연할 경우에 쓸 url
  headers: {
    Authorization: getJwtToken()
  }
});
const Img = axios.create({
  baseURL: 'http://localhost:8081', // API의 기본 URL
  headers: {
    Authorization: getJwtToken(),
    'Content-Type': 'multipart/form-data', // 이미지 업로드를 위한 설정
    'Access-Control-Allow-Origin': '*' // 필요에 따라 추가 설정
  }
});

// Request 인터셉터: 모든 요청에 JWT 토큰을 추가
// axiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers['Authorization'] = getJwtToken();
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default { axiosInstance, Img };

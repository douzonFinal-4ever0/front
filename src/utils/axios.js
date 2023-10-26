import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081' // API의 기본 URL
});

// JWT 토큰을 가져오는 함수
const getJwtToken = () => {
  return localStorage.getItem('jwtToken');
};

// Request 인터셉터: 모든 요청에 JWT 토큰을 추가
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = getJwtToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

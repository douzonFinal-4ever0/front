import { Backdrop, Box, CircularProgress } from '@mui/material';
import * as React from 'react';

const Spinner = ({ isLoading }) => {
  /**isLoading 으로 추가 */
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   // 여기에서 데이터를 가져오거나 비동기 작업을 수행
  //   // 데이터 로딩이 완료되면 setIsLoading(false)를 호출하여 스피너를 숨김
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // 3초 후에 로딩 완료로 설정 (예제용)
  // }, []);
  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </Backdrop>
      ) : (
        <></>
      )}
    </>
  );
};

export default Spinner;

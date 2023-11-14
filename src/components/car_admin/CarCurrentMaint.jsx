import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import ErrorIcon from '@mui/icons-material/Error';

const CarCurrentMaint = ({ carCode, handleMaintClick }) => {
  const [currentMaintList, setCurrentMaintList] = useState([]);
  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/manager/car/currentMaint', {
        params: {
          car_code: carCode
        }
      })
      .then((res) => {
        console.log(res.data);
        const newData = res.data.map((item) => {
          item.accum_mileage =
            item.accum_mileage === null ? 0 : item.accum_mileage;
          item.mileage = item.mileage === null ? 0 : item.mileage;
          return {
            maint_item_code: item.maint_item_code,
            title: item.maint_name,
            cycle: item.cycle,
            value: ((item.accum_mileage - item.mileage) / item.cycle) * 100,
            over: item.accum_mileage - (item.mileage + item.cycle)
          };
        });
        console.log(newData);
        setCurrentMaintList(newData);
      });
  }, []);

  return (
    <Box width="500px" maxHeight="650px">
      <Stack sx={{ flexGrow: 1 }}>
        <Typography
          textAlign="center"
          marginTop="30px"
          height="40px"
          variant="subtitle1"
        >
          정비 목록
        </Typography>
        <Box
          display="flex"
          sx={{ backgroundColor: '#eeeeee' }}
          padding="15px 25px"
        >
          <Typography variant="subtitle2" width="50%">
            내용
          </Typography>
          <Typography variant="subtitle2" width="50%">
            정비 주기
          </Typography>
        </Box>
        {currentMaintList.map((item) => {
          return (
            <StyledStack
              onClick={() => {
                handleMaintClick(item.maint_item_code);
              }}
            >
              <Box display="flex" padding="5px 0px">
                <Typography variant="body2" width="50%">
                  {item.title}
                </Typography>
                <Typography variant="body2" width="50%">
                  {`${item.cycle}km 마다 교체`}
                </Typography>
              </Box>
              <BorderLinearProgress
                variant="determinate"
                value={item.value > 100 ? 100 : item.value}
                customColor={item.value > 50 ? '#e53935' : '#66bb6a'}
              />
              {item.over >= 0 && (
                <Box display="flex" justifyContent="end" padding="0px 7px">
                  <ErrorIcon
                    sx={{
                      width: '20px',
                      color: '#ffa000',
                      marginRight: '5px'
                    }}
                  />
                  <Typography variant="subtitle2" color="#e53935">
                    {item.over}km 초과
                  </Typography>
                </Box>
              )}
            </StyledStack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default CarCurrentMaint;

const BorderLinearProgress = styled(LinearProgress)(
  ({ theme, customColor }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[400]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: customColor
    }
  })
);

const StyledStack = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: '4px',
  padding: '10px 15px',
  margin: '10px 10px',
  transition: 'box-shadow 0.3s', // 트랜지션 추가
  '&:hover': {
    backgroundColor: '#f5f5f5',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)' // 호버 시 그림자 변경
  }
}));

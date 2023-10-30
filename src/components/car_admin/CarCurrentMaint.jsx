import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';
import { Stack, Typography } from '@mui/material';

const CarCurrentMaint = () => {
  const currentMaintList = [
    { title: '엔진오일 및 필터', cycle: 10000, value: 23.5 },
    { title: '에어컨 필터', cycle: 10000, value: 23.5 },
    { title: '와이어 블레이드', cycle: 10000, value: 23.5 },
    { title: '구동 벨트', cycle: 10000, value: 23.5 }
  ];

  return (
    <Box width="500px">
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
            <Stack padding="20px 25px">
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
                value={item.value}
                customColor="#ef5350"
              />
            </Stack>
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

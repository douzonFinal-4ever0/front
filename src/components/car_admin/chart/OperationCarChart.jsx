import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled
} from '@mui/material';
import { Box } from '@mui/system';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';
import axiosInstance from '../../../utils/axios';
import { useState, useEffect } from 'react';
import Looks3Icon from '@mui/icons-material/Looks3';

const setColor = (value) => {
  if (value >= 80) {
    return '';
  } else if (value > 50) {
    return '';
  } else {
    return '';
  }
};

const OperationCarChart = () => {
  const [operationCarData, setOperationCarData] = useState({
    totalCount: 0,
    operationCarCount: 0,
    maxOperCar: []
  });

  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/manager/car/operationStatis')
      .then((res) => {
        setOperationCarData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <StyledBox>
        <Typography variant="h3" marginRight="3px">
          🚗
        </Typography>
        <Typography variant="h6">운행 차량</Typography>
      </StyledBox>
      <Box sx={{ display: 'flex', margin: '0px 20px', alignItems: 'center' }}>
        <Typography variant="h3" color="#333333" margin="0px 10px">
          {operationCarData.operationCarCount}
        </Typography>
        <Typography variant="h4" color="#999999">
          {`/ ${operationCarData.totalCount}`}
        </Typography>
      </Box>
      <Box padding="10px 25px">
        <BorderLinearProgress
          variant="determinate"
          value={
            (operationCarData.operationCarCount / operationCarData.totalCount) *
            100
          }
          customColor={'#01579b'}
        />
      </Box>
      <Box sx={{ margin: '3px 20px' }}>
        <Box display="flex">
          <Typography variant="subtitle2">운행 차량 TOP</Typography>
          <Typography variant="subtitle2" color="primary">
            <Looks3Icon />
          </Typography>
        </Box>
        <List sx={{ padding: '0px' }}>
          {operationCarData.maxOperCar.map((item) => (
            <ListItem sx={{ justifyContent: 'flex-end', padding: '3px 16px' }}>
              <Typography variant="subtitle2">{item.car_code}</Typography>
              <Typography
                variant="caption"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '90px', // 원하는 최대 너비 설정
                  margin: '0px 10px'
                }}
              >
                {item.car_name}
              </Typography>
              <Chip label={`${item.count}건`} size="small" color="primary" />
            </ListItem>
          ))}
        </List>
      </Box>
      <StyledSubBox>
        <Typography variant="h4">💡</Typography>
        <Typography variant="subtitle2">
          {`총 ${operationCarData.totalCount}대의 차량 중 ${operationCarData.operationCarCount}대를 운행했습니다.`}
        </Typography>
      </StyledSubBox>
    </>
  );
};

export default OperationCarChart;

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  margin: '15px 20px',
  alignItems: 'center'
}));

const StyledSubBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  marginTop: 'auto',
  marginRight: '20px',
  marginLeft: '20px',
  paddingBottom: '20px',
  alignItems: 'center'
}));

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

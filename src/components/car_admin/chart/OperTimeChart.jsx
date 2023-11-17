import {
  Box,
  Grid,
  ListItem,
  ListItemIcon,
  Typography,
  styled
} from '@mui/material';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../../../utils/axios';
import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Circle } from '@mui/icons-material';

const OperTimeChart = () => {
  const labels = ['차량 운행 시간', '전체 근무 시간'];
  const [series, setSeries] = useState([]);
  const [totalOperTime, setTotalOperTime] = useState(0);

  useEffect(() => {
    axiosInstance.axiosInstance
      .get('/manager/car/getOperTimeStatistics')
      .then((res) => {
        console.log(res.data);
        setSeries([
          res.data.percent.toFixed(3) * 100,
          (1 - res.data.percent.toFixed(3)) * 100
        ]);
        setTotalOperTime(res.data.totalOperTime);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const state = {
    options: {
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            size: '65%'
          }
        }
      },
      legend: {
        show: false
      },
      colors: ['#0277bd', '#9e9e9e'],
      tooltip: {
        style: {
          fontSize: '14px',
          fontFamily: undefined
        },
        y: {
          title: {
            formatter: (seriesName, index) => {
              return labels[index.seriesIndex];
            }
          }
        }
      }
    },
    series: series,
    labels: labels
  };

  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <StyledBox>
            <Typography variant="h4" marginRight="3px">
              🕒
            </Typography>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
              이번주 총 운행 시간
            </Typography>
          </StyledBox>
          <Box sx={{ margin: '50px 20px' }}>
            <Typography variant="h4" color="#333333" margin="0px 10px">
              {`총 ${totalOperTime}시간`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={7} paddingTop="25px">
          <Box className="donut" sx={{ paddingRight: '30px' }}>
            <Chart
              options={state.options}
              series={state.series}
              height={220}
              type="donut"
              width="100%"
            />
          </Box>
        </Grid>
      </Grid>
      <List sx={{ width: '50%', margin: 'auto', padding: '0px' }}>
        {labels.map((item, index) => (
          <ListItem
            disablePadding
            sx={{
              '& .MuiListItemIcon-root': { minWidth: '40px' },
              '& .MuiListItemText-root': { display: 'flex' }
            }}
          >
            <ListItemIcon>
              <Circle
                sx={{
                  width: '12px !important',
                  color: index === 0 ? '#0277bd' : '#9e9e9e'
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={item}
              secondary={`${series[index]}건`}
              secondaryTypographyProps={{ marginLeft: '10px' }}
              primaryTypographyProps={{
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OperTimeChart;

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

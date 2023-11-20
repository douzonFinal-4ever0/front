import {
  Box,
  Grid,
  Typography,
  styled,
  ListItem,
  ListItemIcon
} from '@mui/material';
import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../../../utils/axios';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { formatNumber } from '../../../utils/formatNumber';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Circle } from '@mui/icons-material';

const ExpenditureChart = ({ searchData }) => {
  const labels = ['통행료', '주차비', '유류비', '정비'];
  const [series, setSeries] = useState([]);
  const [totalExpenditure, setTotalExpenditure] = useState(0);

  useEffect(() => {
    console.log(searchData);
    axiosInstance.axiosInstance
      .post('/manager/car/getExpenditureStatistics', searchData)
      .then((res) => {
        console.log(res.data);
        const tempData = Array(labels.length).fill(0);

        res.data.expenditureDTOS.forEach((item) => {
          const index = labels.indexOf(item.ac_detail);
          if (index !== -1) {
            tempData[index] += item.cost;
          }
        });

        setSeries(tempData);
        setTotalExpenditure(res.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchData]);

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
      colors: ['#0277bd', '#9e9e9e', '#9cb287', '#e87676'],
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
            <Typography
              height="48px"
              display="flex"
              marginRight="6px"
              alignItems="center"
            >
              <AttachMoneyIcon />
            </Typography>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
              총 지출
            </Typography>
          </StyledBox>
          <Box sx={{ margin: '50px 20px' }}>
            <Typography variant="h6" color="#333333" margin="0px 10px">
              {`총 ${formatNumber(totalExpenditure)}원`}
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
        <List sx={{ width: '80%', margin: 'auto', padding: '0px' }}>
          <Grid container>
            {labels.map((item, index) => (
              <Grid item xs={6}>
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
                        color: `${state.options.colors[index]}`
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    secondary={`${formatNumber(parseInt(series[index]))}원`}
                    secondaryTypographyProps={{ marginLeft: '10px' }}
                    primaryTypographyProps={{
                      fontSize: '13px',
                      fontWeight: 'bold'
                    }}
                  />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </List>
      </Grid>
    </>
  );
};

export default ExpenditureChart;

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

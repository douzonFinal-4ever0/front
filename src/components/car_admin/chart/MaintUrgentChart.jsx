import {
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  styled
} from '@mui/material';
import { Box } from '@mui/system';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../../utils/axios';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from 'react-router-dom';

const MaintUrgentChart = ({ searchData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [maintStatisticsData, setMaintStatisticsData] = useState([]);

  useEffect(() => {
    axiosInstance.axiosInstance
      .post('/manager/car/getMaintStatistics', searchData)
      .then((res) => {
        console.log(res.data);
        setMaintStatisticsData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchData]);

  return (
    <>
      {!isLoading && (
        <>
          <Grid container height="80%">
            <Grid item xs={3}>
              <StyledBox>
                <Typography variant="h3" marginRight="3px">
                  🚨
                </Typography>
                <Typography variant="h6">빠른 정비 필요</Typography>
              </StyledBox>
              <CardContent sx={{ margin: '40px 0px 0px 20px' }}>
                <Grid container sx={{ width: '100%' }}>
                  <Grid item xs={6} textAlign="center">
                    <Typography gutterBottom variant="h5" component="div">
                      초과
                    </Typography>
                    <Typography va riant="body2" color="text.secondary">
                      {
                        maintStatisticsData.filter((item) => item.type === 1)
                          .length
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="center">
                    <Typography gutterBottom variant="h5" component="div">
                      주의
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {
                        maintStatisticsData.filter((item) => item.type === 2)
                          .length
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <Grid item xs={4.5}>
              <Box
                sx={{
                  width: '100%',
                  margin: '20px 20px',
                  alignItems: 'center'
                }}
              >
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 450,
                    margin: '5px 0px',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: '300px',
                    '& ul': { padding: 0 },
                    '& li': { padding: 0 }
                  }}
                  subheader={
                    <ListSubheader
                      sx={{
                        backgroundColor: '#ffccbc',
                        paddingLeft: '20px !important',
                        borderRadius: '4px',
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      정비 주기 초과 차량
                    </ListSubheader>
                  }
                >
                  {maintStatisticsData
                    .filter((item) => item.type === 1)
                    .sort((a, b) => b.count - a.count)
                    .map((item, index) => (
                      <ListItem alignItems="center">
                        <ListItemIcon>
                          <Typography variant="h6">{index + 1}</Typography>
                        </ListItemIcon>
                        <ListItemText
                          secondary={
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="caption"
                              color="text.primary"
                            >
                              {item.car_name}
                            </Typography>
                          }
                        >
                          <Typography variant="subtitle2">
                            {item.car_code}
                          </Typography>
                        </ListItemText>
                        <Chip label={`${item.count}건`} />
                      </ListItem>
                    ))}

                  <Divider variant="inset" component="li" />
                </List>
              </Box>
            </Grid>
            <Grid item xs={4.5}>
              <Box
                sx={{
                  width: '100%',
                  margin: '20px 0px',
                  alignItems: 'center'
                }}
              >
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 450,
                    margin: '5px 0px',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    height: '300px',
                    '& ul': { padding: 0 },
                    '& li': { padding: 0 }
                  }}
                  subheader={
                    <ListSubheader
                      sx={{
                        backgroundColor: '#eeeeee',
                        paddingLeft: '20px !important',
                        borderRadius: '4px',
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      주의 차량
                    </ListSubheader>
                  }
                >
                  {maintStatisticsData
                    .filter((item) => item.type === 2)
                    .sort((a, b) => b.count - a.count)
                    .map((item, index) => (
                      <ListItem alignItems="center">
                        <ListItemIcon>
                          <Typography variant="h6">{index + 1}</Typography>
                        </ListItemIcon>
                        <ListItemText
                          secondary={
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="caption"
                              color="text.primary"
                            >
                              {item.car_name}
                            </Typography>
                          }
                        >
                          <Typography variant="subtitle2">
                            {item.car_code}
                          </Typography>
                        </ListItemText>
                        <Chip label={`${item.count}건`} />
                      </ListItem>
                    ))}
                  <Divider variant="inset" component="li" />
                </List>
              </Box>
            </Grid>
          </Grid>
          <StyledSubBox>
            <LinkIcon marginRight="10px" />
            <Link to="/car/admin/carManage">정비 등록 바로가기</Link>
          </StyledSubBox>
        </>
      )}
    </>
  );
};

export default MaintUrgentChart;

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  margin: '20px 20px',
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

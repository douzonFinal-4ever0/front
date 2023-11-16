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

const MaintUrgentChart = () => {
  return (
    <>
      <Grid container height="80%">
        <Grid item xs={5}>
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
                  12
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <Typography gutterBottom variant="h5" component="div">
                  주의
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  12
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ margin: '20px 20px', width: '90%' }}>
            <List
              sx={{
                width: '100%',
                maxWidth: 450,
                margin: '5px 0px',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 150,
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
              <ListItem alignItems="center">
                <ListItemIcon>
                  <Typography variant="h6">1</Typography>
                </ListItemIcon>
                <ListItemText
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="caption"
                      color="text.primary"
                    >
                      아반떼
                    </Typography>
                  }
                >
                  <Typography variant="subtitle2">11가1234</Typography>
                </ListItemText>
                <Chip label="3건" />
              </ListItem>
              <ListItem alignItems="center">
                <ListItemIcon>
                  <Typography variant="h6">2</Typography>
                </ListItemIcon>
                <ListItemText
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="caption"
                      color="text.primary"
                    >
                      아반떼
                    </Typography>
                  }
                >
                  <Typography variant="subtitle2">11가1234</Typography>
                </ListItemText>
                <Chip label="3건" />
              </ListItem>
              <ListItem alignItems="center">
                <ListItemIcon>
                  <Typography variant="h6">3</Typography>
                </ListItemIcon>
                <ListItemText
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="caption"
                      color="text.primary"
                    >
                      아반떼
                    </Typography>
                  }
                >
                  <Typography variant="subtitle2">11가1234</Typography>
                </ListItemText>
                <Chip label="3건" />
              </ListItem>
              <ListItem alignItems="center">
                <ListItemIcon>
                  <Typography variant="h6">4</Typography>
                </ListItemIcon>
                <ListItemText
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="caption"
                      color="text.primary"
                    >
                      아반떼
                    </Typography>
                  }
                >
                  <Typography variant="subtitle2">11가1234</Typography>
                </ListItemText>
                <Chip label="3건" />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
            <List
              sx={{
                width: '100%',
                maxWidth: 450,
                margin: '5px 0px',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 150,
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
              <ListItem
                alignItems="center"
                sx={{ padding: '0px', height: 'auto' }}
              >
                <ListItemIcon>
                  <Typography variant="subtitle2">1</Typography>
                </ListItemIcon>
                <ListItemText
                  primary="111가1234"
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      아반떼
                    </Typography>
                  }
                />
                <Chip label="3건" />
              </ListItem>
              <ListItem alignItems="center">
                <ListItemIcon>
                  <Typography variant="h6">2</Typography>
                </ListItemIcon>
                <ListItemText
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="caption"
                      color="text.primary"
                    >
                      아반떼
                    </Typography>
                  }
                >
                  <Typography variant="subtitle2">11가1234</Typography>
                </ListItemText>
                <Chip label="3건" />
              </ListItem>
              <ListItem alignItems="center">
                <ListItemIcon>
                  <Typography variant="h6">3</Typography>
                </ListItemIcon>
                <ListItemText
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="caption"
                      color="text.primary"
                    >
                      아반떼
                    </Typography>
                  }
                >
                  <Typography variant="subtitle2">11가1234</Typography>
                </ListItemText>
                <Chip label="3건" />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Box>
        </Grid>
      </Grid>
      <StyledSubBox>
        <Typography variant="h4">💡</Typography>
        <Typography variant="subtitle2">
          총 ㅁㅁ대의 차량 중 11대를 운행했습니다.
        </Typography>
      </StyledSubBox>
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

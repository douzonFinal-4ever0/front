import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';

const AlarmList = ({ alarmDatas, clickAlarm, read }) => {
  let cnt = 0;
  return (
    <List
      dense
      component="div"
      role="list"
      sx={{ minWidth: '400px', maxHeight: '700px' }}
    >
      {alarmDatas &&
        alarmDatas.map((alarmData) => {
          if (alarmData.is_read === read) {
            cnt++;
          }
        })}
      {(alarmDatas !== null) & (cnt != 0) ? (
        // console.log(alarmDatas);
        alarmDatas.map((alarmData) => {
          if (alarmData.is_read === read) {
            cnt++;
            return (
              <ListItem onClick={() => clickAlarm(alarmData.alert_code)}>
                <ListItemButton>
                  <ListItemText
                    primary={`${alarmData.contents}`}
                    secondary={`${alarmData.alert_at}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          }
        })
      ) : read === 0 ? (
        <Typography sx={{ p: 2 }}>새로운 알림이 없습니다.</Typography>
      ) : (
        <Typography sx={{ p: 2 }}>알림 내역이 없습니다.</Typography>
      )}
    </List>
  );
};

export default AlarmList;

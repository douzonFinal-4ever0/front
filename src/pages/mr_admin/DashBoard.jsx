import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MrNotice from './MrNotice';
import SubHeader from '../../components/common/SubHeader';
import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import TimeField from '../../components/common/TimeField';

const DashBoard = () => {
  const [selectedDays, setSelectedDays] = useState([
    '월',
    '화',
    '수',
    '목',
    '금'
  ]); // 배열로 선택된 요일을 저장
  const [showTimeField, setShowTimeField] = useState(false); // 기간 선택을 보여줄지 여부
  const [value, setValue] = useState('종일');
  const [checked, setChecked] = React.useState(false);

  const handleDayToggle = (day) => {
    let newSelectedDays;
    if (selectedDays.includes(day)) {
      // 이미 선택된 요일인 경우, 선택 해제
      newSelectedDays = selectedDays.filter(
        (selectedDay) => selectedDay !== day
      );
    } else {
      // 선택되지 않은 요일인 경우, 선택
      newSelectedDays = [...selectedDays, day];
    }

    setSelectedDays(newSelectedDays);

    // 선택된 요일을 출력
    console.log('선택된 요일: ', newSelectedDays);
  };
  const toggleTimeField = () => {
    setShowTimeField(!showTimeField); // 상태를 토글하여 보이기/숨기기
  };
  const handleChange = (event) => {
    setValue(event.target.value);
    setChecked((prev) => !prev);
    if (event.target.value === '기간 선택') {
      setShowTimeField(true);
    } else {
      setShowTimeField(false);
    }
  };
  return (
    <Item>
      <Stack spacing={1}>
        <TextField id="outlined-basic" label="회의실명" variant="outlined" />
        <TextField id="outlined-basic" label="위치" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="최대 수용 인원"
          variant="outlined"
        />
        <Grid container spacing={2}>
          {daysOfWeek.map((day, index) => (
            <Grid key={index} item xs>
              <label>
                <Checkbox
                  checked={selectedDays.includes(day)} // 요일이 선택되었는지 확인
                  onChange={() => handleDayToggle(day)} // 체크박스 토글 함수 호출
                  // style={{ visibility: 'hidden' }} // 체크박스는 숨김 처리
                  color={selectedDays.includes(day) ? 'primary' : 'default'} // 스타일 색상 변경
                />
                <span>{day}</span> {/* 텍스트 */}
              </label>
            </Grid>
          ))}
        </Grid>
        <Grid spacing={2}>
          <Grid>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="종일" control={<Radio />} label="종일" />
              <FormControlLabel
                value="기간 선택"
                control={<Radio />}
                label="기간 선택"
                onClick={toggleTimeField}
              />
            </RadioGroup>
            <Collapse in={checked}>
              <TimeField withMonth={true} label={'start-time'} />
              <TimeField withMonth={true} label={'end-time'} />
            </Collapse>
          </Grid>
        </Grid>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          회의실 사진
          <VisuallyHiddenInput type="file" />
        </Button>
        {/* <TextField id="outlined-basic" label="기본 비품" variant="outlined" /> */}
        <Grid spacing={2}>
          기본 비품
          <IconButton
            component="label"
            variant="outlined"
            color="secondary"
            size="large"
          >
            <ControlPointOutlinedIcon />
          </IconButton>
        </Grid>
        <ImageList sx={{ width: 1000, height: 800 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={<span>by: {item.author}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
    </Item>
  );
};

export default DashBoard;

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera'
  }
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%',
  margin: '1%'
}));
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});
const daysOfWeek = ['월', '화', '수', '목', '금', '토'];

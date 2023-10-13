import {
  Box,
  Grid,
  Container,
  Input,
  InputLabel,
  TextField,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { margin, padding } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Register = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <Stack>
              <NewFormControl>
                <TextField label="이름" variant="outlined" type="text" />
              </NewFormControl>
              <NewFormControl>
                <TextField label="부서" variant="outlined" type="text" />
              </NewFormControl>
              <NewFormControl>
                <TextField label="직급" variant="outlined" type="text" />
              </NewFormControl>
              <NewFormControl>
                <TextField label="목적" variant="outlined" type="text" />
              </NewFormControl>
              <Grid>
                <FormControl>
                  <TextField label="인수지" variant="outlined" type="text" />
                </FormControl>

                <FormControl sx={{ minWidth: 240 }}>
                  <InputLabel id="demo-simple-select-label">목적지</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="목적지"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
      </Grid>
      <BottomBox>
        <Button
          variant="contained"
          color="success"
          style={{ marginRight: '10px' }}
        >
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </BottomBox>
    </Box>
  );
};
export default Register;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 750
}));

const BottomBox = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 10
}));

const NewFormControl = styled(FormControl)(({ theme }) => ({
  textAlign: 'left',
  margin: 10
}));

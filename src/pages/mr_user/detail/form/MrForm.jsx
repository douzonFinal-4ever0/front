import styled from '@emotion/styled';
import { Grid, Box } from '@mui/material';
import Input from '../../../../components/mr_user/Input';
import Label from '../../../../components/mr_user/Label';
import RectangleBtn from '../../../../components/mr_user/RectangleBtn';
import SelectBox from '../../../../components/mr_user/SelectBox';
import DatePicker from '../../../../components/mr_user/DatePicker';

const MrForm = ({ rezData, setRezData, mrCategory }) => {
  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('ff');
  };

  return (
    <StyledForm onSubmit={handleSubmitForm}>
      <Grid container spacing={2}>
        {/* 회의 목적 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="purpose" text={'회의 목적'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <Input id="purpose" placeholder="회의 목적을 입력하세요" />
          </Grid>
        </Grid>
        {/* 회의 종류 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="category" text={'회의 종류'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <SelectBox list={mrCategory} />
          </Grid>
        </Grid>
        {/* 회의 날짜 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="date" text={'예약 날짜'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <DatePicker />
          </Grid>
        </Grid>
        {/* 회의 예약시간 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="time" text={'예약 시간'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <Input id="time" placeholder="회의 목적을 입력하세요" />
          </Grid>
        </Grid>
        {/* 회의 총인원수 */}
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={3}>
            <StyledLabelWrap>
              <Label for="totCtn" text={'총 인원수'} />
            </StyledLabelWrap>
          </Grid>
          <Grid item xs={9}>
            <Input type="number" id="totCtn" placeholder={'총 인원수'} />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <RectangleBtn type="submit" text={'예약하기'} />
        </Grid>
      </Grid>
    </StyledForm>
  );
};

export default MrForm;

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%'
}));

const StyledLabelWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '100%'
}));

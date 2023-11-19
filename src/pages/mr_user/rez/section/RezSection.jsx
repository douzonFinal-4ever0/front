import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../../utils/axios';

import { setRezData } from '../../../../redux/reducer/mrUserSlice';
import { setUserData } from '../../../../redux/reducer/userSlice';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import SectionTitle from '../../../../components/mr_user/SectionTitle';
import { palette } from '../../../../theme/palette';
import RezForm from '../form/RezForm';
import RectangleBtn from '../../../../components/common/RectangleBtn';
import InnerPtForm from '../form/InnerPtForm';
import styled from '@emotion/styled';
import OutterPtForm from '../form/OutterPtForm';
import SuppliesForm from '../form/SuppliesForm';
import {
  openSanckbar,
  setSnackbarContent
} from '../../../../redux/reducer/SnackbarSlice';

const RezSection = ({ selectMrCard, recentRez, isReadOnly }) => {
  const location = useLocation();
  const currentURL = location.pathname;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const rezData = useSelector(setRezData).payload.mrUser;
  const userData = useSelector(setUserData).payload.user;
  // 회의실 예약 리덕스 데이터
  const {
    m_name,
    m_type,
    rez_date,
    rez_start_time,
    rez_end_time,
    tot_pt_ctn,
    mr_pt_list
  } = rezData;
  // 사용자 리덕스 데이터
  const { mem_code, name, dept_name, position_name } = userData;

  // 열린 Accordion 표시
  const [expanded, setExpanded] = useState('rez');
  // 예약버튼 활성화 여부
  const [isDisabled, setisDisabled] = useState(true);
  // 참석자 리스트
  const [ptList, setPtList] = useState(mr_pt_list);
  // 회의명 태그 클릭한 데이터
  const [clickTagData, setClickTagData] = useState([]);

  useEffect(() => {
    if (
      m_name !== '' &&
      m_type !== '' &&
      rez_date !== '' &&
      rez_start_time !== '' &&
      rez_end_time !== '' &&
      tot_pt_ctn !== ''
    ) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [rezData]);

  // Accordion 활성화 표시 이벤트
  const handleChange = (panel) => (event, isExpanded) => {
    if (ptList.length !== 0) {
      setPtList(ptList);
    } else if (rezData.mr_pt_list.length === 1) {
      setPtList(rezData.mr_pt_list);
    }

    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenSnackbar = () => {
    dispatch(openSanckbar());
  };

  const handleSetSnackbarContent = (content) => {
    dispatch(setSnackbarContent(content));
  };

  // 예약 버튼 이벤트
  const handleBtnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...rezData,
      mem_code,
      mr_pt_list: ptList,
      mr_code: selectMrCard.mr_code
    };

    // 예약 정보 리덕스 저장 -> 예약 완료 페이지에서 사용하기 위함
    dispatch(setRezData({ data }));
    try {
      const res = await axiosInstance.axiosInstance.post('/mr/rez', data);

      if (res.status === 201) {
        handleSetSnackbarContent('회의실 예약되었습니다. ');
        handleOpenSnackbar();
        navigation('/mr/rez/confirm');
        return;
      } else if (res.status === 400) {
        // 서버에서 상태 코드 400이면 중복 예약
        alert('조금 전 예약 완료된 회의실입니다 😧 ');
        return;
      } else if (res.status === 405) {
        // 서버에서 상태 코드 405이면 Method Not Allowed
        alert('올바르지 않은 요청입니다. 다시 시도해주세요.');
        return;
      } else {
        // 다른 상태 코드에 대한 처리
        console.log('Unexpected status code:', res.status);
      }
    } catch (err) {
      alert('조금 전 예약 완료된 회의실입니다 😧');
      console.error(err);
    }
  };

  return (
    <Box component={'section'} sx={{ height: '100%' }}>
      <StyledForm onSubmit={handleBtnSubmit}>
        <Stack sx={{ justifyContent: 'space-between', rowGap: '16px' }}>
          <Box>
            {/* 예약 정보 */}
            <Accordion
              expanded={expanded === 'rez'}
              onChange={handleChange('rez')}
              sx={{
                '&.MuiPaper-root': {
                  border: `3px solid ${
                    expanded === 'rez' ? palette.grey['500'] : 'none'
                  }`
                }
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <SectionTitle
                  title="예약 정보 (필수)"
                  sx={{ fontSize: '16px' }}
                >
                  <AccessTimeRoundedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <RezForm
                  recentRez={recentRez}
                  isReadOnly={isReadOnly}
                  setClickTagData={setClickTagData}
                  handleChange={handleChange}
                  setExpanded={setExpanded}
                />
              </AccordionDetails>
            </Accordion>

            {/* 내부 참석자 */}
            <Accordion
              expanded={expanded === 'interPt'}
              onChange={handleChange('interPt')}
              sx={{
                '&.MuiPaper-root': {
                  border: `3px solid ${
                    expanded === 'interPt' ? palette.grey['500'] : 'none'
                  }`
                }
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ display: 'flex', alignItems: 'center', height: '100%' }}
              >
                <SectionTitle title="내부 참석자" sx={{ fontSize: '16px' }}>
                  <PersonRoundedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <InnerPtForm
                  ptList={ptList}
                  setPtList={setPtList}
                  clickTagData={clickTagData}
                  setClickTagData={setClickTagData}
                />
              </AccordionDetails>
            </Accordion>

            {/* 외부 참석자 */}
            {/* <Accordion
              expanded={expanded === 'outerPt'}
              onChange={handleChange('outerPt')}
              sx={{
                '&.MuiPaper-root': {
                  border: `3px solid ${
                    expanded === 'outerPt' ? palette.grey['500'] : 'none'
                  }`
                }
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <SectionTitle title="외부 참석자" sx={{ fontSize: '16px' }}>
                  <PersonOutlineRoundedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <OutterPtForm />
              </AccordionDetails>
            </Accordion> */}
          </Box>
          {currentURL === '/mr/rez/history' ? null : (
            <RectangleBtn
              type={'submit'}
              text={'예약하기'}
              category={'register'}
              isDisabled={isDisabled ? true : false}
            />
          )}
        </Stack>
      </StyledForm>
    </Box>
  );
};

export default RezSection;

const StyledForm = styled('form')(() => ({
  height: '100%'
}));

const StyledInfoIcon = styled(InfoRoundedIcon)(({ theme }) => ({
  color: '#555'
}));

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
  Stack
} from '@mui/material';
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
import { useContext } from 'react';
import { SocketContext, useSocket } from '../../../../utils/SocketProvider';
import videoRezData from '../../../../videoRez.json';

const RezSection = ({ recentRez, selectMrCard, recentMNames, isReadOnly }) => {
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
  // const socket = useContext(SocketContext);
  const socket = useSocket();

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
  const getJwtToken = () => {
    return localStorage.getItem('jwtToken');
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
      mr_pt_list:
        rezData.m_type === '화상회의' ? videoRezData[0].mr_pt_list : ptList,
      mr_code: selectMrCard.mr_code
    };

    dispatch(setRezData({ data }));
    try {
      const res = await axiosInstance.axiosInstance.post('/mr/rez', data);
      console.log(res);
      if (res.status === 201) {
        handleSetSnackbarContent('회의실 예약되었습니다. ');
        handleOpenSnackbar();
        navigation('/mr/rez/confirm');
        //예약 완료하면 참석자들에게 알림
        const mr_rez_code = res.data;
        console.log(mr_rez_code);
        const jwt = getJwtToken();
        socket.emit('allParticipant', { ptList, mr_rez_code, jwt });
        var memList = [];
        for (let mem of ptList) {
          memList.push(mem.mem_code);
        }

        socket.emit('changeDB', { memList, jwt });
        return;
      } else if (res.status === 400) {
        // 서버에서 상태 코드 400이면 중복 예약
        alert('이미 예약된 회의실입니다.');
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
      alert('이미 예약된 회의실입니다.');
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
                <SectionTitle title="예약 정보*" sx={{ fontSize: '16px' }}>
                  <AccessTimeRoundedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <RezForm
                  mType={m_type}
                  recentRez={recentRez}
                  isReadOnly={isReadOnly}
                  setClickTagData={setClickTagData}
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

            {/* 추가 장비 */}
            {/* <Accordion
              expanded={expanded === 'supplies'}
              onChange={handleChange('supplies')}
              sx={{
                '&.MuiPaper-root': {
                  border: `3px solid ${
                    expanded === 'supplies' ? palette.grey['500'] : 'none'
                  }`
                }
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <SectionTitle title="추가 장비" sx={{ fontSize: '16px' }}>
                  <AddCircleOutlineOutlinedIcon />
                </SectionTitle>
              </AccordionSummary>
              <AccordionDetails>
                <SuppliesForm />
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

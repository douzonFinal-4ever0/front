import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography
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

const RezSection = () => {
  const [expanded, setExpanded] = useState('rez');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleBtnSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Box component={'section'} sx={{ height: '100%' }}>
      <StyledForm onSubmit={handleBtnSubmit}>
        <Stack sx={{ justifyContent: 'space-between', height: '100%' }}>
          <Box>
            {/* 예약 정보 */}
            <Accordion
              expanded={expanded === 'rez'}
              onChange={handleChange('rez')}
              sx={{
                border: `3px solid ${
                  expanded === 'rez' ? palette.grey['500'] : 'none'
                }`
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
                <RezForm />
              </AccordionDetails>
            </Accordion>

            {/* 내부 참석자 */}
            <Accordion
              expanded={expanded === 'interPt'}
              onChange={handleChange('interPt')}
              sx={{
                border: `3px solid ${
                  expanded === 'interPt' ? palette.grey['500'] : 'none'
                }`
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
                <InnerPtForm />
              </AccordionDetails>
            </Accordion>

            {/* 외부 참석자 */}
            <Accordion
              expanded={expanded === 'outerPt'}
              onChange={handleChange('outerPt')}
              sx={{
                border: `3px solid ${
                  expanded === 'outerPt' ? palette.grey['500'] : 'none'
                }`
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
            </Accordion>

            {/* 추가 장비 */}
            <Accordion
              expanded={expanded === 'supplies'}
              onChange={handleChange('supplies')}
              sx={{
                border: `3px solid ${
                  expanded === 'supplies' ? palette.grey['500'] : 'none'
                }`
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
            </Accordion>
          </Box>
          <RectangleBtn type={'submit'} text={'예약하기'} />
        </Stack>
      </StyledForm>
    </Box>
  );
};

export default RezSection;

const StyledForm = styled('form')(() => ({
  height: '100%'
}));

import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography
} from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';

import SectionTitle from '../../../../components/mr_user/SectionTitle';

const RezSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box component={'section'}>
      {/* 예약 정보 */}
      <Accordion expanded={expanded === 'rez'} onChange={handleChange('rez')}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRoundedIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <SectionTitle title="예약 정보" sx={{ fontSize: '16px' }}>
            <AccessTimeRoundedIcon />
          </SectionTitle>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* 내부 참석자 */}
      <Accordion
        expanded={expanded === 'interPt'}
        onChange={handleChange('interPt')}
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
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* 외부 참석자 */}
      <Accordion
        expanded={expanded === 'outerPt'}
        onChange={handleChange('outerPt')}
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
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* 추가 장비 */}
      <Accordion
        expanded={expanded === 'outerPt'}
        onChange={handleChange('outerPt')}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRoundedIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <SectionTitle title="추가 장비" sx={{ fontSize: '16px' }}>
            <LocalHospitalOutlinedIcon />
          </SectionTitle>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default RezSection;

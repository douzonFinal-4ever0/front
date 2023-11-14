import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const SubSidebar = ({ content, widthP }) => {
  return (
    <Box
      sx={{
        width: `${widthP}%`,
        minWidth: '200px',
        height: 'auto',
        overflow: 'auto',
        backgroundColor: 'white',
        boxShadow: '0px 3px 0px 0px rgba(145, 158, 171, 0.14) inset'
      }}
    >
      {content}
    </Box>
  );
};

SubSidebar.defaultProps = {
  content: null,
  widthP: 20
};

SubSidebar.propTypes = {
  widthP: PropTypes.number
};

export default SubSidebar;

import * as React from 'react';
import PropTypes from 'prop-types';
import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, sx, ...other } = props;

  // // children에 새로운 props인 toggleDrawer를 전달합니다.
  // const childrenWithProps = React.Children.map(children, child => {
  //   return React.cloneElement(child, { handleDrawer });
  // });

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={sx !== 0 ? { p: 3 } : { p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const Tabs = ({ tabData, sx }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={handleChange}>
          {tabData.map((tab, index) => (
            <Tab key={index} label={tab.title} />
          ))}
        </MuiTabs>
      </Box>
      {tabData.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index} sx={sx}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default Tabs;

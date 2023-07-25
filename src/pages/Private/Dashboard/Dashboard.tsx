import { LayoutContainer } from '../../../styled-components';
import { Tab, Tabs, Box } from '@mui/material';
import { useState } from 'react';
import { NormalPagination, ScrollPagination, Search } from './components';


//
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{display: "flex", justifyContent: "center", flexWrap: "wrap",gap: "20px", padding: "1rem"}}>
           {children} 
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}



export const Dashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <LayoutContainer>
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Normal Pagination" {...a11yProps(0)} />
            <Tab label="Scroll Pagination" {...a11yProps(1)} />
            <Tab label="Search Movie" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} >
          <NormalPagination/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ScrollPagination/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Search/>
        </TabPanel>
      </Box>
    </LayoutContainer>
  );
};

export default Dashboard;

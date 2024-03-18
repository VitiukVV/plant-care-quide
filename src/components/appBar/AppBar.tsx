import { NavLink, Outlet, useLocation } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AppBar = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(
    location.pathname === '/garden' ? 1 : 0
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <header>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Home" component={NavLink} to="/" />
            <Tab label="Garden" component={NavLink} to="/garden" />
          </Tabs>
        </Box>
      </header>
      <main>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </React.Suspense>
      </main>
    </>
  );
};

export default AppBar;

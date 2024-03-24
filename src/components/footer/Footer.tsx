import { useState, ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

const Footer = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: '0',
        height: '100px',
        width: '100%',
        bgcolor: '#56817A',
      }}
    >
      <Toolbar
        component="div"
        sx={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '10px 0',
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          sx={{ display: 'flex', bgcolor: 'inherit' }}
          onChange={(_event: ChangeEvent<{}>, newValue: number) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            component={NavLink}
            to="/"
            sx={{
              '& .MuiBottomNavigationAction-label': {
                color: '#fff',
                fontSize: '25px',
                borderBottom: '2px solid transparent',
                paddingBottom: '5px',
              },
              '& .Mui-selected': {
                borderBottom: '2px solid #fff',
              },
            }}
          />
          <BottomNavigationAction
            label="Garden"
            component={NavLink}
            to="/garden"
            sx={{
              '& .MuiBottomNavigationAction-label': {
                color: '#fff',
                fontSize: '25px',
                borderBottom: '2px solid transparent',
                paddingBottom: '5px',
              },
              '& .Mui-selected': {
                borderBottom: '2px solid #fff',
              },
            }}
          />
        </BottomNavigation>
      </Toolbar>
    </Box>
  );
};

export default Footer;

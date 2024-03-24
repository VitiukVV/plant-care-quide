import { useState, ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from '@mui/material';
import Logo from '../../icons/Logo';

const Footer = () => {
  const [value, setValue] = useState<number>(0);
  const footerText: string =
    'Your virtual garden assistant. Add your favourite plants, identify it with photo, find care tips and get reminders for watering and other useful events.';

  const bottomNavigationActionStyles = {
    '& .MuiBottomNavigationAction-label': {
      color: '#fff',
      fontSize: '20px',
      borderBottom: '2px solid transparent',
      paddingBottom: '5px',
    },
    '& .MuiBottomNavigationAction-label.Mui-selected': {
      color: '#fff',
      fontSize: '20px',
      borderBottom: '2px solid #fff',
      paddingBottom: '5px',
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: '0',
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
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            bgcolor: 'inherit',
            maxWidth: '30%',
          }}
          onChange={(_event: ChangeEvent<{}>, newValue: number) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            component={NavLink}
            to="/"
            sx={bottomNavigationActionStyles}
          />
          <BottomNavigationAction
            label="Garden"
            component={NavLink}
            to="/garden"
            sx={bottomNavigationActionStyles}
          />
        </BottomNavigation>
        <Typography
          sx={{ textAlign: 'center', color: '#fff', maxWidth: '60%' }}
        >
          {footerText}
        </Typography>
        <Logo />
      </Toolbar>
    </Box>
  );
};

export default Footer;

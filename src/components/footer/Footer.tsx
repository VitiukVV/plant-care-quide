import { useState, ChangeEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from '@mui/material';
import Logo from '../../icons/Logo';

const Footer = () => {
  const [value, setValue] = useState<string>('Home');
  const location = useLocation();
  const footerText: string =
    'Your virtual garden assistant. Add your favourite plants, identify it with photo, find care tips and get reminders for watering and other useful events.';

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setValue('Home');
        break;
      case '/garden':
        setValue('Garden');
        break;
      case '/identification':
        setValue('Identification');
        break;
    }
  }, [location.pathname]);

  const bottomNavigationActionStyles = {
    '& .MuiBottomNavigationAction-label': {
      color: '#fff',
      fontSize: '1.25rem',
      borderBottom: '2px solid transparent',
      paddingBottom: '0.3rem',
    },
    '& .MuiBottomNavigationAction-label.Mui-selected': {
      color: '#fff',
      fontSize: '1.25rem',
      borderBottom: '2px solid #fff',
      paddingBottom: '0.3rem',
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: '#56817A',
        marginTop: '2.1rem',
      }}
    >
      <Box
        component="div"
        sx={{
          maxWidth: '82.5rem',
          margin: '0 auto',
          padding: '1.8rem 0.9rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            bgcolor: 'inherit',
            maxWidth: '30%',
            height: 'auto',
          }}
          onChange={(_event: ChangeEvent<unknown>, newValue: string) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="Home"
            component={NavLink}
            to="/"
            sx={bottomNavigationActionStyles}
          />
          <BottomNavigationAction
            label="Garden"
            value="Garden"
            component={NavLink}
            to="/garden"
            sx={bottomNavigationActionStyles}
          />
          <BottomNavigationAction
            label="Identification"
            value="Identification"
            component={NavLink}
            to="/identification"
            sx={bottomNavigationActionStyles}
          />
        </BottomNavigation>
        <Typography
          sx={{ textAlign: 'center', color: '#fff', maxWidth: '60%' }}
        >
          {footerText}
        </Typography>
        <Logo style={{ marginLeft: 'auto', marginRight: 'auto' }} />
      </Box>
    </Box>
  );
};

export default Footer;

import { useState, useEffect, Suspense, MouseEvent } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import logo from '../../../public/logo.svg';

const AppBar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuToggle = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Container
        sx={{
          maxWidth: 1320,
          margin: '0 auto',
          bgcolor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: 35,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <img src={logo} alt="Logo" />
          </Box>
          {!isMobile && (
            <Tabs
              value={location.pathname}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Home" value="/" component={NavLink} to="/" />
              <Tab
                label="Garden"
                value="/garden"
                component={NavLink}
                to="/garden"
              />
            </Tabs>
          )}
          {isMobile && (
            <IconButton sx={{ marginLeft: 'auto' }} onClick={handleMenuToggle}>
              <DragHandleIcon />
            </IconButton>
          )}
        </Box>
      </Container>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={NavLink} to="/" onClick={handleMenuClose}>
          Home
        </MenuItem>
        <MenuItem component={NavLink} to="/garden" onClick={handleMenuClose}>
          Garden
        </MenuItem>
      </Menu>
      <Box
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
};

export default AppBar;

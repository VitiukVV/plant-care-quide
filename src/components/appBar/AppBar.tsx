import { useState, useEffect, Suspense, MouseEvent } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab, IconButton, Menu, MenuItem } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import LogoComponent from '../../icons/Logo';
import Footer from '../footer/Footer';

const AppBar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 570);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth <= 1320);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuToggle = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 570);
      setIsWideScreen(window.innerWidth <= 1320);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Box
        component="div"
        sx={{
          maxWidth: '1320px',
          margin: isWideScreen ? '0 15px' : '0 auto',
          bgcolor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: 35,
          padding: '10px 20px',
          marginTop: 6,
          marginBottom: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'baseline' : 'center',
          }}
        >
          <Box>
            <LogoComponent />
          </Box>
          {!isMobile && (
            <Tabs
              value={
                location.pathname.startsWith('/garden/details')
                  ? '/garden'
                  : location.pathname
              }
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
              <Tab
                label="Identification"
                value="/identification"
                component={NavLink}
                to="/identification"
              />
              <Tab label="Todo" value="/todo" component={NavLink} to="/todo" />
            </Tabs>
          )}
          {isMobile && (
            <IconButton sx={{ marginLeft: 'auto' }} onClick={handleMenuToggle}>
              <DragHandleIcon />
            </IconButton>
          )}
        </Box>
      </Box>
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
        <MenuItem
          component={NavLink}
          to="/identification"
          onClick={handleMenuClose}
        >
          Identification
        </MenuItem>
      </Menu>
      <Box
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          minHeight: 'calc(100vh - 356px)',
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </>
  );
};

export default AppBar;

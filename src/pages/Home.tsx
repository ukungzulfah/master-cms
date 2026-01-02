import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleDarkMode, toggleDrawer } from '../store/slices/appSlice';
import { logoutWithReset } from '../store/slices/authSlice';
import { HomeDrawer } from '../components/Drawer/HomeDrawer';
import { LogoutConfirmDialog } from '../components/LogoutConfirmDialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  const drawerOpen = useAppSelector((state) => state.app.isDrawerOpen);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogoutConfirm = () => {
    dispatch(logoutWithReset());
    setLogoutDialogOpen(false);
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const user = useAppSelector((state) => state.auth.user);
  const email = (user ? user.email : '') || '';


  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      {/* AppBar */}
      <AppBar
        position="static"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleToggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            MASTER
          </Typography>

          {/* Terminal Icon */}
          {/* {email === 'ukungzulfah@gmail.com' ? (
            <IconButton
              color="inherit"
              onClick={handleOpenTerminal}
              sx={{ mr: 1 }}
            >
              <TerminalIcon />
            </IconButton>
          ) : null} */}

          {/* Theme Toggle */}
          <IconButton
            color="inherit"
            onClick={handleThemeToggle}
            sx={{ mr: 1 }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Account Icon */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/profile')}
            sx={{ mr: 1 }}
          >
            <AccountCircleIcon />
          </IconButton>

          {/* Settings Icon */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/settings')}
            sx={{ mr: 1 }}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Drawer - Persistent Sidebar */}
        <HomeDrawer open={drawerOpen} />

        {/* Main Content with Outlet */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            overflow: 'auto',
            bgcolor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmDialog
        open={logoutDialogOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />

    </Box>
  );
};

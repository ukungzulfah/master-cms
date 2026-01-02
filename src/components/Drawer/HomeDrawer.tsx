import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Tooltip,
} from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PeopleIcon from '@mui/icons-material/People';
import CloudIcon from '@mui/icons-material/Cloud';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import StorageIcon from '@mui/icons-material/Storage';
import FolderIcon from '@mui/icons-material/Folder';
import TableChartIcon from '@mui/icons-material/TableChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CableIcon from '@mui/icons-material/Cable';
import BugReportIcon from '@mui/icons-material/BugReport';
import ForumIcon from '@mui/icons-material/Forum';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logoutWithReset } from '../../store/slices/authSlice';
import { LogoutConfirmDialog } from '../LogoutConfirmDialog';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 70;

interface MenuItemType {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  requiredRoles?: ('Admin' | 'User' | 'Viewer')[];
}

interface HomeDrawerProps {
  open: boolean;
}

export const HomeDrawer: React.FC<HomeDrawerProps> = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const userRole = user?.role || 'Viewer';
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const menuItems: MenuItemType[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FolderOpenIcon />,
      path: '/dashboard',
      requiredRoles: ['Admin', 'User', 'Viewer'],
    },
  ];

  const bottomMenuItems: MenuItemType[] = [];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logoutWithReset());
    setLogoutDialogOpen(false);
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  // Helper function to check if user has access to menu item
  const hasAccess = (item: MenuItemType): boolean => {
    if (!item.requiredRoles || item.requiredRoles.length === 0) {
      return true;
    }
    return item.requiredRoles.includes(userRole);
  };

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(hasAccess);
  const filteredBottomMenuItems = bottomMenuItems.filter(hasAccess);

  // Helper function to check if current path matches menu item path
  const isPathActive = (menuPath: string): boolean => {
    if (menuPath === '/projects') {
      // For Projects, also match nested routes like /projects/:projectId
      return location.pathname === menuPath || location.pathname.startsWith(menuPath + '/');
    }
    return location.pathname === menuPath;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
        flexShrink: 0,
        height: '100%',
        overflow: 'auto',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        pt: 2,
        transition: 'width 0.3s ease',
        // Hide scrollbar tapi tetap bisa scroll
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
        '&::-webkit-scrollbar': {
          display: 'none', // Chrome, Safari, Opera
        },
      }}
    >
      {open ? (
        <>
          {/* Menu Items */}
          <List
            sx={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {filteredMenuItems.map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => handleMenuClick(item.path)}
                selected={isPathActive(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isPathActive(item.path) ? 600 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Bottom Menu Items */}
          <Box sx={{
            mt: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}>
            <List
              sx={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {filteredBottomMenuItems.map((item) => (
                <ListItemButton
                  key={item.id}
                  onClick={() => handleMenuClick(item.path)}
                  selected={isPathActive(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      fontSize: '0.9rem',
                    }}
                  />
                </ListItemButton>
              ))}

              {/* Logout */}
              <ListItemButton
                onClick={handleLogoutClick}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  mb: 1,
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: 'error.light',
                    color: 'error.contrastText',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </List>
          </Box>
        </>
      ) : (
        <>
          <List
            sx={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {filteredMenuItems.map((item) => (
              <Tooltip key={item.id} title={item.label} placement="right">
                <ListItemButton
                  onClick={() => handleMenuClick(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    justifyContent: 'center',
                    px: 0,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Bottom Menu - Collapsed */}
          <Box sx={{
            mt: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}>
            <List
              sx={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {filteredBottomMenuItems.map((item) => (
                <Tooltip key={item.id} title={item.label} placement="right">
                  <ListItemButton
                    onClick={() => handleMenuClick(item.path)}
                    selected={location.pathname === item.path}
                    sx={{
                      justifyContent: 'center',
                      px: 0,
                      mb: 0.5,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'primary.contrastText',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              ))}

              <Tooltip title="Logout" placement="right">
                <ListItemButton
                  onClick={handleLogoutClick}
                  sx={{
                    justifyContent: 'center',
                    px: 0,
                    mb: 1,
                    color: 'error.main',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                    <LogoutIcon />
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            </List>
          </Box>
        </>
      )}

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmDialog
        open={logoutDialogOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </Paper>
  );
};

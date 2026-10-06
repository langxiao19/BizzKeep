import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Home,
  Close,
  Menu as MenuIcon,
  Person,
  Language,
  Groups,
  Publish,
  Forum,
  Schedule,
  Settings,
  LogoutOutlined,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import BizKeeperLogo from '../components/logo';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onMenuClick: () => void;
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  isMobile?: boolean;
}

export const drawerWidth = 180;
export const collapsedWidth = 60;

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onMenuClick, user, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);

  // Agent navigation items
  const agentItems = [
    { id: 'publisher', name: 'Publisher', icon: <Publish sx={{ fontSize: 18 }} />, path: '/app/keeper/publisher', color: '#8B5CF6' },
    { id: 'scheduler', name: 'Scheduler', icon: <Schedule sx={{ fontSize: 18 }} />, path: '/app/keeper/scheduler', color: '#EC4899' },
    { id: 'messenger', name: 'Messenger', icon: <Forum sx={{ fontSize: 18 }} />, path: '/app/keeper/messenger', color: '#F59E0B' },
  ];

  const isAgentSelected = (path: string) => location.pathname === path;

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('restaurant_token');
    localStorage.removeItem('restaurant_user');
    navigate('/login');
    handleProfileMenuClose();
  };

  const handleNavigation = (path: string, state?: any) => {
    navigate(path, { state });
    if (isMobile) { // Close on mobile
      onClose();
    }
  };

  const isSelected = (path: string) => {
    if (path === '/app/website') {
      // Also highlight when on related website pages
      return location.pathname === path || 
             location.pathname === '/app/website/menu' || 
             location.pathname === '/app/website/blog' ||
             location.pathname.startsWith('/app/website/blog/');
    }
    if (path === '/app/customers') {
      // Also highlight when on related customer/CRM pages
      return location.pathname === path ||
             location.pathname === '/app/crm/customers' ||
             location.pathname.startsWith('/app/crm/');
    }
    return location.pathname === path;
  };

  // Collapsed sidebar content
  const collapsedDrawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f7f7f8',
      borderRight: '1px solid #e5e5e5',
      alignItems: 'center',
      width: collapsedWidth,
    }}>
      {/* Collapsed Header */}
      <Box sx={{ 
        px: 2,
        py: 0,
        minHeight: '60px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottom: '1px solid #e5e5e5',
        width: '100%',
      }}>
        <IconButton
          onClick={onMenuClick}
          size="small"
          sx={{ 
            color: '#6e7781',
            '&:hover': { 
              backgroundColor: '#f0f0f0',
              color: '#2d333a',
            },
          }}
        >
          <MenuIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Collapsed Icons */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, gap: 1 }}>
        {/* Home Icon */}
        <IconButton
          onClick={() => handleNavigation('/app/home')}
          size="small"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: isSelected('/app/home') ? 'rgba(116, 67, 192, 0.12)' : 'transparent',
            color: isSelected('/app/home') ? '#7443C0' : '#6e7781',
            '&:hover': {
              backgroundColor: isSelected('/app/home') ? 'rgba(116, 67, 192, 0.18)' : '#f0f0f0',
              color: isSelected('/app/home') ? '#7443C0' : '#2d333a',
            },
          }}
          title="Home"
        >
          <Home sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Website Icon */}
        <IconButton
          onClick={() => handleNavigation('/app/website')}
          size="small"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: isSelected('/app/website') ? 'rgba(116, 67, 192, 0.12)' : 'transparent',
            color: isSelected('/app/website') ? '#7443C0' : '#6e7781',
            '&:hover': {
              backgroundColor: isSelected('/app/website') ? 'rgba(116, 67, 192, 0.18)' : '#f0f0f0',
              color: isSelected('/app/website') ? '#7443C0' : '#2d333a',
            },
          }}
          title="Website"
        >
          <Language sx={{ fontSize: 18 }} />
        </IconButton>
        
        {/* Customer Icon */}
        <IconButton
          onClick={() => handleNavigation('/app/customers')}
          size="small"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: isSelected('/app/customers') ? 'rgba(116, 67, 192, 0.12)' : 'transparent',
            color: isSelected('/app/customers') ? '#7443C0' : '#6e7781',
            '&:hover': {
              backgroundColor: isSelected('/app/customers') ? 'rgba(116, 67, 192, 0.18)' : '#f0f0f0',
              color: isSelected('/app/customers') ? '#7443C0' : '#2d333a',
            },
          }}
          title="Customer"
        >
          <Groups sx={{ fontSize: 18 }} />
        </IconButton>
        
        {/* Divider */}
        <Box sx={{ width: '80%', height: '1px', backgroundColor: '#e5e5e5', my: 1 }} />
        
        {/* Bizkeeper Icon */}
        <IconButton
          onClick={() => handleNavigation('/app/keeper')}
          size="small"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: '#7443C0',
            color: 'white',
            '&:hover': {
              backgroundColor: '#5C359A',
              color: 'white',
            },
          }}
          title="Bizkeeper"
        >
          <Person sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Agent Icons */}
        {agentItems.map((agent) => (
          <IconButton
            key={agent.id}
            onClick={() => handleNavigation(agent.path)}
            size="small"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              backgroundColor: isAgentSelected(agent.path) ? `${agent.color}20` : 'transparent',
              color: isAgentSelected(agent.path) ? agent.color : '#6e7781',
              '&:hover': {
                backgroundColor: isAgentSelected(agent.path) ? `${agent.color}30` : '#f0f0f0',
                color: isAgentSelected(agent.path) ? agent.color : '#2d333a',
              },
            }}
            title={agent.name}
          >
            {agent.icon}
          </IconButton>
        ))}
      </Box>

      {/* User Profile - Bottom (Collapsed) */}
      <Box sx={{ 
        p: 1.5, 
        borderTop: '1px solid #e5e5e5',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <IconButton
          onClick={handleProfileMenuOpen}
          size="small"
          sx={{
            p: 0.5,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          {user?.avatar ? (
            <Avatar 
              src={user.avatar} 
              sx={{ width: 32, height: 32 }} 
            />
          ) : (
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#7443C0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'D'}
            </Box>
          )}
        </IconButton>
      </Box>
    </Box>
  );

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f7f7f8',
      borderRight: '1px solid #e5e5e5',
    }}>
      {/* Header */}
      <Box sx={{ 
        px: 3,
        py: 0,
        minHeight: '60px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid #e5e5e5',
      }}>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{ 
              cursor: 'pointer',
              '&:hover .logo-text': {
                color: '#7443C0',
              },
              '&:hover .logo-icon': {
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
              mr: 2,
            }}
            onClick={() => navigate('/')}
          >
            <BizKeeperLogo 
              className="logo-icon"
              size={24}
              sx={{ 
                color: '#7443C0', 
                mr: 1.5,
                transition: 'transform 0.2s ease',
              }} 
            />
            <Typography 
              className="logo-text"
              variant="h6" 
              fontWeight={600} 
              sx={{ 
                fontSize: '1rem', 
                color: '#2d333a',
                transition: 'color 0.2s ease',
              }}
            >
              BizKeeper
            </Typography>
          </Box>
          <IconButton
            onClick={onMenuClick}
            size="small"
            sx={{ 
              color: '#6e7781',
              '&:hover': { 
                backgroundColor: '#f0f0f0',
                color: '#2d333a',
              },
            }}
          >
            <MenuIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{ 
            display: { xs: 'block', lg: 'none' },
            color: '#6e7781',
            '&:hover': { backgroundColor: '#f0f0f0' }
          }}
        >
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Main Navigation */}
      <Box sx={{ px: 2, pt: 2 }}>
        <List sx={{ py: 0 }}>
          {/* Home */}
          <ListItem disablePadding sx={{ mb: 1.5 }}>
            <ListItemButton
              onClick={() => handleNavigation('/app/home')}
              selected={isSelected('/app/home')}
              sx={{
                borderRadius: '8px',
                py: 1,
                px: 1.5,
                width: 'fit-content',
                minHeight: 'auto',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(116, 67, 192, 0.12)',
                  color: '#7443C0',
                  '&:hover': {
                    backgroundColor: 'rgba(116, 67, 192, 0.18)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#7443C0',
                  },
                },
                '&:hover': {
                  backgroundColor: isSelected('/app/home') ? 'rgba(116, 67, 192, 0.18)' : '#f0f0f0',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: '#6e7781' }}>
                <Home sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isSelected('/app/home') ? '#7443C0' : '#2d333a',
                  ml: 0.5,
                }}
              >
                Home
              </Typography>
            </ListItemButton>
          </ListItem>

          {/* Website */}
          <ListItem disablePadding sx={{ mb: 1.5 }}>
            <ListItemButton
              onClick={() => handleNavigation('/app/website')}
              selected={isSelected('/app/website')}
              sx={{
                borderRadius: '8px',
                py: 1,
                px: 1.5,
                width: 'fit-content',
                minHeight: 'auto',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(116, 67, 192, 0.12)',
                  color: '#7443C0',
                  '&:hover': {
                    backgroundColor: 'rgba(116, 67, 192, 0.18)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#7443C0',
                  },
                },
                '&:hover': {
                  backgroundColor: isSelected('/app/website') ? 'rgba(116, 67, 192, 0.18)' : '#f0f0f0',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: '#6e7781' }}>
                <Language sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isSelected('/app/website') ? '#7443C0' : '#2d333a',
                  ml: 0.5,
                }}
              >
                Website
              </Typography>
            </ListItemButton>
          </ListItem>

          {/* Customer */}
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              onClick={() => handleNavigation('/app/customers')}
              selected={isSelected('/app/customers')}
              sx={{
                borderRadius: '8px',
                py: 1,
                px: 1.5,
                width: 'fit-content',
                minHeight: 'auto',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(116, 67, 192, 0.12)',
                  color: '#7443C0',
                  '&:hover': {
                    backgroundColor: 'rgba(116, 67, 192, 0.18)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#7443C0',
                  },
                },
                '&:hover': {
                  backgroundColor: isSelected('/app/customers') ? 'rgba(116, 67, 192, 0.18)' : '#f0f0f0',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: '#6e7781' }}>
                <Groups sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isSelected('/app/customers') ? '#7443C0' : '#2d333a',
                  ml: 0.5,
                }}
              >
                Customer
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Divider */}
      <Box sx={{ mx: 2, mb: 2 }}>
        <Box sx={{ height: '1px', backgroundColor: '#e5e5e5' }} />
      </Box>

      {/* Bizkeeper Section */}
      <Box sx={{ px: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem disablePadding sx={{ mb: 1.5 }}>
            <ListItemButton
              onClick={() => handleNavigation('/app/keeper')}
              selected={isSelected('/app/keeper')}
              sx={{
                borderRadius: '8px',
                py: 1,
                px: 1.5,
                width: 'fit-content',
                minHeight: 'auto',
                backgroundColor: '#7443C0',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#7443C0',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#5C359A',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  backgroundColor: '#5C359A',
                },
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: 'white' }}>
                <Person sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'white',
                  ml: 0.5,
                }}
              >
                Bizkeeper
              </Typography>
            </ListItemButton>
          </ListItem>

          {/* Agent Navigation Items */}
          {agentItems.map((agent) => (
            <ListItem key={agent.id} disablePadding sx={{ mb: 1.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(agent.path)}
                selected={isAgentSelected(agent.path)}
                sx={{
                  borderRadius: '8px',
                  py: 1,
                  px: 1.5,
                  width: 'fit-content',
                  minHeight: 'auto',
                  '&.Mui-selected': {
                    backgroundColor: `${agent.color}20`,
                    color: agent.color,
                    '&:hover': {
                      backgroundColor: `${agent.color}30`,
                    },
                    '& .MuiListItemIcon-root': {
                      color: agent.color,
                    },
                  },
                  '&:hover': {
                    backgroundColor: isAgentSelected(agent.path) ? `${agent.color}30` : '#f0f0f0',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 28, color: isAgentSelected(agent.path) ? agent.color : '#6e7781' }}>
                  {agent.icon}
                </ListItemIcon>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: isAgentSelected(agent.path) ? agent.color : '#2d333a',
                    ml: 0.5,
                  }}
                >
                  {agent.name}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Spacer to push profile to bottom */}
      <Box sx={{ flex: 1 }} />

      {/* User Profile - Bottom (Expanded) */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid #e5e5e5',
      }}>
        <Box
          onClick={handleProfileMenuOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            '&:hover': { 
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          {user?.avatar ? (
            <Avatar 
              src={user.avatar} 
              sx={{ width: 32, height: 32 }} 
            />
          ) : (
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#7443C0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'D'}
            </Box>
          )}
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#2d333a',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.name || 'Demo User'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const sidebarWidth = isMobile ? (open ? drawerWidth : 0) : (open ? drawerWidth : collapsedWidth);
  const sidebarContent = open ? drawer : collapsedDrawer;

  return (
    <>
      {isMobile && open && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1299,
          }}
          onClick={onClose}
        />
      )}
      <Box
        sx={{
          position: isMobile ? 'fixed' : 'relative',
          width: `${sidebarWidth}px`,
          height: '100vh',
          flexShrink: 0,
          transition: 'width 0.3s ease',
          zIndex: isMobile ? (open ? 1300 : -1) : 'auto',
          backgroundColor: '#f7f7f8',
          borderRight: '1px solid #e5e5e5',
          overflow: 'hidden',
          display: isMobile && !open ? 'none' : 'block',
        }}
      >
        {sidebarContent}
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            mb: 1,
            minWidth: 180,
          },
          '& .MuiMenuItem-root': {
            fontSize: '0.875rem',
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: '#f9fafb',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e5e5e5' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2d333a' }}>
            {user?.name || 'Demo User'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6e7781' }}>
            {user?.email || 'demo@restaurant.com'}
          </Typography>
        </Box>
        <MenuItem 
          onClick={() => { navigate('/app/profile'); handleProfileMenuClose(); }}
          sx={{ color: '#2d333a' }}
        >
          <Settings sx={{ mr: 2, fontSize: 18, color: '#6e7781' }} />
          Profile Settings
        </MenuItem>
        <MenuItem 
          onClick={handleLogout}
          sx={{ color: '#dc2626' }}
        >
          <LogoutOutlined sx={{ mr: 2, fontSize: 18 }} />
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default Sidebar;


import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar, { drawerWidth, collapsedWidth } from './Sidebar';
import { useAuth } from '../hooks/useAuth';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open for desktop
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true); // Auto-open on desktop
      } else {
        setSidebarOpen(false); // Auto-close on mobile
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f7f7f8' }}>
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onMenuClick={handleSidebarToggle}
        user={user || undefined}
        isMobile={isMobile}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: '#f7f7f8',
          overflow: 'hidden',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Box sx={{ 
          flex: 1, 
          p: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: '100%',
          overflow: 'auto',
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppShell;

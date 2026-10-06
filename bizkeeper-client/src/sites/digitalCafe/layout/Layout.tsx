import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  currentPage?: 'home' | 'menu' | 'blog';
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentPage = 'home', children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentPage={currentPage} />
      <Box component="main" sx={{ flex: 1 }}>
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default Layout;


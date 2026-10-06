import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  currentPage?: 'home' | 'menu' | 'blog';
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home' }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const basePath = '/digitalcafe';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (target: string) => {
    if (target.startsWith('#')) {
      scrollToSection(target.substring(1));
    } else {
      navigate(target);
    }
  };

  const navigationItems = [
    { label: 'Home', target: currentPage === 'home' ? '#home' : basePath },
    { label: 'About', target: currentPage === 'home' ? '#about' : `${basePath}#about` },
    { label: 'Testimonials', target: currentPage === 'home' ? '#testimonials' : `${basePath}#testimonials` },
    { label: 'Contact', target: currentPage === 'home' ? '#contact' : `${basePath}#contact` },
    { label: 'Menu', target: `${basePath}/menu` },
    { label: 'Blog', target: `${basePath}/blog` },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={() => {
              handleNavigation(item.target);
              setMobileOpen(false);
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <style>
        {`
          .restaurant-navbar {
            background: linear-gradient(135deg, #33211D 0%, #2A1B17 100%);
            padding: 12px 0;
          }
          
          .restaurant-brand {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 2.5rem;
            color: white;
            text-decoration: none;
            letter-spacing: 2px;
          }
          
          .restaurant-nav-link {
            color: white !important;
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
            margin: 0 15px;
            transition: color 0.3s ease;
          }
          
          .restaurant-nav-link:hover {
            color: #DA9F5B !important;
          }
        `}
      </style>

      <AppBar position="sticky" className="restaurant-navbar">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h4"
              component="a"
              href="#"
              className="restaurant-brand"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(basePath);
              }}
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              DIGITALCAFE
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.label}
                    color="inherit"
                    className="restaurant-nav-link"
                    onClick={() => handleNavigation(item.target)}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;


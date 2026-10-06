import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Paper,
  Container,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart,
  Add,
  Remove,
  Close,
  Restaurant,
  AttachMoney,
} from '@mui/icons-material';
import Navbar from '../layout/Navbar';
import { loadMenu, MenuItem as MenuItemType } from '../services/menuService';

interface MenuItem extends MenuItemType {}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  display_order: number;
  items: MenuItem[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = loadMenu();
      setMenuData(data.categories);
      setLoading(false);
    } catch (error) {
      console.error('Error loading menu:', error);
      setLoading(false);
    }
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const handleOrderOnline = () => {
    alert('Online ordering would be implemented here');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="text.secondary">
          Loading menu...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f6f0' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700&family=Roboto:wght@300;400;500;700&display=swap');
          
          .menu-card {
            transition: all 0.3s ease;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .menu-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .menu-hero {
            background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), 
                        url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'),
                        linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%);
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
            padding: 80px 0 60px;
            text-align: center;
            position: relative;
            overflow: hidden;
            min-height: 400px;
            display: flex;
            align-items: center;
          }
          
          .menu-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(139, 69, 19, 0.1);
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>

      <Navbar currentPage="menu" />

      {/* Hero Section */}
      <Box className="menu-hero">
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 3,
              fontFamily: 'serif',
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            Our Menu
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.95,
              mb: 4,
              fontFamily: 'serif',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Fresh Ingredients, Authentic Flavors, Memorable Experiences
          </Typography>
        </Container>
      </Box>

      {/* Floating Cart Button */}
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        <Badge badgeContent={getTotalItems()} color="primary">
          <IconButton
            onClick={() => setCartOpen(true)}
            sx={{
              backgroundColor: '#8B4513',
              color: 'white',
              '&:hover': { backgroundColor: '#A0522D' },
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            size="large"
          >
            <ShoppingCart />
          </IconButton>
        </Badge>
      </Box>

      <Box>
        <Paper
          elevation={12}
          sx={{
            backgroundColor: '#fefefe',
            borderRadius: 0,
            overflow: 'hidden',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            border: '2px solid #8B4513',
          }}
        >
          {/* Category Navigation */}
          <Box
            sx={{
              backgroundColor: '#f5f5dc',
              borderBottom: '2px solid #8B4513',
              px: 4,
              py: 3,
            }}
          >
            <Tabs
              value={selectedCategory}
              onChange={(e, newValue) => setSelectedCategory(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  minHeight: 56,
                  fontSize: '0.9rem',
                  color: '#8B4513',
                  fontFamily: 'serif',
                  letterSpacing: '1px',
                },
                '& .Mui-selected': {
                  color: '#654321',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#654321',
                  height: 3,
                },
              }}
            >
              {menuData.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  icon={<Restaurant sx={{ fontSize: 18 }} />}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Box>

          {/* Menu Content - Two Column Layout */}
          <Box sx={{ p: 6 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 4,
              }}
            >
              {/* Left Column */}
              <Box>
                {menuData[selectedCategory]?.items
                  .slice(0, Math.ceil(menuData[selectedCategory]?.items.length / 2))
                  .map((item) => (
                    <MenuItemRow key={item.id} item={item} onAdd={addToCart} formatPrice={formatPrice} />
                  ))}
              </Box>

              {/* Right Column */}
              <Box>
                {menuData[selectedCategory]?.items
                  .slice(Math.ceil(menuData[selectedCategory]?.items.length / 2))
                  .map((item) => (
                    <MenuItemRow key={item.id} item={item} onAdd={addToCart} formatPrice={formatPrice} />
                  ))}
              </Box>
            </Box>

            {/* Empty State */}
            {menuData[selectedCategory]?.items.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Restaurant sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No items available in this category
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Shopping Cart Drawer */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            backgroundColor: '#f8f9fa',
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              backgroundColor: '#8B4513',
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Your Order ({getTotalItems()} items)
            </Typography>
            <IconButton color="inherit" onClick={() => setCartOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            {cart.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add some delicious items to get started!
                </Typography>
              </Box>
            ) : (
              <List>
                {cart.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {formatPrice(item.price)} each
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => removeFromCart(item.id)}
                                sx={{
                                  backgroundColor: '#f0f0f0',
                                  '&:hover': { backgroundColor: '#e0e0e0' },
                                }}
                              >
                                <Remove fontSize="small" />
                              </IconButton>
                              <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => addToCart(item)}
                                sx={{
                                  backgroundColor: '#8B4513',
                                  color: 'white',
                                  '&:hover': { backgroundColor: '#A0522D' },
                                }}
                              >
                                <Add fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#8B4513' }}>
                          {formatPrice(item.price * item.quantity)}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < cart.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>

          {cart.length > 0 && (
            <Box sx={{ p: 2, borderTop: '1px solid #e5e5e5' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Total:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#8B4513' }}>
                  {formatPrice(getTotalPrice())}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<AttachMoney />}
                onClick={handleOrderOnline}
                sx={{
                  backgroundColor: '#8B4513',
                  '&:hover': { backgroundColor: '#A0522D' },
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                Proceed to Checkout
              </Button>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: 'center', display: 'block', mt: 1 }}
              >
                This is a demo - checkout functionality not implemented
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

// Helper component for menu items
interface MenuItemRowProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  formatPrice: (price: number) => string;
}

const MenuItemRow: React.FC<MenuItemRowProps> = ({ item, onAdd, formatPrice }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      py: 2,
      px: 2,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderBottom: '1px solid rgba(139, 69, 19, 0.1)',
      borderRadius: 2,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'linear-gradient(45deg, transparent 30%, rgba(139, 69, 19, 0.05) 50%, transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      },
      '&:hover': {
        backgroundColor: 'rgba(139, 69, 19, 0.05)',
        transform: 'translateX(8px) scale(1.01)',
        boxShadow: '0 8px 25px rgba(139, 69, 19, 0.15)',
        '&::before': {
          opacity: 1,
        },
      },
      '&:last-child': {
        borderBottom: 'none',
      },
    }}
    onClick={() => onAdd(item)}
  >
    <Box sx={{ flex: 1, pr: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#A0522D',
            fontSize: '1.4rem',
            fontFamily: 'serif',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#A0522D',
            fontSize: '1.4rem',
            fontFamily: 'serif',
            ml: 2,
          }}
        >
          {formatPrice(item.price)}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: '#2d333a',
          lineHeight: 1.5,
          fontSize: '1rem',
          fontFamily: 'sans-serif',
          fontWeight: 300,
          fontStyle: 'italic',
        }}
      >
        {item.description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
        {item.allergens.length > 0 && (
          <Chip
            label={`${item.allergens.length} allergens`}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.7rem',
              height: 20,
              color: '#f57c00',
              borderColor: '#f57c00',
            }}
          />
        )}
        {!item.is_available && (
          <Chip
            label="Unavailable"
            size="small"
            sx={{
              backgroundColor: '#ffebee',
              color: '#c62828',
              fontSize: '0.75rem',
            }}
          />
        )}
      </Box>
    </Box>
  </Box>
);

export default Menu;


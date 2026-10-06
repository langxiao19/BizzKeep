import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Fade,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn,
  Star,
  Business,
  CheckCircle,
  Email,
  Sms,
  TrendingUp,
  Analytics,
  RestaurantMenu,
  Restaurant,
} from '@mui/icons-material';
import { mapsService, RestaurantSearchResult, RestaurantDetails } from '../../shared/services/mapsService';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const navigate = useNavigate();
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RestaurantSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ description: string; place_id: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Detail dialog states
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetails | null>(null);

  // Claim dialog states
  const [claimOpen, setClaimOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimData, setClaimData] = useState({
    place_id: '',
    owner_name: '',
    owner_email: '',
    owner_phone: '',
    verification_method: 'email' as 'email' | 'phone',
  });
  const [claimId, setClaimId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // Realtime autocomplete
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const timer = setTimeout(async () => {
      console.log('🔍 Starting autocomplete for:', q);
      try {
        const data = await mapsService.autocomplete(q);
        console.log('✅ Autocomplete response:', data);
        setSuggestions(data.predictions || []);
        setShowSuggestions(data.predictions?.length > 0);
      } catch (e) {
        console.error('❌ Autocomplete error:', e);
        // Fallback to demo data when Google API fails
        if (q.length >= 2) {
          const demoSuggestions = [
            { description: `${q.charAt(0).toUpperCase() + q.slice(1)} Restaurant, 123 Main St, New York, NY`, place_id: 'demo_1' },
            { description: `${q.charAt(0).toUpperCase() + q.slice(1)} Bistro, 456 Oak Ave, Los Angeles, CA`, place_id: 'demo_2' },
            { description: `${q.charAt(0).toUpperCase() + q.slice(1)} Cafe, 789 Pine Rd, Chicago, IL`, place_id: 'demo_3' }
          ];
          console.log('🔧 Using demo suggestions due to API error:', demoSuggestions);
          setSuggestions(demoSuggestions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search handler
  const handleSearch = useCallback(async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) {
      setError('Please enter a restaurant name');
      return;
    }

    setShowSuggestions(false);
    try {
      setLoading(true);
      setError('');
      const response = await mapsService.searchRestaurants({ query: searchTerm });
      
      if (response.results.length === 0) {
        setError('No restaurants found. Try a different search term.');
        setSearchResults(response.results);
      } else {
        // Auto-select the first restaurant and navigate to dashboard
        const firstRestaurant = response.results[0];
        
        // Store restaurant data for dashboard
        localStorage.setItem('selected_restaurant', JSON.stringify({
          place_id: firstRestaurant.place_id,
          name: firstRestaurant.name,
          address: firstRestaurant.formatted_address,
          rating: firstRestaurant.rating,
          user_ratings_total: firstRestaurant.user_ratings_total,
          price_level: firstRestaurant.price_level,
          geometry: firstRestaurant.geometry,
          types: firstRestaurant.types,
          photos: firstRestaurant.photos
        }));
        localStorage.setItem('restaurant_verified', 'true');
        
        console.log('🚀 Auto-navigating to dashboard for:', firstRestaurant.name);
        
        // Navigate directly to dashboard
        navigate('/app/home', { 
          state: { 
            message: `Welcome to ${firstRestaurant.name} management dashboard!`,
            restaurant: firstRestaurant
          }
        });
      }
    } catch (err) {
      setError('Failed to search restaurants. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, navigate]);

  const handleViewDetails = async (restaurant: RestaurantSearchResult) => {
    try {
      setDetailsOpen(true);
      const details = await mapsService.getRestaurantDetails(restaurant.place_id);
      setSelectedRestaurant(details);
    } catch (err) {
      setError('Failed to load restaurant details');
      console.error('Details error:', err);
    }
  };

  const handleClaimRestaurant = (restaurant: RestaurantSearchResult) => {
    setClaimData({ ...claimData, place_id: restaurant.place_id });
    setClaimOpen(true);
  };

  const handleSubmitClaim = async () => {
    if (!claimData.owner_name || !claimData.owner_email || !claimData.owner_phone) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setClaimLoading(true);
      setError('');
      const response = await mapsService.claimRestaurant(claimData);
      setClaimId(response.claim_id);
      setClaimOpen(false);
      setVerifyOpen(true);
    } catch (err) {
      setError('Failed to submit claim. Please try again.');
      console.error('Claim error:', err);
    } finally {
      setClaimLoading(false);
    }
  };

  const handleVerifyClaim = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit verification code');
      return;
    }

    try {
      setClaimLoading(true);
      setError('');
      const response = await mapsService.verifyRestaurantClaim({
        claim_id: claimId,
        verification_code: verificationCode,
      });
      
      localStorage.setItem('restaurant_access_token', response.restaurant_access_token);
      localStorage.setItem('restaurant_verified', 'true');
      
      navigate('/app/home', { 
        state: { 
          message: 'Restaurant verified successfully! Welcome to BizKeeper management system.' 
        }
      });
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      console.error('Verification error:', err);
    } finally {
      setClaimLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      pt: { xs: 4, md: 8 },
      pb: 8
    }}>
      <Container maxWidth="lg">
        {/* Main Headline */}
        <Box textAlign="center" mb={8}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
            <Typography 
              variant="caption" 
              sx={{ 
                bgcolor: '#7443C0',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontWeight: 600
              }}
            >
              #1 Top-Rated Restaurant Management System
            </Typography>
            <Rating value={4.8} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              4.8 ⭐ across 2,847 reviews
            </Typography>
          </Box>
          
          <Typography 
            variant="h1" 
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#1a1a1a',
              mb: 3,
              maxWidth: 900,
              mx: 'auto'
            }}
          >
            Find and claim your restaurant to start growing online
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              mb: 6,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Search for your restaurant and unlock powerful management tools to boost your sales
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
          gap={4}
          mb={8}
        >
          {[
            { icon: <Analytics />, title: 'Real-time Analytics', desc: 'Track performance metrics and customer insights' },
            { icon: <TrendingUp />, title: 'Sales Growth Tools', desc: 'AI-powered recommendations to increase revenue' },
            { icon: <RestaurantMenu />, title: 'Menu Optimization', desc: 'Smart menu analysis and pricing strategies' }
          ].map((feature, index) => (
            <Paper 
              key={index}
              elevation={0}
              sx={{ 
                p: 3, 
                textAlign: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 107, 53, 0.1)'
              }}
            >
              <Box sx={{ color: '#7443C0', mb: 2, fontSize: '3rem' }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.desc}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Search Section */}
        <Paper 
          elevation={4}
          sx={{ 
            p: 4,
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            position: 'relative'
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#1a1a1a' }}>
              Search for Your Restaurant
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your restaurant name to get started
            </Typography>
          </Box>

          {/* Search Input */}
          <Box position="relative" mb={4}>
            <TextField
              placeholder="Type your restaurant name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 64,
                  fontSize: '1.2rem',
                  bgcolor: '#f8f9fa',
                  '&:hover': {
                    bgcolor: '#e9ecef'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '1.5rem', color: '#7443C0' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={() => handleSearch()}
                      disabled={loading}
                      sx={{ 
                        bgcolor: '#7443C0',
                        '&:hover': { bgcolor: '#5C359A' },
                        height: 48,
                        px: 3,
                        borderRadius: 2
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            {/* Modern Autocomplete Suggestions - Floating Up */}
            {showSuggestions && suggestions.length > 0 && (
              <Fade in={showSuggestions}>
                <Paper 
                  elevation={16}
                  sx={{ 
                    position: 'absolute',
                    bottom: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    mb: 1,
                    maxHeight: 400,
                    overflow: 'hidden',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    border: '1px solid rgba(255, 107, 53, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box sx={{ 
                    p: 2, 
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    background: 'linear-gradient(90deg, #7443C0, #5C359A)'
                  }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: 'white',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <LocationOn sx={{ fontSize: 18 }} />
                      Restaurant Suggestions
                    </Typography>
                  </Box>
                  
                  <List sx={{ py: 0, maxHeight: 300, overflow: 'auto' }}>
                    {suggestions.map((suggestion, index) => (
                      <ListItem key={suggestion.place_id} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setShowSuggestions(false);
                            handleSearch(suggestion.description);
                          }}
                          sx={{ 
                            py: 2,
                            px: 3,
                            '&:hover': { 
                              backgroundColor: 'rgba(255, 107, 53, 0.05)',
                              transform: 'translateX(4px)',
                              transition: 'all 0.2s ease'
                            },
                            borderBottom: index < suggestions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
                          }}
                        >
                          <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%', 
                            backgroundColor: '#7443C0', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mr: 2,
                            flexShrink: 0
                          }}>
                            <Restaurant sx={{ color: 'white', fontSize: 20 }} />
                          </Box>
                          <ListItemText 
                            primary={
                              <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#1a1a1a' }}>
                                {suggestion.description.split(',')[0]}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                {suggestion.description.split(',').slice(1).join(',').trim()}
                              </Typography>
                            }
                          />
                          <Box sx={{ ml: 2, opacity: 0.7 }}>
                            <Typography variant="caption" sx={{ color: '#7443C0', fontWeight: 600 }}>
                              Select
                            </Typography>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  
                  <Box sx={{ 
                    p: 2, 
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    backgroundColor: 'rgba(248, 249, 250, 0.8)',
                    textAlign: 'center'
                  }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Click to select • {suggestions.length} results found
                    </Typography>
                  </Box>
                </Paper>
              </Fade>
            )}
          </Box>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mb: 4 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Search Results */}
          {loading && searchResults.length === 0 ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress size={60} sx={{ color: '#7443C0' }} />
            </Box>
          ) : searchResults.length > 0 && (
            <Box>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Found {searchResults.length} restaurants
              </Typography>
              
              <List>
                {searchResults.map((restaurant) => (
                  <Paper 
                    key={restaurant.place_id}
                    elevation={1}
                    sx={{ mb: 2, '&:hover': { boxShadow: 4 } }}
                  >
                    <ListItem sx={{ p: 3 }}>
                      <Box width="100%">
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                          <Box flex={1}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                              {restaurant.name}
                            </Typography>
                            
                            <Box display="flex" alignItems="center" mb={1}>
                              <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                {restaurant.formatted_address}
                              </Typography>
                            </Box>

                            {restaurant.rating && (
                              <Box display="flex" alignItems="center" mb={1}>
                                <Rating value={restaurant.rating} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary" ml={1}>
                                  {restaurant.rating} ({restaurant.user_ratings_total || 0} reviews)
                                </Typography>
                                {restaurant.price_level && (
                                  <Chip 
                                    label={mapsService.formatPriceLevel(restaurant.price_level)} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ ml: 2 }}
                                  />
                                )}
                              </Box>
                            )}
                          </Box>

                          <Box display="flex" gap={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleViewDetails(restaurant)}
                              sx={{ minWidth: 100 }}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                // Store restaurant data for dashboard
                                localStorage.setItem('selected_restaurant', JSON.stringify({
                                  place_id: restaurant.place_id,
                                  name: restaurant.name,
                                  address: restaurant.formatted_address,
                                  rating: restaurant.rating,
                                  user_ratings_total: restaurant.user_ratings_total,
                                  price_level: restaurant.price_level,
                                  geometry: restaurant.geometry
                                }));
                                localStorage.setItem('restaurant_verified', 'true');
                                
                                // Navigate directly to dashboard
                                navigate('/app/home', { 
                                  state: { 
                                    message: `Welcome to ${restaurant.name} management dashboard!`,
                                    restaurant: restaurant
                                  }
                                });
                              }}
                              sx={{ 
                                bgcolor: '#7443C0',
                                '&:hover': { bgcolor: '#5C359A' },
                                minWidth: 120
                              }}
                              startIcon={<Business />}
                            >
                              Manage Restaurant
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Restaurant Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>Restaurant Details</DialogTitle>
        <DialogContent>
          {selectedRestaurant && (
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {selectedRestaurant.name}
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                  {selectedRestaurant.formatted_address}
                </Typography>
              </Box>
              {selectedRestaurant.rating && (
                <Box display="flex" alignItems="center" mb={2}>
                  <Star sx={{ mr: 1, color: '#FFD700' }} />
                  <Typography variant="body1">
                    {selectedRestaurant.rating}/5.0 ({selectedRestaurant.user_ratings_total} reviews)
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          {selectedRestaurant && (
            <Button 
              variant="contained"
              onClick={() => {
                setDetailsOpen(false);
                handleClaimRestaurant(selectedRestaurant);
              }}
              sx={{ bgcolor: '#7443C0', '&:hover': { bgcolor: '#5C359A' } }}
            >
              Claim This Restaurant
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Claim Restaurant Dialog */}
      <Dialog open={claimOpen} onClose={() => setClaimOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Claim Your Restaurant</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={3}>
            To claim this restaurant, please provide your contact information.
          </Typography>
          
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Owner Name"
              value={claimData.owner_name}
              onChange={(e) => setClaimData({ ...claimData, owner_name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              type="email"
              value={claimData.owner_email}
              onChange={(e) => setClaimData({ ...claimData, owner_email: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              value={claimData.owner_phone}
              onChange={(e) => setClaimData({ ...claimData, owner_phone: e.target.value })}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Verification Method</InputLabel>
              <Select
                value={claimData.verification_method}
                onChange={(e) => setClaimData({ ...claimData, verification_method: e.target.value as 'email' | 'phone' })}
                label="Verification Method"
              >
                <MenuItem value="email">
                  <Box display="flex" alignItems="center">
                    <Email sx={{ mr: 1 }} />
                    Email Verification
                  </Box>
                </MenuItem>
                <MenuItem value="phone">
                  <Box display="flex" alignItems="center">
                    <Sms sx={{ mr: 1 }} />
                    SMS Verification
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClaimOpen(false)} disabled={claimLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitClaim}
            variant="contained"
            disabled={claimLoading}
            sx={{ bgcolor: '#7443C0', '&:hover': { bgcolor: '#5C359A' } }}
            startIcon={claimLoading ? <CircularProgress size={16} /> : <CheckCircle />}
          >
            {claimLoading ? 'Submitting...' : 'Submit Claim'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog open={verifyOpen} onClose={() => setVerifyOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Verify Your Restaurant</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={3}>
            We've sent a 6-digit verification code to your {claimData.verification_method}.
          </Typography>
          
          <TextField
            label="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            fullWidth
            placeholder="123456"
            inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.5rem' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVerifyOpen(false)} disabled={claimLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleVerifyClaim}
            variant="contained"
            disabled={claimLoading || verificationCode.length !== 6}
            sx={{ bgcolor: '#7443C0', '&:hover': { bgcolor: '#5C359A' } }}
            startIcon={claimLoading ? <CircularProgress size={16} /> : <CheckCircle />}
          >
            {claimLoading ? 'Verifying...' : 'Verify & Start Managing'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Search;


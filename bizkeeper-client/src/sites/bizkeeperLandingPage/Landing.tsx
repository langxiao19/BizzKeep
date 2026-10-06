import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Chip,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Star,
  Close,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  CardGiftcard,
  Smartphone,
  Restaurant,
  Campaign,
  Add,
  Remove,
  Language,
  ShoppingCart,
  LocalDining,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import BizKeeperLogo from '../../shared/components/logo';

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Newsletter subscription states
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeName, setSubscribeName] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  
  // FAQ expanded state
  const [expandedFAQ, setExpandedFAQ] = useState<string | false>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      
      // Mock login
      setTimeout(() => {
        localStorage.setItem('restaurant_token', 'mock_jwt_token_' + Date.now());
        localStorage.setItem('restaurant_user', JSON.stringify({
          id: 'mock_user_id',
          name: 'Restaurant Manager',
          email: values.email,
          role: 'restaurant_owner'
        }));
        navigate('/app/home');
      }, 1000);
    },
  });

  const handleQuickDemo = () => {
    localStorage.setItem('restaurant_token', 'demo_token');
    localStorage.setItem('restaurant_user', JSON.stringify({
      id: 'demo_user',
      name: 'Demo User',
      email: 'demo@restaurant.com',
      role: 'restaurant_owner'
    }));
    navigate('/app/home');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscribeEmail) {
      setSubscribeError('Please enter your email address');
      return;
    }

    try {
      setSubscribeLoading(true);
      setSubscribeError('');

      // Simulate subscription (services will be wired up in later phases)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubscribeSuccess(true);
      setSubscribeEmail('');
      setSubscribeName('');
    } catch (err) {
      setSubscribeError('Failed to subscribe. Please try again.');
      console.error('Subscribe error:', err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  const handleFAQChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFAQ(isExpanded ? panel : false);
  };

  const features = [
    {
      icon: <Language sx={{ fontSize: 40, color: '#7443C0' }} />,
      title: 'Website & Mobile App',
      description: 'Get your own branded website and mobile app so customers can find you, order online, and stay connected.'
    },
    {
      icon: <ShoppingCart sx={{ fontSize: 40, color: '#7443C0' }} />,
      title: 'Online Ordering',
      description: 'Enable pickup, delivery, and dine-in ordering directly from your website or app—without extra commission fees.'
    },
    {
      icon: <CardGiftcard sx={{ fontSize: 40, color: '#7443C0' }} />,
      title: 'Loyalty & Rewards',
      description: 'Keep customers coming back with points, rewards, and personalized offers—just like big national chains.'
    },
    {
      icon: <Campaign sx={{ fontSize: 40, color: '#7443C0' }} />,
      title: 'Automated Marketing',
      description: 'Let AI handle your campaigns. Automatically publish blogs, promotions, and updates to Google, Yelp, and your website.'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      icon: <Smartphone sx={{ fontSize: 40, color: '#7443C0' }} />,
      title: 'Build Your Online Presence',
      description: 'No website or mobile app? No problem. We\'ll help you set up your digital storefront so customers can find you, order online, and stay connected.'
    },
    {
      step: 2,
      icon: <CardGiftcard sx={{ fontSize: 40, color: '#7443C0' }} />,
      title: 'Engage with Loyalty Programs',
      description: 'Keep your regulars coming back. Use our built-in CRM and loyalty system to reward repeat customers just like national chains.'
    },
    {
      step: 3,
      icon: <Campaign sx={{ fontSize: 40, color: '#7443C0' }} />,
      title: 'Run Smart Campaigns',
      description: 'Reach your customers directly with SMS and email campaigns. Promote new offers, boost sales, and keep your business top of mind.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small cafés and single-location restaurants. Get the essentials you need to manage your menu, take reservations, and keep customers happy.',
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Best for growing restaurants and café chains. Grow your business with loyalty programs, automated marketing, and AI-powered insights—all managed from one place.',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'Custom solutions for multi-location groups. Includes white-label options, dedicated account manager, and advanced integrations tailored to your needs.',
      popular: false
    }
  ];

  const faqs = [
    {
      id: 'faq1',
      question: 'Do I need a website or app before using BizKeeper?',
      answer: 'If you already have a website, we can help refine it based on your preferences. If not, we\'ll quickly build a website or mobile app for your business so customers can find you and place orders online.'
    },
    {
      id: 'faq2',
      question: 'How does BizKeeper help me get and keep more customers?',
      answer: 'BizKeeper provides built-in CRM and messaging tools. You can send personalized SMS and email campaigns, run loyalty programs, and keep your regulars engaged with rewards—just like big national chains.'
    },
    {
      id: 'faq3',
      question: 'Is my data safe with BizKeeper?',
      answer: 'Absolutely. We take privacy and security seriously. All your data is encrypted, stored securely, and never shared without your consent. You can focus on running your business while we handle the security.'
    },
    {
      id: 'faq4',
      question: 'Can I use BizKeeper for multiple locations or stores?',
      answer: 'Yes. Whether you run one café or multiple restaurants, BizKeeper makes it easy to manage all your locations from a single dashboard.'
    }
  ];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', color: '#2d333a' }}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <BizKeeperLogo size={32} sx={{ color: '#7443C0', mr: 2 }} />
            <Typography variant="h6" fontWeight={600} color="#2d333a" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              BizKeeper
            </Typography>
          </Box>
          <Box display="flex" gap={{ xs: 1, sm: 2 }} sx={{ flexWrap: 'nowrap' }}>
            <Button 
              color="inherit" 
              href="#features"
              sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Features
            </Button>
            <Button 
              color="inherit" 
              href="#pricing"
              sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Pricing
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setLoginOpen(true)}
              sx={{ 
                borderColor: '#7443C0', 
                color: '#7443C0',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                px: { xs: 1, sm: 2 },
                '&:hover': { borderColor: '#5C359A', backgroundColor: 'rgba(116, 67, 192, 0.04)' }
              }}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #7443C0 0%, #7443C0 100%)',
        color: 'white',
        py: { xs: 6, sm: 8, md: 10 }
      }}>
        <Container maxWidth="lg">
          <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} alignItems="center" gap={4}>
            <Box flex={1} minWidth={300} sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
              <Typography variant="h2" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                AI-Powered Local Biz Management
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' } }}>
                Optimize your business operations with intelligent analytics, 
                automated insights, and data-driven decision making.
              </Typography>
              <Box display="flex" flexDirection="column" gap={2} justifyContent={{ xs: 'center', lg: 'flex-start' }}>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/search')}
                    sx={{
                      backgroundColor: 'white',
                      color: '#7443C0',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' },
                      '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                  >
                    Analyze My Store
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => setLoginOpen(true)}
                    sx={{ 
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' },
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/digitalcafe')}
                    startIcon={<LocalDining />}
                    sx={{
                      backgroundColor: '#8B4513',
                      color: 'white',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' },
                      '&:hover': { backgroundColor: '#A0522D' }
                    }}
                  >
                    Demo Website
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={handleQuickDemo}
                    sx={{ 
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' },
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Demo Studio
                  </Button>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mt={4} justifyContent={{ xs: 'center', lg: 'flex-start' }}>
                <Box display="flex" mr={2}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} sx={{ color: '#FFD700', fontSize: { xs: 16, sm: 20 } }} />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                  Trusted by 10,000+ restaurants worldwide
                </Typography>
              </Box>
            </Box>
            <Box flex={1} minWidth={300}>
              <Box sx={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 4,
                p: 4,
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="h6" gutterBottom>
                  🚀 Increase Revenue by 25%
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Our AI algorithms help restaurants optimize pricing, reduce waste, and improve customer satisfaction.
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2">Revenue Growth</Typography>
                  <Typography variant="body2" fontWeight={600}>+25%</Typography>
                </Box>
                <Box sx={{ 
                  height: 8, 
                  backgroundColor: 'rgba(255,255,255,0.3)', 
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    height: '100%', 
                    width: '75%', 
                    backgroundColor: 'white',
                    borderRadius: 4
                  }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 10, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Everything You Need to Grow Your Business
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Powerful tools designed for restaurants and cafés.
            </Typography>
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            {features.map((feature, index) => (
              <Box key={index} flex={1} minWidth={300}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Box mb={2}>{feature.icon}</Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              How It Works
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Get started with BizKeeper in 3 simple steps.
            </Typography>
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            {howItWorks.map((step, index) => (
              <Box key={index} flex={1} minWidth={300}>
                <Card sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                  border: '2px solid #f0f0f0',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: '#7443C0',
                    boxShadow: '0 8px 25px rgba(116, 67, 192, 0.15)'
                  }
                }}>
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Box 
                      sx={{
                        width: { xs: 50, sm: 60 },
                        height: { xs: 50, sm: 60 },
                        borderRadius: '50%',
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        border: '2px solid #7443C0'
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      gutterBottom
                      sx={{ color: '#7443C0', fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                    >
                      Step {step.step}: {step.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.6, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Choose the plan that's right for your business
            </Typography>
          </Box>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} justifyContent="center">
            {pricingPlans.map((plan, index) => (
              <Box key={index} flex={1} minWidth={320} maxWidth={400}>
                <Card sx={{ 
                  height: '100%',
                  position: 'relative',
                  border: plan.popular ? '2px solid #7443C0' : '1px solid #e0e0e0',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  {plan.popular && (
                    <Chip 
                      label="Most Popular" 
                      sx={{ 
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#7443C0',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {plan.name}
                    </Typography>
                    <Box mb={2}>
                      <Typography variant="h3" fontWeight={700} component="span">
                        {plan.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary" component="span">
                        {plan.period}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary" mb={4} sx={{ lineHeight: 1.6, textAlign: 'center' }}>
                      {plan.description}
                    </Typography>
                    <Button 
                      variant={plan.popular ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      onClick={handleQuickDemo}
                      sx={{
                        mb: 2,
                        ...(plan.popular ? {
                          backgroundColor: '#7443C0',
                          '&:hover': { backgroundColor: '#5C359A' }
                        } : {
                          borderColor: '#7443C0',
                          color: '#7443C0',
                          '&:hover': { borderColor: '#5C359A', backgroundColor: 'rgba(116, 67, 192, 0.04)' }
                        })
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
          
          {/* Social Proof */}
          <Box textAlign="center" mt={6}>
            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
              Trusted by 10,000+ restaurants and cafés worldwide.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 10, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              FAQs
            </Typography>
          </Box>
          <Box>
            {faqs.map((faq) => (
              <Accordion
                key={faq.id}
                expanded={expandedFAQ === faq.id}
                onChange={handleFAQChange(faq.id)}
                sx={{
                  mb: 2,
                  borderRadius: '8px !important',
                  backgroundColor: '#e9ecef',
                  border: '1px solid #dee2e6',
                  boxShadow: 'none',
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    backgroundColor: 'white',
                    borderColor: '#7443C0',
                    boxShadow: '0 4px 12px rgba(116, 67, 192, 0.15)',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={
                    expandedFAQ === faq.id ? 
                      <Remove sx={{ color: '#7443C0' }} /> : 
                      <Add sx={{ color: '#666' }} />
                  }
                  sx={{
                    minHeight: 60,
                    px: 3,
                    py: 2,
                    '&.Mui-expanded': {
                      minHeight: 60,
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: 0,
                      '&.Mui-expanded': {
                        margin: 0,
                      }
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    sx={{ 
                      color: expandedFAQ === faq.id ? '#7443C0' : '#2d333a',
                      fontSize: '1.1rem'
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    px: 3,
                    pb: 3,
                    pt: 0,
                    backgroundColor: 'white'
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#495057',
                      lineHeight: 1.6,
                      fontSize: '1rem'
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Newsletter Subscription Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: '#7443C0' }}>
              Stay Updated with Special Offers!
            </Typography>
            <Typography variant="h6" color="textSecondary" mb={4}>
              Get exclusive deals, new feature announcements, and restaurant management tips.
            </Typography>
            
            {subscribeSuccess ? (
              <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
                <CardGiftcard sx={{ fontSize: 48, color: '#2E8B57', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ color: '#2E8B57' }}>
                  Welcome to our community!
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Check your email for a special welcome offer and the latest updates.
                </Typography>
              </Box>
            ) : (
              <Card sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
                <form onSubmit={handleSubscribe}>
                  <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                      label="Your Name (Optional)"
                      value={subscribeName}
                      onChange={(e) => setSubscribeName(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                    
                    {subscribeError && (
                      <Box sx={{ color: 'error.main', textAlign: 'left' }}>
                        <Typography variant="body2">{subscribeError}</Typography>
                      </Box>
                    )}
                    
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={subscribeLoading}
                      sx={{
                        backgroundColor: '#7443C0',
                        '&:hover': { backgroundColor: '#5C359A' },
                        py: 1.5,
                      }}
                      startIcon={subscribeLoading ? <CircularProgress size={20} /> : <CardGiftcard />}
                    >
                      {subscribeLoading ? 'Subscribing...' : 'Get Special Offers'}
                    </Button>
                    
                    <Typography variant="caption" color="textSecondary">
                      By subscribing, you agree to receive promotional emails from BizKeeper. 
                      You can unsubscribe at any time.
                    </Typography>
                  </Box>
                </form>
              </Card>
            )}
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#2d333a', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={4}>
            <Box>
              <Box display="flex" alignItems="center" mb={2}>
                <BizKeeperLogo size={32} sx={{ color: '#7443C0', mr: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  BizKeeper
                </Typography>
              </Box>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                AI-powered restaurant management platform helping businesses optimize operations and increase revenue.
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                © 2025 BizKeeper. All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Login Dialog */}
      <Dialog 
        open={loginOpen} 
        onClose={() => setLoginOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ p: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight={600}>
                Sign In to BizKeeper
              </Typography>
              <IconButton onClick={() => setLoginOpen(false)}>
                <Close />
              </IconButton>
            </Box>
            
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  py: 1.5,
                  backgroundColor: '#7443C0',
                  '&:hover': { backgroundColor: '#5C359A' }
                }}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Landing;


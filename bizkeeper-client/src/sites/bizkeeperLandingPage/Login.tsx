import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import BizKeeperLogo from '../../shared/components/logo';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'demo@restaurant.com',
      password: 'password123',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      
      try {
        // Mock login - just simulate a delay and redirect
        setTimeout(() => {
          localStorage.setItem('restaurant_token', 'mock_jwt_token_' + Date.now());
          localStorage.setItem('restaurant_user', JSON.stringify({
            id: 'mock_user_id',
            name: 'Restaurant Owner',
            email: values.email,
            role: 'restaurant_owner'
          }));
          navigate('/app/home');
        }, 1000);
        
      } catch (err: any) {
        setError(err.message || 'Login failed, please try again');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Mock login without form validation
  const handleMockLogin = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('restaurant_token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('restaurant_user', JSON.stringify({
        id: 'mock_user_id',
        name: 'Restaurant Manager',
        email: 'demo@restaurant.com',
        role: 'restaurant_owner'
      }));
      navigate('/app/home');
    }, 500);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <BizKeeperLogo size={48} sx={{ color: 'primary.main', mb: 1 }} />
              <Typography component="h1" variant="h4" fontWeight={600}>
                BizKeeper
              </Typography>
              <Typography variant="body2" color="textSecondary" textAlign="center" mt={1}>
                Sign in to manage your restaurant
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Quick Demo Login Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleMockLogin}
              disabled={loading}
              sx={{ mb: 3, py: 1.5 }}
            >
              {loading ? 'Signing In...' : 'Quick Demo Login'}
            </Button>

            <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ mb: 2 }}>
              Or use the form below
            </Typography>

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
                        onClick={handleClickShowPassword}
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
                variant="outlined"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In with Form'}
              </Button>

              <Box textAlign="center">
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/join')}
                  sx={{ textDecoration: 'none' }}
                >
                  Don't have an account? Sign up
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>

        <Typography variant="body2" color="textSecondary" textAlign="center" mt={4}>
          © 2025 BizKeeper. Built with Advanced Technology
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;


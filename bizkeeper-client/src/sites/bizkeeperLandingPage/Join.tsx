import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Container,
} from '@mui/material';
import { Email, Phone, CardGiftcard } from '@mui/icons-material';

const Join: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emailOptIn: false,
    smsOptIn: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Get source from URL params (e.g., ?source=qr_table_5&location=main_dining)
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('source') || 'qr';
  const location = urlParams.get('location') || '';
  const tableNumber = urlParams.get('table') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email && !formData.phone) {
      setError('Please provide at least an email or phone number');
      return;
    }

    if (!formData.emailOptIn && !formData.smsOptIn) {
      setError('Please agree to receive communications to get your welcome offer');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Simulate API call (services will be wired up in later phases)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess(true);
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Card sx={{ textAlign: 'center', p: 3 }}>
          <CardGiftcard sx={{ fontSize: 64, color: '#7443C0', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ color: '#7443C0' }}>
            Welcome to BizKeeper!
          </Typography>
          <Typography variant="h6" gutterBottom>
            🎉 You're all set!
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for joining us! Your <strong>10% OFF welcome coupon</strong> has been sent to your email.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Use code <strong>WELCOME10</strong> on your next visit.
          </Typography>
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Keep an eye on your inbox for exclusive offers, special events, and delicious updates!
            </Typography>
          </Box>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" gutterBottom sx={{ color: '#7443C0' }}>
              Join BizKeeper
            </Typography>
            <Typography variant="h6" gutterBottom>
              Get 10% OFF your next visit!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign up for exclusive offers and be the first to know about our special events.
            </Typography>
          </Box>

          {/* Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: <Box sx={{ mr: 1, color: 'text.secondary' }}>👤</Box>,
                }}
              />
              
              <TextField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                helperText="We'll send your welcome coupon here"
              />
              
              <TextField
                label="Phone Number (Optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                helperText="For SMS updates about special offers"
              />

              {/* Consent Checkboxes */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  How would you like to hear from us?
                </Typography>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.emailOptIn}
                      onChange={(e) => setFormData({ ...formData, emailOptIn: e.target.checked })}
                      sx={{ color: '#7443C0', '&.Mui-checked': { color: '#7443C0' } }}
                    />
                  }
                  label="Yes, send me email updates about offers and events"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.smsOptIn}
                      onChange={(e) => setFormData({ ...formData, smsOptIn: e.target.checked })}
                      sx={{ color: '#7443C0', '&.Mui-checked': { color: '#7443C0' } }}
                    />
                  }
                  label="Yes, send me SMS updates (optional)"
                />
              </Box>

              {/* Terms */}
              <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  By signing up, you agree to receive promotional communications from BizKeeper. 
                  You can unsubscribe at any time. We respect your privacy and will never share your information.
                  {location && ` • Location: ${location}`}
                  {tableNumber && ` • Table: ${tableNumber}`}
                </Typography>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  backgroundColor: '#7443C0',
                  '&:hover': { backgroundColor: '#5C359A' },
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
                startIcon={loading ? <CircularProgress size={20} /> : <CardGiftcard />}
              >
                {loading ? 'Signing Up...' : 'Get My 10% OFF Coupon'}
              </Button>
            </Box>
          </form>

          {/* Footer */}
          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="text.secondary">
              Already a member? Thank you for your continued support! 
              <br />
              This offer is for new subscribers only.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Join;


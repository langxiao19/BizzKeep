import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  Grid,
} from '@mui/material';
import { Close, Edit, Save, Event } from '@mui/icons-material';
import { Reservation, updateBooking, createBooking } from './bookingService';

interface BookingDetailProps {
  open: boolean;
  onClose: () => void;
  booking?: Reservation | null;
  onSave?: (booking: Reservation) => void;
}

interface FormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  status: Reservation['status'];
  special_requests: string;
}

/**
 * BookingDetail Component
 * 
 * Single item detail / edit page for bookings.
 * Handles:
 * - Customer information editing
 * - Reservation details (date, time, party size)
 * - Status management
 * - Save actions via bookingService
 */
const BookingDetail: React.FC<BookingDetailProps> = ({
  open,
  onClose,
  booking,
  onSave,
}) => {
  const isNew = !booking;
  
  const [formData, setFormData] = useState<FormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    party_size: 2,
    reservation_date: '',
    reservation_time: '18:00',
    status: 'pending',
    special_requests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Reset form when booking changes
  useEffect(() => {
    if (booking) {
      setFormData({
        customer_name: booking.customer_name || '',
        customer_email: booking.customer_email || '',
        customer_phone: booking.customer_phone || '',
        party_size: booking.party_size || 2,
        reservation_date: booking.reservation_date || '',
        reservation_time: booking.reservation_time || '18:00',
        status: booking.status || 'pending',
        special_requests: booking.special_requests || '',
      });
    } else {
      // Reset for new booking
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        party_size: 2,
        reservation_date: '',
        reservation_time: '18:00',
        status: 'pending',
        special_requests: '',
      });
    }
    setError(null);
    setSuccess(null);
  }, [booking, open]);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const validateForm = (): boolean => {
    if (!formData.customer_name.trim()) {
      setError('Customer name is required');
      return false;
    }
    if (!formData.customer_email.trim()) {
      setError('Customer email is required');
      return false;
    }
    if (!formData.customer_phone.trim()) {
      setError('Customer phone is required');
      return false;
    }
    if (!formData.reservation_date) {
      setError('Reservation date is required');
      return false;
    }
    if (!formData.reservation_time) {
      setError('Reservation time is required');
      return false;
    }
    if (formData.party_size < 1) {
      setError('Party size must be at least 1');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let result: Reservation | null;

      if (isNew) {
        result = await createBooking({
          restaurant_id: 'rest-001',
          customer_name: formData.customer_name.trim(),
          customer_email: formData.customer_email.trim(),
          customer_phone: formData.customer_phone.trim(),
          party_size: formData.party_size,
          reservation_date: formData.reservation_date,
          reservation_time: formData.reservation_time,
          status: formData.status,
          special_requests: formData.special_requests.trim() || undefined,
        });
      } else if (booking) {
        result = await updateBooking(booking.id, {
          customer_name: formData.customer_name.trim(),
          customer_email: formData.customer_email.trim(),
          customer_phone: formData.customer_phone.trim(),
          party_size: formData.party_size,
          reservation_date: formData.reservation_date,
          reservation_time: formData.reservation_time,
          status: formData.status,
          special_requests: formData.special_requests.trim() || undefined,
        });
      } else {
        throw new Error('Invalid booking state');
      }

      if (result) {
        setSuccess(isNew ? 'Booking created successfully!' : 'Booking updated successfully!');
        onSave?.(result);
        setTimeout(() => onClose(), 1500);
      } else {
        throw new Error('Failed to save booking');
      }
    } catch (err) {
      console.error('Error saving booking:', err);
      setError(err instanceof Error ? err.message : 'Failed to save booking');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      setSuccess(null);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Box display="flex" alignItems="center">
          <Event sx={{ mr: 2, color: '#7443C0' }} />
          <Typography variant="h6" fontWeight={600}>
            {isNew ? 'New Booking' : 'Edit Booking'}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} disabled={loading} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Error/Success Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {/* Form Fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Customer Name */}
          <TextField
            label="Customer Name"
            value={formData.customer_name}
            onChange={(e) => handleInputChange('customer_name', e.target.value)}
            fullWidth
            required
            disabled={loading}
          />

          {/* Contact Info */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => handleInputChange('customer_email', e.target.value)}
                fullWidth
                required
                disabled={loading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Phone"
                value={formData.customer_phone}
                onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                fullWidth
                required
                disabled={loading}
              />
            </Grid>
          </Grid>

          {/* Date and Time */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Date"
                type="date"
                value={formData.reservation_date}
                onChange={(e) => handleInputChange('reservation_date', e.target.value)}
                fullWidth
                required
                disabled={loading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Time"
                type="time"
                value={formData.reservation_time}
                onChange={(e) => handleInputChange('reservation_time', e.target.value)}
                fullWidth
                required
                disabled={loading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Party Size"
                type="number"
                value={formData.party_size}
                onChange={(e) => handleInputChange('party_size', parseInt(e.target.value, 10) || 1)}
                fullWidth
                required
                disabled={loading}
                inputProps={{ min: 1, max: 20 }}
              />
            </Grid>
          </Grid>

          {/* Status */}
          <FormControl fullWidth disabled={loading}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <MuiMenuItem value="pending">Pending</MuiMenuItem>
              <MuiMenuItem value="confirmed">Confirmed</MuiMenuItem>
              <MuiMenuItem value="cancelled">Cancelled</MuiMenuItem>
              <MuiMenuItem value="completed">Completed</MuiMenuItem>
            </Select>
          </FormControl>

          {/* Special Requests */}
          <TextField
            label="Special Requests"
            value={formData.special_requests}
            onChange={(e) => handleInputChange('special_requests', e.target.value)}
            fullWidth
            multiline
            rows={3}
            disabled={loading}
            placeholder="Any special requests or notes..."
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button onClick={handleClose} disabled={loading} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Save />}
          sx={{
            backgroundColor: '#7443C0',
            '&:hover': { backgroundColor: '#600060' },
          }}
        >
          {loading ? 'Saving...' : isNew ? 'Create Booking' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDetail;


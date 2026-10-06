import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Close,
  Edit,
  CheckCircle,
  AttachMoney,
  Description,
  Restaurant,
  Warning,
} from '@mui/icons-material';

interface MenuItemEditConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  menuIntent: {
    action: string;
    item_name: string;
    field: string;
    value: string;
    original_text: string;
  } | null;
  loading?: boolean;
}

export const MenuItemEditConfirmDialog: React.FC<MenuItemEditConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  menuIntent,
  loading = false,
}) => {
  const getFieldIcon = (field: string) => {
    switch (field.toLowerCase()) {
      case 'price':
        return <AttachMoney sx={{ fontSize: 20, color: 'success.main' }} />;
      case 'description':
        return <Description sx={{ fontSize: 20, color: 'info.main' }} />;
      case 'name':
        return <Restaurant sx={{ fontSize: 20, color: 'primary.main' }} />;
      case 'availability':
      case 'is_available':
        return <CheckCircle sx={{ fontSize: 20, color: 'warning.main' }} />;
      default:
        return <Edit sx={{ fontSize: 20, color: 'text.secondary' }} />;
    }
  };

  const getFieldDisplayName = (field: string) => {
    switch (field.toLowerCase()) {
      case 'price':
        return 'Price';
      case 'description':
        return 'Description';
      case 'name':
        return 'Name';
      case 'availability':
      case 'is_available':
        return 'Availability';
      default:
        return field.charAt(0).toUpperCase() + field.slice(1);
    }
  };

  const getValueDisplay = (field: string, value: string) => {
    switch (field.toLowerCase()) {
      case 'price':
        return `$${value}`;
      case 'availability':
      case 'is_available':
        return value.toLowerCase() === 'unavailable' || value.toLowerCase() === 'false' ? 'Unavailable' : 'Available';
      default:
        return value;
    }
  };

  const getFieldColor = (field: string) => {
    switch (field.toLowerCase()) {
      case 'price':
        return 'success';
      case 'description':
        return 'info';
      case 'name':
        return 'primary';
      case 'availability':
      case 'is_available':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (!menuIntent) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#f8f9fa'
      }}>
        <Box display="flex" alignItems="center">
          <Warning sx={{ mr: 2, color: '#7443C0', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={600}>
            Confirm Menu Item Change
          </Typography>
        </Box>
        <IconButton onClick={onClose} disabled={loading} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Please review the change before confirming. This action will update your menu immediately.
        </Alert>

        {/* Original Voice Input */}
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Your request:
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#7443C0' }}>
            "{menuIntent.original_text}"
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Change Details */}
        <Typography variant="h6" gutterBottom sx={{ color: '#7443C0', fontWeight: 600 }}>
          Change Summary
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Item Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Restaurant sx={{ color: 'text.secondary' }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Menu Item:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#7443C0' }}>
              {menuIntent.item_name}
            </Typography>
          </Box>

          {/* Field Being Changed */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {getFieldIcon(menuIntent.field)}
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Field:
            </Typography>
            <Chip 
              label={getFieldDisplayName(menuIntent.field)}
              color={getFieldColor(menuIntent.field) as any}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* New Value */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CheckCircle sx={{ color: 'success.main' }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              New Value:
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'success.main',
                fontWeight: 600,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                px: 2,
                py: 0.5,
                borderRadius: 1
              }}
            >
              {getValueDisplay(menuIntent.field, menuIntent.value)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Action Preview */}
        <Box sx={{ p: 2, backgroundColor: '#e8f5e8', borderRadius: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            This will:
          </Typography>
          <Typography variant="body1" sx={{ color: '#2E7D32', fontWeight: 500 }}>
            Update the {getFieldDisplayName(menuIntent.field).toLowerCase()} of "{menuIntent.item_name}" to {getValueDisplay(menuIntent.field, menuIntent.value)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', gap: 2 }}>
        <Button 
          onClick={onClose}
          disabled={loading}
          sx={{ color: 'text.secondary' }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
          startIcon={loading ? null : <CheckCircle />}
          sx={{
            backgroundColor: '#7443C0',
            '&:hover': { backgroundColor: '#600060' },
            '&:disabled': {
              backgroundColor: '#cccccc',
              color: '#ffffff'
            },
            minWidth: 140
          }}
        >
          {loading ? 'Updating...' : 'Confirm Change'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

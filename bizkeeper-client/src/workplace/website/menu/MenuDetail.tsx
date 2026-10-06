import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Divider,
  MenuItem as MuiMenuItem,
  Select,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  Edit,
  Save,
  Add,
  AttachMoney,
  Description,
  Restaurant,
  AccessTime,
  Category,
} from '@mui/icons-material';
import { MenuItem, updateMenuItem, addMenuItem } from './menuService';

interface MenuDetailProps {
  open: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  onSave?: (savedItem: MenuItem, isNew: boolean) => void;
  existingCategories?: string[];
}

interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
  preparation_time: string;
  is_available: boolean;
}

const DEFAULT_FORM_DATA: FormData = {
  name: '',
  description: '',
  price: '',
  category: '',
  preparation_time: '15',
  is_available: true,
};

/**
 * MenuDetail Component
 * 
 * Single item detail / edit / add page for menu items.
 * Handles:
 * - Adding new menu items
 * - Editing existing items (name, description, price, availability)
 * - Save actions via menuService
 */
const MenuDetail: React.FC<MenuDetailProps> = ({
  open,
  onClose,
  menuItem,
  onSave,
  existingCategories = [],
}) => {
  const isAddMode = menuItem === null;
  
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Reset form when dialog opens/menuItem changes
  useEffect(() => {
    if (open) {
      if (menuItem) {
        // Edit mode: populate with existing data
        setFormData({
          name: menuItem.name || '',
          description: menuItem.description || '',
          price: menuItem.price?.toString() || '',
          category: menuItem.category || '',
          preparation_time: menuItem.preparation_time?.toString() || '15',
          is_available: menuItem.is_available ?? true,
        });
      } else {
        // Add mode: reset to defaults
        setFormData(DEFAULT_FORM_DATA);
      }
      setError(null);
      setSuccess(null);
    }
  }, [open, menuItem]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear messages when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Item name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Item description is required');
      return false;
    }
    if (!formData.category.trim()) {
      setError('Category is required');
      return false;
    }
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      setError('Please enter a valid price (must be a number >= 0)');
      return false;
    }
    const prepTime = parseInt(formData.preparation_time);
    if (isNaN(prepTime) || prepTime < 0) {
      setError('Please enter a valid preparation time');
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
      if (isAddMode) {
        // Add new menu item
        const newItemData = {
          restaurant_id: 'rest-001', // Default restaurant ID
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: parseFloat(formData.price),
          category: formData.category.trim(),
          preparation_time: parseInt(formData.preparation_time),
          is_available: formData.is_available,
          ingredients: [],
          allergens: [],
        };

        const newItem = await addMenuItem(newItemData);
        setSuccess('Menu item added successfully!');
        onSave?.(newItem, true);

        // Auto-close after a short delay to show success message
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        // Edit existing menu item
        // Prepare updates object with only changed fields
        const updates: {
          name?: string;
          description?: string;
          price?: number;
          is_available?: boolean;
        } = {};

        if (formData.name.trim() !== menuItem!.name) {
          updates.name = formData.name.trim();
        }
        if (formData.description.trim() !== menuItem!.description) {
          updates.description = formData.description.trim();
        }
        if (parseFloat(formData.price) !== menuItem!.price) {
          updates.price = parseFloat(formData.price);
        }
        if (formData.is_available !== menuItem!.is_available) {
          updates.is_available = formData.is_available;
        }

        // Only make API call if there are changes
        if (Object.keys(updates).length === 0) {
          setSuccess('No changes to save');
          setTimeout(() => onClose(), 1500);
          return;
        }

        const result = await updateMenuItem(menuItem!.id, updates);

        if (result.success) {
          setSuccess('Menu item updated successfully!');
          onSave?.(result.updated_item, false);

          // Auto-close after a short delay to show success message
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          throw new Error(result.message || 'Failed to update menu item');
        }
      }
    } catch (err) {
      console.error('Error saving menu item:', err);
      setError(err instanceof Error ? err.message : 'Failed to save menu item');
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

  // Get unique categories for the dropdown
  const categoryOptions = existingCategories.filter(cat => cat !== 'all');

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
          {isAddMode ? (
            <Add sx={{ mr: 2, color: '#7443C0' }} />
          ) : (
            <Edit sx={{ mr: 2, color: '#7443C0' }} />
          )}
          <Typography variant="h6" fontWeight={600}>
            {isAddMode ? 'Add Menu Item' : 'Edit Menu Item'}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} disabled={loading} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Item Info (only show for edit mode) */}
        {!isAddMode && menuItem && (
          <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Item ID: {menuItem.id}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Category: {menuItem.category}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Current Price: ${menuItem.price?.toFixed(2) || '0.00'}
            </Typography>
          </Box>
        )}

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
          {/* Item Name */}
          <TextField
            label="Item Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            fullWidth
            required
            disabled={loading}
            placeholder="e.g., Classic Burger"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Restaurant sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#7443C0',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#7443C0',
              },
            }}
          />

          {/* Category (editable in add mode, shown in edit mode) */}
          {isAddMode && (
            <FormControl fullWidth required>
              <InputLabel 
                id="category-label"
                sx={{
                  '&.Mui-focused': {
                    color: '#7443C0',
                  },
                }}
              >
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                value={formData.category}
                label="Category"
                onChange={(e) => handleInputChange('category', e.target.value)}
                disabled={loading}
                startAdornment={
                  <InputAdornment position="start">
                    <Category sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                }
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7443C0',
                  },
                }}
              >
                {categoryOptions.map((cat) => (
                  <MuiMenuItem key={cat} value={cat}>
                    {cat}
                  </MuiMenuItem>
                ))}
                <MuiMenuItem value="__new__">
                  <em>+ Add New Category</em>
                </MuiMenuItem>
              </Select>
            </FormControl>
          )}

          {/* New Category Input (if selected) */}
          {isAddMode && formData.category === '__new__' && (
            <TextField
              label="New Category Name"
              value=""
              onChange={(e) => handleInputChange('category', e.target.value)}
              fullWidth
              required
              disabled={loading}
              placeholder="e.g., Desserts"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#7443C0',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#7443C0',
                },
              }}
            />
          )}

          {/* Description */}
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            fullWidth
            required
            multiline
            rows={3}
            disabled={loading}
            placeholder="Describe the dish..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                  <Description sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#7443C0',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#7443C0',
              },
            }}
          />

          {/* Price and Prep Time Row */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Price */}
            <TextField
              label="Price"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              fullWidth
              required
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              disabled={loading}
              placeholder="0.00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#7443C0',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#7443C0',
                },
              }}
            />

            {/* Preparation Time */}
            <TextField
              label="Prep Time (min)"
              value={formData.preparation_time}
              onChange={(e) => handleInputChange('preparation_time', e.target.value)}
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
              disabled={loading}
              placeholder="15"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTime sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#7443C0',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#7443C0',
                },
              }}
            />
          </Box>

          <Divider />

          {/* Availability */}
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_available}
                  onChange={(e) => handleInputChange('is_available', e.target.checked)}
                  disabled={loading}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#7443C0',
                      '& + .MuiSwitch-track': {
                        backgroundColor: '#7443C0',
                      },
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Available for Order
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formData.is_available
                      ? 'Customers can order this item'
                      : 'Item is temporarily unavailable'}
                  </Typography>
                </Box>
              }
            />
          </FormControl>
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
            '&:disabled': {
              backgroundColor: '#cccccc',
              color: '#ffffff',
            },
          }}
        >
          {loading ? 'Saving...' : isAddMode ? 'Add Item' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuDetail;

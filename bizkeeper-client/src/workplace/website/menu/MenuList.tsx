import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import {
  AccessTime,
  AttachMoney,
  Inventory,
  Warning,
  CheckCircle,
  Edit,
  Delete,
} from '@mui/icons-material';
import {
  MenuItem,
  loadMenu,
  getCategories,
  filterByCategory,
  formatPrice,
  deleteMenuItem,
} from './menuService';
import MenuDetail from './MenuDetail';
import {
  DataList,
  DataListCardFooter,
  DataListTableActions,
  TableColumn,
  HeaderFilter,
} from '../../../shared/components/dataList';

/**
 * MenuList Component
 *
 * Collection page for menu items.
 * Uses shared DataList for all UI orchestration.
 *
 * Supports full CRUD:
 * - Create: Add new menu items via Add button
 * - Read: Display menu items in cards/table
 * - Update: Edit menu items via Edit button
 * - Delete: Remove menu items via Delete button
 */

interface MenuListProps {
  restaurantId?: string;
}

const MenuList: React.FC<MenuListProps> = ({ restaurantId = 'rest-001' }) => {
  // ============ State ============
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialog, setEditDialog] = useState({
    open: false,
    menuItem: null as MenuItem | null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    item: MenuItem | null;
    loading: boolean;
  }>({
    open: false,
    item: null,
    loading: false,
  });

  // ============ Derived Data ============
  const categories = getCategories(menuItems);

  // Filter by category, then by search query
  const filteredItems = useMemo(() => {
    let items = filterByCategory(menuItems, selectedCategory);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }
    return items;
  }, [menuItems, selectedCategory, searchQuery]);

  // ============ Data Fetching ============
  useEffect(() => {
    loadMenuData();
  }, [restaurantId]);

  const loadMenuData = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await loadMenu();
      setMenuItems(items);
    } catch (err) {
      setError('Failed to load menu data. Please try again.');
      console.error('Error loading menu data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============ Handlers ============
  const handleEditMenuItem = (menuItem: MenuItem) => {
    setEditDialog({ open: true, menuItem });
  };

  const handleCloseEditDialog = () => {
    setEditDialog({ open: false, menuItem: null });
  };

  const handleSaveMenuItem = async (savedItem: MenuItem, isNew: boolean) => {
    if (isNew) {
      // Add new item to the list
      setMenuItems((prevItems) => [...prevItems, savedItem]);
    } else {
      // Update existing item in the list
      setMenuItems((prevItems) =>
        prevItems.map((item) => (item.id === savedItem.id ? savedItem : item))
      );
    }
  };

  const handleAddMenuItem = () => {
    setEditDialog({ open: true, menuItem: null });
  };

  const handleDeleteClick = (menuItem: MenuItem) => {
    setDeleteConfirm({ open: true, item: menuItem, loading: false });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.item) return;

    setDeleteConfirm((prev) => ({ ...prev, loading: true }));

    try {
      await deleteMenuItem(deleteConfirm.item.id);
      // Remove from local state
      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== deleteConfirm.item!.id)
      );
      setDeleteConfirm({ open: false, item: null, loading: false });
    } catch (err) {
      console.error('Error deleting menu item:', err);
      // Keep dialog open to show error or retry
      setDeleteConfirm((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteConfirm.loading) {
      setDeleteConfirm({ open: false, item: null, loading: false });
    }
  };

  // ============ Header Config ============
  const filtersConfig: HeaderFilter[] = categories.map((category) => ({
    key: category,
    label: category === 'all' ? 'All Items' : category,
  }));

  // ============ Card Renderer ============
  const renderMenuCard = (item: MenuItem) => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Image placeholder area */}
      <Box
        sx={{
          width: '100%',
          height: 140,
          backgroundColor: item.image ? 'transparent' : '#f5f5f5',
          borderRadius: 1,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {item.image ? (
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Inventory sx={{ fontSize: 32, color: '#ccc' }} />
        )}
      </Box>

      {/* Title + Status */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            flex: 1,
            mr: 1,
            fontSize: '0.9rem',
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.name}
        </Typography>
        <Tooltip title={item.is_available ? 'Available' : 'Currently Unavailable'}>
          {item.is_available ? (
            <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />
          ) : (
            <Warning sx={{ color: 'warning.main', fontSize: 18 }} />
          )}
        </Tooltip>
      </Box>

      {/* Category */}
      <Chip
        label={item.category}
        size="small"
        sx={{
          mb: 0.5,
          backgroundColor: '#7443C0',
          color: 'white',
          fontSize: '0.7rem',
          height: 20,
          alignSelf: 'flex-start',
        }}
      />

      {/* Description */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          mb: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.3,
          fontSize: '0.8rem',
          flex: 1,
        }}
      >
        {item.description}
      </Typography>

      {/* Price + Time */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Box display="flex" alignItems="center">
          <AttachMoney sx={{ fontSize: 16, color: 'success.main', mr: 0.25 }} />
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', color: 'success.main', fontSize: '0.9rem' }}
          >
            {formatPrice(item.price)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <AccessTime sx={{ fontSize: 14, color: 'text.secondary', mr: 0.25 }} />
          <Typography variant="caption" color="textSecondary">
            {item.preparation_time}m
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <DataListCardFooter
        left={
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
            {item.ingredients.length} ingredients
          </Typography>
        }
        actions={[
          {
            key: 'edit',
            tooltip: 'Edit',
            icon: <Edit />,
            color: '#7443C0',
            onClick: () => handleEditMenuItem(item),
          },
          {
            key: 'delete',
            tooltip: 'Delete',
            icon: <Delete />,
            color: '#d32f2f',
            onClick: () => handleDeleteClick(item),
          },
        ]}
      />
    </Box>
  );

  // ============ Table Columns ============
  const tableColumns: TableColumn<MenuItem>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => (
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.category}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (item) => (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {item.description}
        </Typography>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      align: 'right',
      render: (item) => (
        <Typography variant="body2" fontWeight={600} color="success.main">
          {formatPrice(item.price)}
        </Typography>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (item) => (
        <Chip
          label={item.is_available ? 'Available' : 'Unavailable'}
          size="small"
          color={item.is_available ? 'success' : 'warning'}
          variant="outlined"
        />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (item) => (
        <DataListTableActions
          actions={[
            {
              key: 'edit',
              tooltip: 'Edit',
              icon: <Edit />,
              color: '#7443C0',
              onClick: () => handleEditMenuItem(item),
            },
            {
              key: 'delete',
              tooltip: 'Delete',
              icon: <Delete />,
              color: '#d32f2f',
              onClick: () => handleDeleteClick(item),
            },
          ]}
        />
      ),
    },
  ];

  // ============ Render ============
  return (
    <Box>
      <DataList
        data={filteredItems}
        isLoading={loading}
        error={error}
        filters={filtersConfig}
        activeFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
        filterLabel="Category"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search menu..."
        primaryAction={{
          label: 'Add',
          onClick: handleAddMenuItem,
        }}
        renderCard={renderMenuCard}
        columns={tableColumns}
        getItemKey={(item) => item.id}
        onItemClick={handleEditMenuItem}
        emptyMessage="No items found"
        loadingMessage="Loading menu data..."
      />

      {/* Add/Edit Menu Item Dialog */}
      <MenuDetail
        open={editDialog.open}
        onClose={handleCloseEditDialog}
        menuItem={editDialog.menuItem}
        onSave={handleSaveMenuItem}
        existingCategories={categories}
      />

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.open && deleteConfirm.item && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
          }}
          onClick={handleDeleteCancel}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              p: 3,
              maxWidth: 400,
              width: '90%',
              boxShadow: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Delete Menu Item
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Are you sure you want to delete "<strong>{deleteConfirm.item.name}</strong>"? This
              action cannot be undone.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Box
                component="button"
                onClick={handleDeleteCancel}
                disabled={deleteConfirm.loading}
                sx={{
                  px: 3,
                  py: 1,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  backgroundColor: 'white',
                  cursor: deleteConfirm.loading ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: deleteConfirm.loading ? 'white' : '#f5f5f5',
                  },
                }}
              >
                Cancel
              </Box>
              <Box
                component="button"
                onClick={handleDeleteConfirm}
                disabled={deleteConfirm.loading}
                sx={{
                  px: 3,
                  py: 1,
                  border: 'none',
                  borderRadius: 1,
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  cursor: deleteConfirm.loading ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                  opacity: deleteConfirm.loading ? 0.7 : 1,
                  '&:hover': {
                    backgroundColor: deleteConfirm.loading ? '#d32f2f' : '#b71c1c',
                  },
                }}
              >
                {deleteConfirm.loading ? 'Deleting...' : 'Delete'}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MenuList;

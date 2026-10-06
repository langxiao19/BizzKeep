import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import {
  Person,
  CalendarToday,
  AccessTime,
  Phone,
  Email,
  Groups,
  CheckCircle,
  Cancel,
  Edit,
} from '@mui/icons-material';
import {
  Reservation,
  fetchBookings,
  filterByStatus,
  formatDate,
  formatTime,
  confirmBooking,
  cancelBooking,
} from './bookingService';
import BookingDetail from './BookingDetail';
import {
  DataList,
  DataListCardFooter,
  DataListTableActions,
  TableColumn,
  HeaderFilter,
} from '../../../shared/components/dataList';

/**
 * BookingList Component
 *
 * Collection page for bookings/reservations.
 * Uses shared DataList for all UI orchestration.
 *
 * Thin & declarative - only:
 * - Data fetching
 * - Header configuration (stats, filters, primaryAction)
 * - Table column definitions
 * - Card render function
 * - Confirm/cancel/edit actions
 */

const BookingList: React.FC = () => {
  // ============ State ============
  const [bookings, setBookings] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialog, setEditDialog] = useState({
    open: false,
    booking: null as Reservation | null,
  });

  // Filter by status, then by search query
  const filteredBookings = useMemo(() => {
    let items = filterByStatus(bookings, activeFilter as Reservation['status'] | 'all');
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (booking) =>
          booking.customer_name.toLowerCase().includes(query) ||
          booking.customer_email.toLowerCase().includes(query) ||
          booking.customer_phone.includes(query)
      );
    }
    return items;
  }, [bookings, activeFilter, searchQuery]);

  // ============ Data Fetching ============
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings. Please try again.');
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============ Handlers ============
  const handleConfirm = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const updated = await confirmBooking(id);
      if (updated) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b)));
      }
    } catch (err) {
      console.error('Error confirming booking:', err);
    }
  };

  const handleCancel = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const updated = await cancelBooking(id);
      if (updated) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
    }
  };

  const handleEdit = (booking: Reservation) => {
    setEditDialog({ open: true, booking });
  };

  const handleCloseEdit = () => {
    setEditDialog({ open: false, booking: null });
  };

  const handleSaveBooking = (updatedBooking: Reservation) => {
    setBookings((prev) => prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)));
  };

  const handleAddBooking = () => {
    setEditDialog({ open: true, booking: null });
  };

  const getStatusColor = (status: Reservation['status']): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  // ============ Header Config ============
  const filtersConfig: HeaderFilter[] = [
    { key: 'all', label: 'All Bookings' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  // ============ Card Renderer ============
  const renderBookingCard = (booking: Reservation) => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with icon placeholder */}
      <Box
        sx={{
          width: '100%',
          height: 120,
          backgroundColor: booking.status === 'confirmed' ? '#e8f5e9' : booking.status === 'pending' ? '#fff3e0' : '#ffebee',
          borderRadius: 1,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Groups sx={{ fontSize: 28, color: booking.status === 'confirmed' ? '#4caf50' : booking.status === 'pending' ? '#ff9800' : '#f44336' }} />
      </Box>

      {/* Name + Status */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1, mr: 1, fontSize: '0.9rem', lineHeight: 1.2 }}>
          {booking.customer_name}
        </Typography>
        <Chip
          label={booking.status}
          size="small"
          color={getStatusColor(booking.status)}
          sx={{ textTransform: 'capitalize', fontSize: '0.65rem', height: 18 }}
        />
      </Box>

      {/* Date/Time/Party - condensed */}
      <Box sx={{ mb: 1, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Box display="flex" alignItems="center" gap={0.5}>
          <CalendarToday sx={{ fontSize: 12, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            {formatDate(booking.reservation_date)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <AccessTime sx={{ fontSize: 12, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            {formatTime(booking.reservation_time)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Person sx={{ fontSize: 12, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            {booking.party_size}
          </Typography>
        </Box>
      </Box>

      {/* Contact - condensed */}
      <Box sx={{ mb: 1, flex: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', display: 'block' }}>
          {booking.customer_phone}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
        >
          {booking.customer_email}
        </Typography>
      </Box>

      {/* Footer */}
      <DataListCardFooter
        left={
          booking.status === 'pending' ? (
            <DataListTableActions
              actions={[
                {
                  key: 'confirm',
                  tooltip: 'Confirm',
                  icon: <CheckCircle />,
                  color: 'success.main',
                  onClick: () => handleConfirm(booking.id),
                },
                {
                  key: 'cancel',
                  tooltip: 'Cancel',
                  icon: <Cancel />,
                  color: 'error.main',
                  onClick: () => handleCancel(booking.id),
                },
              ]}
            />
          ) : undefined
        }
        actions={[
          {
            key: 'edit',
            tooltip: 'Edit',
            icon: <Edit />,
            color: '#7443C0',
            onClick: () => handleEdit(booking),
          },
        ]}
      />
    </Box>
  );

  // ============ Table Columns ============
  const tableColumns: TableColumn<Reservation>[] = [
    {
      key: 'customer',
      header: 'Customer',
      render: (booking) => (
        <Box>
          <Typography variant="body2" fontWeight={600}>
            <Person sx={{ mr: 0.5, verticalAlign: 'middle', fontSize: 16 }} />
            {booking.customer_name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {booking.customer_email}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'date',
      header: 'Date & Time',
      render: (booking) => (
        <Box>
          <Typography variant="body2">{formatDate(booking.reservation_date)}</Typography>
          <Typography variant="caption" color="text.secondary">
            {formatTime(booking.reservation_time)}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'partySize',
      header: 'Party',
      align: 'center',
      render: (booking) => <Typography variant="body2">{booking.party_size}</Typography>,
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (booking) => (
        <Chip
          label={booking.status}
          size="small"
          color={getStatusColor(booking.status)}
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (booking) => (
        <DataListTableActions
          actions={[
            ...(booking.status === 'pending'
              ? ([
                  {
                    key: 'confirm',
                    tooltip: 'Confirm',
                    icon: <CheckCircle />,
                    color: 'success.main',
                    onClick: () => handleConfirm(booking.id),
                  },
                  {
                    key: 'cancel',
                    tooltip: 'Cancel',
                    icon: <Cancel />,
                    color: 'error.main',
                    onClick: () => handleCancel(booking.id),
                  },
                ] as const)
              : []),
            {
              key: 'edit',
              tooltip: 'Edit',
              icon: <Edit />,
              color: '#7443C0',
              onClick: () => handleEdit(booking),
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
        data={filteredBookings}
        isLoading={loading}
        error={error}
        filters={filtersConfig}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterLabel="Status"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search bookings..."
        primaryAction={{
          label: 'Add',
          onClick: handleAddBooking,
        }}
        showItemCount={true}
        renderCard={renderBookingCard}
        columns={tableColumns}
        getItemKey={(booking) => booking.id}
        onItemClick={handleEdit}
        emptyMessage="No bookings found"
        loadingMessage="Loading bookings..."
      />

      <BookingDetail
        open={editDialog.open}
        onClose={handleCloseEdit}
        booking={editDialog.booking}
        onSave={handleSaveBooking}
      />
    </Box>
  );
};

export default BookingList;

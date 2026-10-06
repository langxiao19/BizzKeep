/**
 * Booking Service
 * 
 * The only data access layer for the booking module.
 * Handles loading, saving, and managing bookings/reservations.
 * UI files must NOT import demo data directly.
 */

import { Reservation } from '../../../shared/types/restaurant';

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
}

// Demo bookings data for MVP
const demoBookings: Reservation[] = [
  {
    id: 'booking-001',
    restaurant_id: 'rest-001',
    customer_name: 'John Smith',
    customer_email: 'john.smith@example.com',
    customer_phone: '(555) 123-4567',
    party_size: 4,
    reservation_date: '2026-01-10',
    reservation_time: '19:00',
    status: 'confirmed',
    special_requests: 'Window seat preferred',
    created_at: '2026-01-04T10:00:00Z',
  },
  {
    id: 'booking-002',
    restaurant_id: 'rest-001',
    customer_name: 'Sarah Johnson',
    customer_email: 'sarah.j@example.com',
    customer_phone: '(555) 987-6543',
    party_size: 2,
    reservation_date: '2026-01-11',
    reservation_time: '18:30',
    status: 'pending',
    created_at: '2026-01-04T11:30:00Z',
  },
  {
    id: 'booking-003',
    restaurant_id: 'rest-001',
    customer_name: 'Michael Davis',
    customer_email: 'mdavis@example.com',
    customer_phone: '(555) 456-7890',
    party_size: 6,
    reservation_date: '2026-01-12',
    reservation_time: '20:00',
    status: 'pending',
    special_requests: 'Birthday celebration - need dessert with candle',
    created_at: '2026-01-04T14:00:00Z',
  },
];

// In-memory storage for demo
let bookings: Reservation[] = [...demoBookings];

// ============ Data Loading ============

/**
 * Fetch all bookings
 */
export const fetchBookings = async (): Promise<Reservation[]> => {
  // In production, this would be an API call
  return [...bookings];
};

/**
 * Get a single booking by ID
 */
export const getBooking = (id: string): Reservation | undefined => {
  return bookings.find((b) => b.id === id);
};

/**
 * Calculate booking statistics
 */
export const getStats = (reservations: Reservation[]): BookingStats => {
  return {
    total: reservations.length,
    pending: reservations.filter((b) => b.status === 'pending').length,
    confirmed: reservations.filter((b) => b.status === 'confirmed').length,
    cancelled: reservations.filter((b) => b.status === 'cancelled').length,
  };
};

/**
 * Filter bookings by status
 */
export const filterByStatus = (
  reservations: Reservation[],
  status: Reservation['status'] | 'all'
): Reservation[] => {
  if (status === 'all') {
    return reservations;
  }
  return reservations.filter((b) => b.status === status);
};

/**
 * Filter bookings by date range
 */
export const filterByDateRange = (
  reservations: Reservation[],
  startDate: string,
  endDate: string
): Reservation[] => {
  return reservations.filter((b) => {
    const date = new Date(b.reservation_date);
    return date >= new Date(startDate) && date <= new Date(endDate);
  });
};

// ============ Data Mutations ============

/**
 * Create a new booking
 */
export const createBooking = async (
  booking: Omit<Reservation, 'id' | 'created_at'>
): Promise<Reservation> => {
  const newBooking: Reservation = {
    ...booking,
    id: `booking-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  bookings.push(newBooking);
  return newBooking;
};

/**
 * Update an existing booking
 */
export const updateBooking = async (
  id: string,
  updates: Partial<Reservation>
): Promise<Reservation | null> => {
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;

  bookings[index] = { ...bookings[index], ...updates };
  return bookings[index];
};

/**
 * Delete a booking
 */
export const deleteBooking = async (id: string): Promise<Reservation | null> => {
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;

  const deleted = bookings.splice(index, 1)[0];
  return deleted;
};

/**
 * Confirm a booking
 */
export const confirmBooking = async (id: string): Promise<Reservation | null> => {
  return updateBooking(id, { status: 'confirmed' });
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (id: string): Promise<Reservation | null> => {
  return updateBooking(id, { status: 'cancelled' });
};

// ============ Utilities ============

/**
 * Format date for display
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format time for display
 */
export const formatTime = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// Re-export types for convenience
export type { Reservation };


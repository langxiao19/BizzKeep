export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine_type: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website?: string;
  rating?: number;
  price_range: 'budget' | 'moderate' | 'expensive' | 'fine_dining';
  capacity: number;
  opening_hours: OpeningHours;
  features: string[];
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  is_closed: boolean;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  ingredients: string[];
  allergens: string[];
  is_available: boolean;
  preparation_time: number; // in minutes
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  display_order: number;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  restaurant_id: string;
  name: string; // e.g., "Dinner Menu", "Lunch Menu", "Weekend Specials"
  description?: string;
  categories: MenuCategory[];
  is_active: boolean;
  valid_from?: string | null; // ISO date string
  valid_until?: string | null; // ISO date string
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  restaurant_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  created_at: string;
}

export interface Review {
  id: string;
  restaurant_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  date: string;
  response?: string; // Restaurant response
}

export interface PopularItem {
  name: string;
  orders: number;
}

export interface AnalyticsData {
  restaurant_id: string;
  period: 'daily' | 'weekly' | 'monthly';
  revenue: number;
  orders_count: number;
  avg_order_value: number;
  customer_satisfaction: number;
  popular_items: PopularItem[];
  peak_hours: string[];
}

// Google Maps review types
export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

export interface PainPoint {
  category: string;
  frequency: number;
  impact: 'high' | 'medium' | 'low';
  description: string;
  examples: string[];
}

export interface EconomicImpact {
  estimatedLostRevenue: number;
  potentialCustomersLost: number;
  reputationDamage: number;
  averageSpendPerCustomer: number;
}

export interface ReviewAnalysis {
  totalReviews: number;
  badReviews: GoogleReview[];
  averageRating: number;
  painPoints: PainPoint[];
  economicImpact: EconomicImpact;
  recommendations: string[];
}


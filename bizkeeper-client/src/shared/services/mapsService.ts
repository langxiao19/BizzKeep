import axios from 'axios';
import { buildApiUrl, getAuthHeaders } from '../config/api';

export interface RestaurantSearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
  };
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  photos?: Array<{
    photo_reference: string;
    html_attributions: string[];
  }>;
  types: string[];
  business_status: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  phone?: string;
  website?: string;
}

export interface RestaurantDetails extends RestaurantSearchResult {
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
    profile_photo_url?: string;
  }>;
  editorial_summary?: {
    overview: string;
  };
  current_opening_hours?: {
    open_now: boolean;
    periods: Array<{
      close: { day: number; time: string };
      open: { day: number; time: string };
    }>;
  };
}

export interface RestaurantSearchResponse {
  results: RestaurantSearchResult[];
  status: string;
  next_page_token?: string;
}

export interface ClaimRestaurantRequest {
  place_id: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  verification_method: 'email' | 'phone';
}

export interface ClaimResponse {
  claim_id: string;
  verification_method: string;
  next_step: string;
}

export interface VerifyClaimRequest {
  claim_id: string;
  verification_code: string;
}

export interface VerifyClaimResponse {
  claim_id: string;
  status: string;
  verified_at: string;
  restaurant_access_token: string;
}

export interface ReviewAnalysisResponse {
  restaurant: {
    place_id: string;
    name: string;
    rating: number;
    user_ratings_total: number;
  };
  analysis: {
    totalReviews: number;
    badReviews: Array<{
      author_name: string;
      rating: number;
      text: string;
      time: number;
      profile_photo_url?: string;
    }>;
    averageRating: number;
    painPoints: Array<{
      category: string;
      frequency: number;
      impact: 'high' | 'medium' | 'low';
      description: string;
      examples: string[];
    }>;
    economicImpact: {
      estimatedLostRevenue: number;
      potentialCustomersLost: number;
      reputationDamage: number;
      averageSpendPerCustomer: number;
    };
    recommendations: string[];
  };
}

class MapsService {
  private api = axios.create({
    baseURL: buildApiUrl(''),
    timeout: 30000,
  });

  constructor() {
    // Request interceptor to add auth headers
    this.api.interceptors.request.use((config) => {
      const authHeaders = getAuthHeaders();
      config.headers = {
        ...config.headers,
        ...authHeaders,
      } as any;
      return config;
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('restaurant_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Search restaurants by text query
  async searchRestaurants(params: {
    query: string;
    location?: string;
    radius?: number;
  }): Promise<RestaurantSearchResponse> {
    try {
      const response = await this.api.get('/maps/search', { params });
      return response.data.data;
    } catch (error) {
      console.error('Failed to search restaurants:', error);
      throw error;
    }
  }

  // Autocomplete restaurants by user input
  async autocomplete(input: string): Promise<{ predictions: Array<{ description: string; place_id: string }>; status: string }>{
    const response = await this.api.get('/maps/autocomplete', { params: { input } });
    return response.data.data;
  }

  // Get restaurant details by place_id
  async getRestaurantDetails(placeId: string): Promise<RestaurantDetails> {
    try {
      const response = await this.api.get(`/maps/details/${placeId}`);
      return response.data.data.result;
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
      throw error;
    }
  }

  // Get restaurant photo URL
  async getRestaurantPhoto(photoReference: string, params?: {
    maxwidth?: number;
    maxheight?: number;
  }): Promise<{ photo_url: string; html_attributions: string[] }> {
    try {
      const response = await this.api.get(`/maps/photo/${photoReference}`, { params });
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch restaurant photo:', error);
      throw error;
    }
  }

  // Claim restaurant
  async claimRestaurant(data: ClaimRestaurantRequest): Promise<ClaimResponse> {
    try {
      const response = await this.api.post('/maps/claim', data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to claim restaurant:', error);
      throw error;
    }
  }

  // Verify restaurant claim
  async verifyRestaurantClaim(data: VerifyClaimRequest): Promise<VerifyClaimResponse> {
    try {
      const response = await this.api.post('/maps/verify-claim', data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to verify restaurant claim:', error);
      throw error;
    }
  }

  // Analyze restaurant reviews
  async analyzeRestaurantReviews(placeId: string): Promise<ReviewAnalysisResponse> {
    try {
      const response = await this.api.get(`/maps/analyze/${placeId}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to analyze restaurant reviews:', error);
      throw error;
    }
  }

  // Helper method to format price level
  formatPriceLevel(priceLevel?: number): string {
    switch (priceLevel) {
      case 1: return '$';
      case 2: return '$$';
      case 3: return '$$$';
      case 4: return '$$$$';
      default: return 'N/A';
    }
  }

  // Helper method to format rating stars
  formatRatingStars(rating?: number): string {
    if (!rating) return '☆☆☆☆☆';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }

  // Helper method to get business status color
  getBusinessStatusColor(status: string): string {
    switch (status) {
      case 'OPERATIONAL': return '#2E8B57';
      case 'CLOSED_TEMPORARILY': return '#FF8C00';
      case 'CLOSED_PERMANENTLY': return '#DC143C';
      default: return '#666666';
    }
  }

  // Helper method to format opening hours
  formatOpeningHours(openingHours?: {
    open_now: boolean;
    weekday_text?: string[];
  }): { status: string; color: string; hours?: string[] } {
    if (!openingHours) {
      return { status: 'Hours Unknown', color: '#666666' };
    }

    return {
      status: openingHours.open_now ? 'Open Now' : 'Closed',
      color: openingHours.open_now ? '#2E8B57' : '#DC143C',
      hours: openingHours.weekday_text,
    };
  }
}

export const mapsService = new MapsService();


const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const PYTHON_SERVICE_URL = process.env.REACT_APP_PYTHON_SERVICE_URL || 'http://localhost:3001/api/ai';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  pythonServiceUrl: PYTHON_SERVICE_URL,
};

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}/api${endpoint}`;
};

export const API_ENDPOINTS = {
  // Restaurant management
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAILS: (id: string) => `/restaurants/${id}`,
  
  // Menu management
  MENU_ITEMS: (restaurantId: string) => `/restaurants/${restaurantId}/menu`,
  MENU_ITEM: (restaurantId: string, itemId: string) => `/restaurants/${restaurantId}/menu/${itemId}`,
  
  // Reservations
  RESERVATIONS: '/reservations',
  RESTAURANT_RESERVATIONS: (restaurantId: string) => `/restaurants/${restaurantId}/reservations`,
  
  // Reviews
  REVIEWS: (restaurantId: string) => `/restaurants/${restaurantId}/reviews`,
  
  // Analytics
  ANALYTICS: (restaurantId: string) => `/restaurants/${restaurantId}/analytics`,
  
  // Python tools integration
  PYTHON_TOOLS: '/python-tools',
  PRICE_OPTIMIZATION: '/python-tools/price-optimization',
  DEMAND_FORECAST: '/python-tools/demand-forecast',
  MENU_ANALYSIS: '/python-tools/menu-analysis',
  CUSTOMER_SEGMENTATION: '/python-tools/customer-segmentation',
  
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('restaurant_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};


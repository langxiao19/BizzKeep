import axios from 'axios';
import { buildApiUrl, getAuthHeaders } from '../config/api';
import { Menu, MenuItem } from '../types/restaurant';

class MenuService {
  private api = axios.create({ baseURL: buildApiUrl(''), timeout: 30000 });

  constructor() {
    this.api.interceptors.request.use((config) => {
      const headers = getAuthHeaders();
      config.headers = { ...(config.headers || {}), ...headers } as any;
      return config;
    });
  }

  // Get all menus for a restaurant
  async getMenus(restaurantId: string): Promise<Menu[]> {
    try {
      const response = await this.api.get(`/restaurants/${restaurantId}/menus`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menus:', error);
      // Return mock data for development
      return this.getMockMenus(restaurantId);
    }
  }

  // Get a specific menu by ID
  async getMenu(menuId: string): Promise<Menu | null> {
    try {
      const response = await this.api.get(`/menus/${menuId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu:', error);
      // Return mock data for development
      const mockMenus = this.getMockMenus('rest-001');
      return mockMenus.find(menu => menu.id === menuId) || null;
    }
  }

  // Get menu items by category
  async getMenuItemsByCategory(restaurantId: string, category: string): Promise<MenuItem[]> {
    try {
      const response = await this.api.get(`/restaurants/${restaurantId}/menu-items?category=${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu items by category:', error);
      const mockMenus = this.getMockMenus(restaurantId);
      const allItems = mockMenus.flatMap(menu => 
        menu.categories.flatMap(cat => cat.items)
      );
      return allItems.filter(item => item.category === category);
    }
  }

  // Get available menu items only
  async getAvailableMenuItems(restaurantId: string): Promise<MenuItem[]> {
    try {
      const response = await this.api.get(`/restaurants/${restaurantId}/menu-items?available=true`);
      return response.data;
    } catch (error) {
      console.error('Error fetching available menu items:', error);
      const mockMenus = this.getMockMenus(restaurantId);
      const allItems = mockMenus.flatMap(menu => 
        menu.categories.flatMap(cat => cat.items)
      );
      return allItems.filter(item => item.is_available);
    }
  }

  // Create a new menu
  async createMenu(menu: Omit<Menu, 'id' | 'created_at' | 'updated_at'>): Promise<Menu> {
    try {
      const response = await this.api.post('/menus', menu);
      return response.data;
    } catch (error) {
      console.error('Error creating menu:', error);
      throw error;
    }
  }

  // Update an existing menu
  async updateMenu(menuId: string, updates: Partial<Menu>): Promise<Menu> {
    try {
      const response = await this.api.put(`/menus/${menuId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating menu:', error);
      throw error;
    }
  }

  // Add menu item
  async addMenuItem(menuItem: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    try {
      const response = await this.api.post('/menu-items', menuItem);
      return response.data;
    } catch (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }
  }

  // Update menu item
  async updateMenuItem(itemId: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    try {
      const response = await this.api.put(`/menu-items/${itemId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  }

  // Delete menu item
  async deleteMenuItem(itemId: string): Promise<void> {
    try {
      await this.api.delete(`/menu-items/${itemId}`);
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  }

  // Toggle menu item availability
  async toggleItemAvailability(itemId: string, isAvailable: boolean): Promise<MenuItem> {
    return this.updateMenuItem(itemId, { is_available: isAvailable });
  }

  // Search menu items by name or description
  async searchMenuItems(restaurantId: string, query: string): Promise<MenuItem[]> {
    try {
      const response = await this.api.get(`/restaurants/${restaurantId}/menu-items/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching menu items:', error);
      const mockMenus = this.getMockMenus(restaurantId);
      const allItems = mockMenus.flatMap(menu => 
        menu.categories.flatMap(cat => cat.items)
      );
      const lowercaseQuery = query.toLowerCase();
      return allItems.filter(item => 
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercaseQuery))
      );
    }
  }

  // Load menu from JSON file (for development/testing)
  async loadMenuFromJson(jsonPath?: string): Promise<Menu> {
    try {
      // Import from the proper location in src
      const menuData = await import('../../sites/digitalCafe/data/menus/sample-menu.json');
      return menuData.default || menuData;
    } catch (error) {
      console.error('Error loading menu from JSON:', error);
      throw error;
    }
  }

  // Update menu item using Python service (direct API call)
  async updateMenuItemDirect(itemId: string, updates: {
    name?: string;
    price?: number;
    description?: string;
    is_available?: boolean;
  }): Promise<{ success: boolean; message: string; updated_item: MenuItem; changes: any }> {
    try {
      const response = await fetch('http://localhost:3001/api/ai/update-menu-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId,
          updates: updates
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating menu item via Python service:', error);
      throw error;
    }
  }

  // Update menu item using natural language intent
  async updateMenuItemWithIntent(text: string, intent: string, entities: {
    item_name: string;
    field: string;
    value: string;
  }): Promise<{ success: boolean; message: string; updated_item: MenuItem; changes: any }> {
    try {
      const response = await fetch('http://localhost:3001/api/ai/handle-menu-update-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          intent,
          entities
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating menu item via intent:', error);
      throw error;
    }
  }

  // Mock data for development
  private getMockMenus(restaurantId: string): Menu[] {
    const now = new Date().toISOString();
    return [
      {
        id: 'menu-001',
        restaurant_id: restaurantId,
        name: 'Main Menu',
        description: 'Our signature dishes featuring fresh, locally sourced ingredients',
        categories: [
          {
            id: 'cat-appetizers',
            name: 'Appetizers',
            description: 'Start your meal with these delicious options',
            display_order: 1,
            items: [
              {
                id: 'item-001',
                restaurant_id: restaurantId,
                name: 'Crispy Calamari',
                description: 'Fresh squid rings with marinara sauce and lemon aioli',
                category: 'Appetizers',
                price: 12.99,
                image: '/images/calamari.jpg',
                ingredients: ['squid', 'flour', 'marinara sauce', 'lemon', 'garlic', 'herbs'],
                allergens: ['gluten', 'shellfish'],
                is_available: true,
                preparation_time: 15
              }
            ]
          },
          {
            id: 'cat-mains',
            name: 'Main Courses',
            description: 'Hearty dishes to satisfy your appetite',
            display_order: 2,
            items: [
              {
                id: 'item-003',
                restaurant_id: restaurantId,
                name: 'Grilled Salmon',
                description: 'Atlantic salmon with herb butter, served with roasted vegetables and rice pilaf',
                category: 'Main Courses',
                price: 24.99,
                image: '/images/salmon.jpg',
                ingredients: ['salmon', 'herbs', 'butter', 'broccoli', 'carrots', 'rice', 'onions'],
                allergens: ['fish', 'dairy'],
                is_available: true,
                preparation_time: 25
              }
            ]
          }
        ],
        is_active: true,
        valid_from: '2025-01-01T00:00:00Z',
        valid_until: null,
        created_at: now,
        updated_at: now
      }
    ];
  }
}

export const menuService = new MenuService();


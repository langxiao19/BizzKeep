/**
 * Menu Service
 * 
 * The only data access layer for the menu module.
 * Wraps the shared menuService with website-specific functionality.
 * UI files must NOT import demo data or shared services directly.
 */

import { menuService as sharedMenuService } from '../../../shared/services/menuService';
import { MenuItem, Menu } from '../../../shared/types/restaurant';

export interface MenuStats {
  totalItems: number;
  availableItems: number;
  categories: number;
  avgPrice: number;
}

// ============ Data Loading ============

/**
 * Load menu data from JSON (for demo) or API
 */
export const loadMenu = async (): Promise<MenuItem[]> => {
  try {
    // Try to load from JSON first (for demo)
    const menu = await sharedMenuService.loadMenuFromJson();
    return menu.categories.flatMap(cat => cat.items);
  } catch (jsonError) {
    // Fallback to API call
    const menus = await sharedMenuService.getMenus('rest-001');
    return menus.flatMap(menu => 
      menu.categories.flatMap(cat => cat.items)
    );
  }
};

/**
 * Get full menu with categories
 */
export const getFullMenu = async (): Promise<Menu> => {
  return sharedMenuService.loadMenuFromJson();
};

/**
 * Get menus for a specific restaurant
 */
export const getMenus = async (restaurantId: string): Promise<Menu[]> => {
  return sharedMenuService.getMenus(restaurantId);
};

/**
 * Calculate menu statistics
 */
export const getStats = (items: MenuItem[]): MenuStats => {
  const categories = new Set(items.map(item => item.category));
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  
  return {
    totalItems: items.length,
    availableItems: items.filter(item => item.is_available).length,
    categories: categories.size,
    avgPrice: items.length > 0 ? totalPrice / items.length : 0,
  };
};

/**
 * Get unique categories from menu items
 */
export const getCategories = (items: MenuItem[]): string[] => {
  return ['all', ...Array.from(new Set(items.map(item => item.category)))];
};

/**
 * Filter items by category
 */
export const filterByCategory = (items: MenuItem[], category: string): MenuItem[] => {
  if (category === 'all') {
    return items;
  }
  return items.filter(item => item.category === category);
};

// ============ Data Mutations ============

/**
 * Update a menu item directly via Python service
 */
export const updateMenuItem = async (
  itemId: string,
  updates: {
    name?: string;
    price?: number;
    description?: string;
    is_available?: boolean;
  }
): Promise<{ success: boolean; message: string; updated_item: MenuItem }> => {
  return sharedMenuService.updateMenuItemDirect(itemId, updates);
};

/**
 * Update a menu item with natural language intent
 */
export const updateMenuItemWithIntent = async (
  text: string,
  intent: string,
  entities: {
    item_name: string;
    field: string;
    value: string;
  }
): Promise<{ success: boolean; message: string; updated_item: MenuItem }> => {
  return sharedMenuService.updateMenuItemWithIntent(text, intent, entities);
};

/**
 * Upload a menu file (PDF or image)
 */
export const uploadMenu = async (file: File): Promise<{
  success: boolean;
  message?: string;
  processing?: { items_processed: number };
}> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3001/api/ai/upload-menu', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Add a new menu item
 */
export const addMenuItem = async (
  menuItem: Omit<MenuItem, 'id'>
): Promise<MenuItem> => {
  return sharedMenuService.addMenuItem(menuItem);
};

/**
 * Delete a menu item
 */
export const deleteMenuItem = async (itemId: string): Promise<void> => {
  return sharedMenuService.deleteMenuItem(itemId);
};

/**
 * Toggle menu item availability
 */
export const toggleAvailability = async (
  itemId: string,
  isAvailable: boolean
): Promise<MenuItem> => {
  return sharedMenuService.toggleItemAvailability(itemId, isAvailable);
};

/**
 * Search menu items
 */
export const searchMenuItems = async (
  restaurantId: string,
  query: string
): Promise<MenuItem[]> => {
  return sharedMenuService.searchMenuItems(restaurantId, query);
};

// ============ Utilities ============

/**
 * Format price for display
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Re-export types for convenience
export type { MenuItem, Menu };


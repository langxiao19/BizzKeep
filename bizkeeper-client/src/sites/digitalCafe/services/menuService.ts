// Menu service - data access layer for menu data
// Pages should use this service instead of importing data directly

import sampleMenuData from '../data/menus/sample-menu.json';

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
  preparation_time: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  display_order: number;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  categories: MenuCategory[];
  is_active: boolean;
  valid_from: string;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

// Load menu from local JSON
export const loadMenu = (): Menu => {
  return sampleMenuData as Menu;
};

// Get all menu items
export const getAllMenuItems = (): MenuItem[] => {
  const menu = loadMenu();
  return menu.categories.flatMap(cat => cat.items);
};

// Get menu items by category
export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  const menu = loadMenu();
  const categoryData = menu.categories.find(cat => cat.name === category);
  return categoryData ? categoryData.items : [];
};

// Get all categories
export const getCategories = (): string[] => {
  const menu = loadMenu();
  return menu.categories.map(cat => cat.name);
};

// Get available menu items only
export const getAvailableMenuItems = (): MenuItem[] => {
  return getAllMenuItems().filter(item => item.is_available);
};

// Search menu items
export const searchMenuItems = (query: string): MenuItem[] => {
  const allItems = getAllMenuItems();
  const lowercaseQuery = query.toLowerCase();
  return allItems.filter(item =>
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery)
  );
};


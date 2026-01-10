// Shared types between frontend and backend

// ==================== ENUMS ====================

export type IngredientUnit =
  | 'LBS'
  | 'OZ'
  | 'KG'
  | 'G'
  | 'GALLON'
  | 'LITER'
  | 'ML'
  | 'COUNT'
  | 'CUP'
  | 'TBSP'
  | 'TSP';

export type IngredientCategory =
  | 'PROTEIN'
  | 'PRODUCE'
  | 'PANTRY'
  | 'SAUCE'
  | 'DAIRY'
  | 'SPICE'
  | 'OTHER';

// ==================== USER & AUTH ====================

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

// ==================== RESTAURANT ====================

export interface Restaurant {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  cuisineType: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

// ==================== INGREDIENT ====================

export interface Ingredient {
  id: string;
  name: string;
  unit: IngredientUnit;
  pricePerUnit: number;
  category: IngredientCategory;
  supplier: string | null;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: string;
}

// ==================== RECIPE ====================

export interface RecipeIngredient {
  id: string;
  quantity: number;
  cost: number;
  recipeId: string;
  ingredientId: string;
  ingredient?: Ingredient;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recipe {
  id: string;
  name: string;
  description: string | null;
  servings: number;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: string;
  ingredients?: RecipeIngredient[];
}

// ==================== MENU ITEM ====================

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  sellingPrice: number;
  foodCostPercent: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: string;
  recipeId: string;
  recipe?: Recipe;
}

// ==================== PURCHASE ====================

export interface PurchaseItem {
  id: string;
  quantity: number;
  price: number;
  purchaseId: string;
  ingredientId: string;
  ingredient?: Ingredient;
  createdAt: Date;
}

export interface Purchase {
  id: string;
  supplier: string;
  invoiceNo: string | null;
  totalAmount: number;
  purchasedAt: Date;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: string;
  items?: PurchaseItem[];
}

// ==================== INVENTORY ====================

export interface InventoryCount {
  id: string;
  quantity: number;
  value: number;
  countedAt: Date;
  countedBy: string | null;
  notes: string | null;
  restaurantId: string;
  ingredientId: string;
  ingredient?: Ingredient;
}

// ==================== SALES ====================

export interface SalesRecord {
  id: string;
  quantity: number;
  totalPrice: number;
  soldAt: Date;
  createdAt: Date;
  restaurantId: string;
  menuItemId: string | null;
  menuItem?: MenuItem;
}

// ==================== ANALYTICS / REPORTS ====================

export interface FoodCostReport {
  restaurantId: string;
  period: string;
  beginningInventory: number;
  purchases: number;
  endingInventory: number;
  costOfGoodsSold: number;
  foodSales: number;
  foodCostPercent: number;
}

export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingItems: Array<{
    menuItemId: string;
    menuItemName: string;
    quantity: number;
    revenue: number;
  }>;
}

export interface InventoryValue {
  totalValue: number;
  items: Array<{
    ingredientId: string;
    ingredientName: string;
    quantity: number;
    value: number;
  }>;
}

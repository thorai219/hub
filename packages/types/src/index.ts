// Shared types between frontend and backend

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisineType: string;
  createdAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: 'lbs' | 'oz' | 'kg' | 'g' | 'gallon' | 'liter' | 'count';
  pricePerUnit: number;
  category: 'protein' | 'produce' | 'pantry' | 'sauce' | 'other';
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  totalCost: number;
}

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
  cost: number;
}

export interface MenuItem {
  id: string;
  name: string;
  recipeId: string;
  sellingPrice: number;
  foodCostPercent: number;
}

export interface InventoryCount {
  id: string;
  ingredientId: string;
  quantity: number;
  countedAt: Date;
  countedBy: string;
}

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

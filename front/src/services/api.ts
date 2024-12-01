import type { FoodItem } from '../types/inventory';

const API_BASE_URL = 'http://127.0.0.1:8000/inventory/api';

export async function fetchFoodItems(): Promise<FoodItem[]> {
  const response = await fetch(`${API_BASE_URL}/food-items/`);
  if (!response.ok) {
    throw new Error('Failed to fetch food items');
  }
  return response.json();
}

export async function updateFoodItems(updates: { 
  name: string; 
  quantity: number;
  category?: string;
  unit?: string;
}[]): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/update-food-items/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update food items');
  }
}
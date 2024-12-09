const API_BASE_URL = 'http://127.0.0.1:8000/inventory/api';

export const getFoodItems = async () => {
  const response = await fetch(`${API_BASE_URL}/food-items/`);
  return response.json();
};

export const getWatchedFoodItems = async () => {
  const response = await fetch(`${API_BASE_URL}/watched-food-items/`);
  return response.json();
};

export const updateWatchedFoodItems = async (items: { name: string; threshold: number }[]) => {
  const response = await fetch(`${API_BASE_URL}/watched-food-items/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  return response.json();
};

export const updateFoodItems = async (items: { name: string; quantity: number }[]) => {
  const response = await fetch(`${API_BASE_URL}/update-food-items/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  return response.json();
};
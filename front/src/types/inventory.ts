export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  category?: string;
  expiryDate?: string;
  lowStockThreshold?: number;
  imageUrl?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StockAlert {
  itemId: string;
  type: 'LOW_STOCK' | 'EXPIRING_SOON' | 'EXPIRED';
  message: string;
}
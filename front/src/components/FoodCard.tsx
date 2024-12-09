import { Check, AlertCircle, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { FoodItem, WatchedFoodItem } from '../types';

interface FoodCardProps {
  item: FoodItem;
  watchedItems: WatchedFoodItem[];
  onUpdate?: (name: string, quantity: number) => void;
}

export default function FoodCard({ item, watchedItems, onUpdate }: FoodCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const watchedItem = watchedItems.find(w => w.name === item.name);
  const isTracked = !!watchedItem;
  const isLow = isTracked && item.quantity <= watchedItem.threshold;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate?.(item.name, quantity);
    setIsEditing(false);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-500/20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white text-lg">
            {item.name}
          </h3>
          {onUpdate && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="0"
                className="w-20 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Quantity: {item.quantity}
            </p>
            <div className="flex items-center space-x-2">
              {isTracked && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Check className="w-3 h-3 mr-1" />
                  Tracked
                </span>
              )}
              {isLow && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Low Stock
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { getFoodItems, getWatchedFoodItems } from '../api';
import { FoodItem, WatchedFoodItem } from '../types';
import { ShoppingCart, Check } from 'lucide-react';

export default function ShoppingList() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [watchedItems, setWatchedItems] = useState<WatchedFoodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [food, watched] = await Promise.all([
        getFoodItems(),
        getWatchedFoodItems(),
      ]);
      setFoodItems(food);
      setWatchedItems(watched);
    };
    fetchData();
  }, []);

  const { neededItems, sufficientItems } = watchedItems.reduce(
    (acc, watched) => {
      const current = foodItems.find(f => f.name === watched.name);
      const currentQty = current?.quantity || 0;
      
      if (currentQty < watched.threshold) {
        acc.neededItems.push({
          name: watched.name,
          current: currentQty,
          needed: watched.threshold,
          toBuy: watched.threshold - currentQty,
        });
      } else {
        acc.sufficientItems.push({
          name: watched.name,
          current: currentQty,
          threshold: watched.threshold,
        });
      }
      
      return acc;
    },
    { neededItems: [] as Array<{ name: string; current: number; needed: number; toBuy: number }>,
      sufficientItems: [] as Array<{ name: string; current: number; threshold: number }> }
  );

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Shopping List</h2>
      
      {/* Items to Buy */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
          Items to Buy
        </h3>
        {neededItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No items needed at the moment</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {neededItems.map((item) => (
                <li key={item.name} className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current: {item.current} / Needed: {item.needed}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium">
                    Buy {item.toBuy}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sufficient Items */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-400">
          Sufficient Stock
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {sufficientItems.map((item) => (
              <li key={item.name} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Current: {item.current} / Threshold: {item.threshold}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                  <Check className="w-4 h-4 mr-1" />
                  In Stock
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
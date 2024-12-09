import { useEffect, useState } from 'react';
import { getFoodItems, getWatchedFoodItems, updateFoodItems } from '../api';
import { FoodItem, WatchedFoodItem } from '../types';
import FoodCard from '../components/FoodCard';

export default function Inventory() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [watchedItems, setWatchedItems] = useState<WatchedFoodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [foodItems, watched] = await Promise.all([
        getFoodItems(),
        getWatchedFoodItems(),
      ]);
      setItems(foodItems);
      setWatchedItems(watched);
    };
    fetchData();
  }, []);

  const handleUpdateItem = async (name: string, quantity: number) => {
    const updatedItems = items.map(item =>
      item.name === name ? { ...item, quantity } : item
    );
    await updateFoodItems(updatedItems);
    setItems(updatedItems);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Inventory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <FoodCard
            key={item.name}
            item={item}
            watchedItems={watchedItems}
            onUpdate={handleUpdateItem}
          />
        ))}
      </div>
    </div>
  );
}
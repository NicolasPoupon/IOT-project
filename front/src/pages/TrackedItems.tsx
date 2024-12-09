import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { getWatchedFoodItems, updateWatchedFoodItems } from '../api';
import { WatchedFoodItem } from '../types';
import TrackedItemCard from '../components/TrackedItemCard';

export default function TrackedItems() {
  const [items, setItems] = useState<WatchedFoodItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', threshold: 1 });

  useEffect(() => {
    getWatchedFoodItems().then(setItems);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItems = [...items, newItem];
    await updateWatchedFoodItems(updatedItems);
    setItems(updatedItems);
    setNewItem({ name: '', threshold: 1 });
  };

  const handleDelete = async (name: string) => {
    const updatedItems = items.filter(item => item.name !== name);
    await updateWatchedFoodItems(updatedItems);
    setItems(updatedItems);
  };

  const handleUpdate = async (name: string, threshold: number) => {
    const updatedItems = items.map(item =>
      item.name === name ? { ...item, threshold } : item
    );
    await updateWatchedFoodItems(updatedItems);
    setItems(updatedItems);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tracked Items</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex gap-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item name"
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-transparent"
            required
          />
          <input
            type="number"
            value={newItem.threshold}
            onChange={(e) => setNewItem({ ...newItem, threshold: parseInt(e.target.value) })}
            min="1"
            className="w-32 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-transparent"
            required
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <TrackedItemCard
            key={item.name}
            item={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
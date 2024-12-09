import { Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { WatchedFoodItem } from '../types';

interface TrackedItemCardProps {
  item: WatchedFoodItem;
  onDelete: (name: string) => void;
  onUpdate: (name: string, threshold: number) => void;
}

export default function TrackedItemCard({ item, onDelete, onUpdate }: TrackedItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [threshold, setThreshold] = useState(item.threshold);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(item.name, threshold);
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
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item.name)}
              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                min="1"
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
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Notify when below: {item.threshold}
          </p>
        )}
      </div>
    </div>
  );
}
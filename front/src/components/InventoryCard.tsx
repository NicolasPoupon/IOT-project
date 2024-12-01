import React, { useState } from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Trash, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FoodItem } from '../types/inventory';

interface InventoryCardProps {
  item: FoodItem;
  onUpdateQuantity: (name: string, quantity: number) => Promise<void>;
  onDelete: (name: string) => Promise<void>;
}

export function InventoryCard({ item, onUpdateQuantity, onDelete }: InventoryCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isLowStock = item.quantity <= (item.lowStockThreshold || 2);
  
  const handleQuantityChange = async (delta: number) => {
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.name, delta);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to remove ${item.name} from inventory?`)) {
      await onDelete(item.name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white relative overflow-hidden group"
    >
      {isUpdating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium">{item.name}</h3>
        {isLowStock && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-amber-500"
          >
            <AlertTriangle className="w-5 h-5" />
          </motion.div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Quantity</span>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 0}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className={`font-medium ${isLowStock ? 'text-amber-500' : 'text-white'}`}>
              {item.quantity} {item.unit || 'pcs'}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Category</span>
          <span className="capitalize">{item.category || 'uncategorized'}</span>
        </div>
        
        {item.expiryDate && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Expires</span>
            <span>{format(new Date(item.expiryDate), 'MMM dd, yyyy')}</span>
          </div>
        )}

        {item.updated_at && (
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Last updated</span>
            <span>{format(new Date(item.updated_at), 'MMM dd, HH:mm')}</span>
          </div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDelete}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
        >
          <Trash className="w-4 h-4" />
          Remove Item
        </motion.button>
      </div>
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Plus } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  onAddItem: () => void;
  isLoading: boolean;
}

export function Header({ onRefresh, onAddItem, isLoading }: HeaderProps) {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-white w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            SmartFridge
          </motion.h1>
          <div className="flex gap-4">
            <motion.button
              onClick={onAddItem}
              className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </motion.button>
            <motion.button
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
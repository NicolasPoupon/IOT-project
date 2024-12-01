import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <motion.div 
      className="flex gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectCategory('all')}
        className={`px-6 ml-2 mt-2 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
          ${selectedCategory === 'all'
            ? 'bg-white text-black'
            : 'bg-white/10 text-white hover:bg-white/20'
          }`}
      >
        All Items
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 mt-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
            ${selectedCategory === category
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
            }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
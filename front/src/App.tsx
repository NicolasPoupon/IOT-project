import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InventoryCard } from './components/InventoryCard';
import { AlertBanner } from './components/AlertBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { AddItemModal } from './components/AddItemModal';
import { fetchFoodItems, updateFoodItems } from './services/api';
import type { FoodItem, StockAlert } from './types/inventory';

function App() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = Array.from(new Set(items.map(item => item.category || 'uncategorized')));
  
  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => (item.category || 'uncategorized') === selectedCategory);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchFoodItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load inventory. Please try again.');
      console.error('Error loading items:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    const newAlerts: StockAlert[] = items
      .filter(item => item.quantity <= (item.lowStockThreshold || 2))
      .map(item => ({
        itemId: item.id,
        type: 'LOW_STOCK',
        message: `${item.name} is running low (${item.quantity} ${item.unit || 'pcs'} remaining)`,
      }));
    
    setAlerts(newAlerts);
  }, [items]);

  const handleUpdateQuantity = async (name: string, delta: number) => {
    try {
      await updateFoodItems([{ name, quantity: delta }]);
      await loadItems();
    } catch (err) {
      setError('Failed to update quantity. Please try again.');
      console.error('Error updating quantity:', err);
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await updateFoodItems([{ name, quantity: 0 }]);
      await loadItems();
    } catch (err) {
      setError('Failed to delete item. Please try again.');
      console.error('Error deleting item:', err);
    }
  };

  const handleAddItem = async (name: string, quantity: number, category?: string, unit?: string) => {
    try {
      await updateFoodItems([{ name, quantity, category, unit }]);
      await loadItems();
      setIsAddModalOpen(false);
    } catch (err) {
      setError('Failed to add item. Please try again.');
      console.error('Error adding item:', err);
    }
  };

  const dismissAlert = (itemId: string) => {
    setAlerts(alerts.filter(alert => alert.itemId !== itemId));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onRefresh={loadItems}
        onAddItem={() => setIsAddModalOpen(true)}
        isLoading={isLoading}
      />
      
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-16">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500"
          >
            {error}
          </motion.div>
        )}

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map(item => (
              <InventoryCard
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <AlertBanner alerts={alerts} onDismiss={dismissAlert} />
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}

export default App;
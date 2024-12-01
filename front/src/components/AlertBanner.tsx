import React from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StockAlert } from '../types/inventory';

interface AlertBannerProps {
  alerts: StockAlert[];
  onDismiss: (id: string) => void;
}

export function AlertBanner({ alerts, onDismiss }: AlertBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full space-y-2">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.itemId}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl text-white"
          >
            <div className="flex items-start">
              <Bell className="w-5 h-5 text-amber-500 mt-0.5" />
              <div className="ml-3 flex-1">
                <p className="text-sm">{alert.message}</p>
              </div>
              <button
                onClick={() => onDismiss(alert.itemId)}
                className="ml-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
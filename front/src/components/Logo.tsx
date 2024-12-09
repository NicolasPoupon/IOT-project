import { Refrigerator } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Refrigerator className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 opacity-30 blur rounded-full" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
        Smart Fridge
      </span>
    </div>
  );
}
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Inventory from './pages/Inventory';
import TrackedItems from './pages/TrackedItems';
import ShoppingList from './pages/ShoppingList';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Inventory />} />
              <Route path="/tracked" element={<TrackedItems />} />
              <Route path="/shopping" element={<ShoppingList />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
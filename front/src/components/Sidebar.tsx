import { Refrigerator, Cctv, NotepadText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const links = [
  { to: '/', icon: Refrigerator, label: 'In my fridge' },
  { to: '/tracked', icon: Cctv, label: 'Tracked Items' },
  { to: '/shopping', icon: NotepadText, label: 'Shopping List' },
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Logo />
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === link.to
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}
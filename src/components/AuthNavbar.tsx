import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';

export function AuthNavbar() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className={`text-xl font-bold ${isDark ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'} transition-colors`}
            >
              YeuSwap
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className={`p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
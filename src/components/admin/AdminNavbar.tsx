import { Sun, Moon, LogOut, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';

export function AdminNavbar() {
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/auth');
  };

  return (
    <nav className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center">
            <Link 
              to="/" 
              className={`text-xl font-bold ${isDark ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'} transition-colors`}
            >
              YeuSwap
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au Dashboard</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                isDark 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-red-600 hover:text-red-500'
              } transition-colors`}
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
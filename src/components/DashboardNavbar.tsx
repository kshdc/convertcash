import { LogOut, Home, RefreshCcw, History, Gift, Sun, Moon, Shield } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function DashboardNavbar({ activeTab, setActiveTab, onLogout }: NavbarProps) {
  const { isDark, toggleTheme } = useThemeStore();

  const navItems = [
    { id: 'home', label: 'Accueil', Icon: Home },
    { id: 'convert', label: 'Convertir', Icon: RefreshCcw },
    { id: 'transactions', label: 'Transactions', Icon: History },
    { id: 'rewards', label: 'Récompenses', Icon: Gift },
    { id: 'admin', label: 'Admin', Icon: Shield, adminOnly: true },
  ];

  return (
    <nav className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to="/" 
              className={`text-xl font-bold ${isDark ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'} transition-colors`}
            >
              YeuSwap
            </Link>
          </div>

          {/* Centered Navigation */}
          <div className="flex">
            <div className="flex space-x-1">
              {navItems.map(({ id, label, Icon, adminOnly }) => {
                if (adminOnly && activeTab !== 'admin') return null;
                
                return (
                  <button
                    key={id}
                    data-tab={id}
                    onClick={() => setActiveTab(id)}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeTab === id
                        ? isDark 
                          ? 'text-white border-b-2 border-white'
                          : 'text-gray-900 border-b-2 border-gray-900'
                        : isDark
                          ? 'text-gray-400 hover:text-white hover:border-b-2 hover:border-white'
                          : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={onLogout}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'} transition-colors`}
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
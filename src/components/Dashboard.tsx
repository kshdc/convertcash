import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardNavbar } from './DashboardNavbar';
import { useThemeStore } from '../store/themeStore';
import ConvertPage from './ConvertPage';
import TransactionList from './transactions/TransactionList';
import Rewards from './Rewards';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [activeTab, setActiveTab] = useState('home');
  const { isDark } = useThemeStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/auth');
  };

  const renderContent = () => {
    const contentClass = `bg-${isDark ? 'gray-800' : 'white'} shadow-lg rounded-lg p-6 transition-colors duration-200`;
    const titleClass = `text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`;
    const textClass = `mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`;

    switch (activeTab) {
      case 'home':
        return (
          <div className={contentClass}>
            <h2 className={titleClass}>
              Bienvenue, {username}!
            </h2>
            <p className={textClass}>
              Vous êtes maintenant connecté à votre compte.
            </p>
          </div>
        );
      case 'convert':
        return <ConvertPage />;
      case 'transactions':
        return (
          <div className={contentClass}>
            <h2 className={`${titleClass} mb-6`}>Historique des transactions</h2>
            <TransactionList />
          </div>
        );
      case 'rewards':
        return (
          <div className={contentClass}>
            <Rewards />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <DashboardNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </div>
    </div>
  );
}
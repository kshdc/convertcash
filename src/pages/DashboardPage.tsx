import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useThemeStore } from '../store/themeStore';
import { ConvertPage } from '../components/ConvertPage';
import TransactionsPage from './TransactionsPage';
import RewardsPage from './RewardsPage';
import { CrispChat } from '../components/CrispChat';

export default function DashboardPage() {
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

  const renderContent = () => {
    const contentClass = `bg-${isDark ? 'gray-800' : 'white'} shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 transition-colors duration-200`;
    const titleClass = `text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`;
    const textClass = `mt-2 text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`;

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
        return <TransactionsPage />;
      case 'rewards':
        return <RewardsPage />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <CrispChat />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
}
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useThemeStore } from '../store/themeStore';
import ConvertPage from './ConvertPage';
import TransactionsPage from './TransactionsPage';
import RewardsPage from './RewardsPage';

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
        return <TransactionsPage />;
      case 'rewards':
        return <RewardsPage />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
}
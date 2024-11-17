import TransactionList from '../components/transactions/TransactionList';
import { useThemeStore } from '../store/themeStore';

export default function TransactionsPage() {
  const { isDark } = useThemeStore();

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-6 transition-colors duration-200`}>
      <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
        Historique des transactions
      </h2>
      <TransactionList />
    </div>
  );
}
import TransactionList from '../components/transactions/TransactionList';
import { useThemeStore } from '../store/themeStore';
import { CrispChat } from '../components/CrispChat';

export default function TransactionsPage() {
  const { isDark } = useThemeStore();

  return (
    <>
      <CrispChat />
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 transition-colors duration-200`}>
        <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-6`}>
          Historique des transactions
        </h2>
        <div className="overflow-x-auto">
          <TransactionList />
        </div>
      </div>
    </>
  );
}
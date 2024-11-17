import { useState, useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { TransactionStatus } from './TransactionStatus';
import { formatDate } from '../../utils/formatDate';
import { Clock, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

interface Transaction {
  id: number;
  payment_type: 'PaySafeCard' | 'Transcash';
  payment_date: string;
  payment_status: string;
  payment_value: number;
  final_amount: number;
  receiver_address: string;
  payment_method: 'crypto' | 'paypal';
  crypto_type?: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { isDark } = useThemeStore();

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:3000/api/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete transaction');
      }

      // Refresh transactions list
      await fetchTransactions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete transaction');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin">
          <Clock className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
        {error}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>Aucune transaction trouvée.</p>
      </div>
    );
  }

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg p-4 text-sm`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleExpand(transaction.id)}
                className="text-current hover:opacity-75 transition-opacity"
              >
                {expandedId === transaction.id ? (
                  <ChevronUp className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
                ) : (
                  <ChevronDown className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
                )}
              </button>
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.payment_type === 'PaySafeCard' ? 'Paysafecard' : 'Transcash'} → {' '}
                  {transaction.payment_method === 'crypto' ? transaction.crypto_type : 'PayPal'}
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {formatDate(new Date(transaction.payment_date))}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <TransactionStatus status={transaction.payment_status} isDark={isDark} />
              <button
                onClick={() => handleDelete(transaction.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'hover:bg-gray-700 text-red-400 hover:text-red-300' 
                    : 'hover:bg-gray-100 text-red-600 hover:text-red-500'
                }`}
                title="Supprimer la transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {expandedId === transaction.id && (
            <div className={`space-y-3 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Montant envoyé</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.payment_value.toFixed(2)} €
                </p>
              </div>
              <div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Adresse de réception</p>
                <p className={`font-medium break-all ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.receiver_address}
                </p>
              </div>
              <div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Montant reçu</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.final_amount.toFixed(2)} €
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { Clock, Users, CreditCard, History } from 'lucide-react';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { TransactionList } from '../components/admin/TransactionList';
import { LogList } from '../components/admin/LogList';
import { Transaction, StatusUpdateResponse } from '../types/transaction';

interface User {
  id: number;
  username: string;
  mail: string;
  rank: string;
  adresse_ip: string;
}

interface Log {
  id: number;
  action: string;
  details: string;
  admin_username: string;
  timestamp: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'transactions' | 'logs'>('users');
  const { isDark } = useThemeStore();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const usersResponse = await fetch('http://localhost:3000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const transactionsResponse = await fetch('http://localhost:3000/api/admin/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const logsResponse = await fetch('http://localhost:3000/api/admin/logs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!usersResponse.ok || !transactionsResponse.ok || !logsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const usersData = await usersResponse.json();
      const transactionsData = await transactionsResponse.json();
      const logsData = await logsResponse.json();

      setUsers(usersData);
      setTransactions(transactionsData);
      setLogs(logsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth');
          return;
        }

        const response = await fetch('http://localhost:3000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();
        if (userData.rank !== 'admin') {
          navigate('/dashboard');
          return;
        }

        fetchData();
      } catch (err) {
        navigate('/dashboard');
      }
    };

    checkAdminAccess();
  }, [navigate]);

  const handleStatusUpdate = async (transactionId: number, status: 'completed' | 'failed'): Promise<StatusUpdateResponse> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`http://localhost:3000/api/admin/transactions/${transactionId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction status');
      }

      const data = await response.json();
      await fetchData();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <AdminNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin">
            <Clock className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </div>
        </div>
      </div>
    );
  }

  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab; label: string; icon: typeof Users }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === id
          ? isDark
            ? 'bg-white text-gray-900'
            : 'bg-gray-900 text-white'
          : isDark
          ? 'text-white hover:bg-gray-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Administration
        </h1>

        <div className="flex gap-4 mb-6">
          <TabButton id="users" label="Utilisateurs" icon={Users} />
          <TabButton id="transactions" label="Transactions" icon={CreditCard} />
          <TabButton id="logs" label="Logs" icon={History} />
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
            {error}
          </div>
        )}

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`text-left ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <th className="p-4">ID</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Rank</th>
                    <th className="p-4">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className={`border-t ${
                        isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <td className="p-4">{user.id}</td>
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.mail}</td>
                      <td className="p-4">{user.rank}</td>
                      <td className="p-4">{user.adresse_ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'transactions' && (
            <TransactionList
              transactions={transactions}
              isDark={isDark}
              onStatusUpdate={handleStatusUpdate}
            />
          )}

          {activeTab === 'logs' && (
            <LogList logs={logs} isDark={isDark} />
          )}
        </div>
      </div>
    </div>
  );
}
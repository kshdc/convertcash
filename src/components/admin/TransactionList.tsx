import { TransactionCard } from './TransactionCard';
import { Transaction, StatusUpdateResponse } from '../../types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
  isDark: boolean;
  onStatusUpdate: (transactionId: number, status: 'completed' | 'failed') => Promise<StatusUpdateResponse>;
}

export function TransactionList({ transactions, isDark, onStatusUpdate }: TransactionListProps) {
  const pendingTransactions = transactions.filter(t => t.payment_status === 'pending');

  if (pendingTransactions.length === 0) {
    return (
      <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Aucune transaction en attente
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {pendingTransactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          isDark={isDark}
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </div>
  );
}
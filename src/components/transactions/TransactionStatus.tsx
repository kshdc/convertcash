interface TransactionStatusProps {
    status: string;
    isDark: boolean;
  }
  
  export function TransactionStatus({ status, isDark }: TransactionStatusProps) {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case 'completed':
          return isDark 
            ? 'bg-green-900/20 text-green-400 border-green-900/50'
            : 'bg-green-50 text-green-700 border-green-200';
        case 'pending':
          return isDark
            ? 'bg-yellow-900/20 text-yellow-400 border-yellow-900/50'
            : 'bg-yellow-50 text-yellow-700 border-yellow-200';
        case 'failed':
          return isDark
            ? 'bg-red-900/20 text-red-400 border-red-900/50'
            : 'bg-red-50 text-red-700 border-red-200';
        default:
          return isDark
            ? 'bg-gray-900/20 text-gray-400 border-gray-900/50'
            : 'bg-gray-50 text-gray-700 border-gray-200';
      }
    };
  
    const getStatusText = () => {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'Terminée';
        case 'pending':
          return 'En attente';
        case 'failed':
          return 'Échoué';
        default:
          return status;
      }
    };
  
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor()}`}>
        {getStatusText()}
      </span>
    );
  }
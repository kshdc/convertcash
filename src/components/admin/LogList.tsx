import { formatDate } from '../../utils/formatDate';

interface Log {
  id: number;
  action: string;
  details: string;
  admin_username: string;
  timestamp: string;
}

interface LogListProps {
  logs: Log[];
  isDark: boolean;
}

export function LogList({ logs, isDark }: LogListProps) {
  const getActionColor = (action: string) => {
    if (action.includes('COMPLETED')) return isDark ? 'text-green-400' : 'text-green-600';
    if (action.includes('FAILED')) return isDark ? 'text-red-400' : 'text-red-600';
    if (action.includes('RANK')) return isDark ? 'text-blue-400' : 'text-blue-600';
    return isDark ? 'text-gray-300' : 'text-gray-600';
  };

  if (logs.length === 0) {
    return (
      <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Aucun log disponible
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className={`${
            isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
          } border rounded-lg p-4`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`font-medium ${getActionColor(log.action)}`}>
              {log.action}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatDate(new Date(log.timestamp))}
            </span>
          </div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {log.details}
          </p>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Par {log.admin_username}
          </p>
        </div>
      ))}
    </div>
  );
}
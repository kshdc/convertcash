import { CheckCircle, XCircle } from 'lucide-react';

interface StatusDropdownProps {
  isDark: boolean;
  onStatusUpdate: (status: 'completed' | 'failed') => Promise<void>;
  onClose: () => void;
}

export function StatusDropdown({ isDark, onStatusUpdate, onClose }: StatusDropdownProps) {
  const handleClick = async (status: 'completed' | 'failed') => {
    await onStatusUpdate(status);
    onClose();
  };

  return (
    <div 
      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } ring-1 ring-black ring-opacity-5 z-10`}
    >
      <div className="py-1">
        <button
          onClick={() => handleClick('completed')}
          className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
            isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Approuver</span>
        </button>
        <button
          onClick={() => handleClick('failed')}
          className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
            isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <XCircle className="w-4 h-4 text-red-500" />
          <span>Refuser</span>
        </button>
      </div>
    </div>
  );
}
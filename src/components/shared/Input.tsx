import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  isDark?: boolean;
}

export function Input({
  label,
  icon: Icon,
  error,
  isDark,
  className = '',
  ...props
}: InputProps) {
  const inputStyles = `
    block w-full rounded-md 
    ${isDark 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-primary focus:border-primary'
      : 'border-gray-300 focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-400'
    }
    ${Icon ? 'pl-10' : 'px-3'}
    py-2
    focus:outline-none
    transition-colors
    duration-200
  `;

  return (
    <div className="space-y-1">
      <label className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
        )}
        <input className={`${inputStyles} ${className}`} {...props} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
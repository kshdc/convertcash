import { LucideIcon } from 'lucide-react';

interface AuthInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  placeholder: string;
  Icon: LucideIcon;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  isDark: boolean;
}

export function AuthInput({
  id,
  name,
  type,
  label,
  value,
  placeholder,
  Icon,
  onChange,
  maxLength,
  isDark
}: AuthInputProps) {
  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
        </div>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`block w-full pl-10 pr-3 py-2 border ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500'
              : 'border-gray-300 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-400'
          } rounded-md focus:outline-none sm:text-sm transition-colors duration-200`}
          placeholder={placeholder}
        />
        {maxLength && (
          <span className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  isLoading?: boolean;
  isDark?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  icon,
  isLoading,
  isDark,
  fullWidth,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 rounded-lg font-medium transition-colors';
  const variantStyles = {
    primary: isDark 
      ? 'bg-white text-gray-900 hover:bg-gray-100'
      : 'bg-primary text-white hover:bg-blue-600',
    secondary: isDark
      ? 'bg-gray-800 text-white hover:bg-gray-700'
      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  };
  const widthStyles = fullWidth ? 'w-full' : '';
  const loadingStyles = isLoading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${loadingStyles} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {icon}
      {children}
      {variant === 'primary' && !icon && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}
interface CardProps {
  children: React.ReactNode;
  isDark?: boolean;
  className?: string;
}

export function Card({ children, isDark, className = '' }: CardProps) {
  const baseStyles = 'rounded-lg shadow-lg p-6 transition-colors duration-200';
  const colorStyles = isDark ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`${baseStyles} ${colorStyles} ${className}`}>
      {children}
    </div>
  );
}
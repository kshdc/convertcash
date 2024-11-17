import { ArrowRight } from 'lucide-react';

interface SubmitButtonProps {
  children: React.ReactNode;
  isDark: boolean;
}

export function SubmitButton({ children, isDark }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
        isDark 
          ? 'text-gray-900 bg-white hover:bg-gray-100 focus:ring-gray-500'
          : 'text-white bg-primary hover:bg-blue-600 focus:ring-gray-500'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
    >
      {children}
      <ArrowRight className="ml-2 h-5 w-5" />
    </button>
  );
}
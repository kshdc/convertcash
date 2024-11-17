import { AuthNavbar } from '../AuthNavbar';
import { useThemeStore } from '../../store/themeStore';
import { Card } from '../shared/Card';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <AuthNavbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h2>
            <div className="mt-4 flex justify-center">
              <div className={`h-1 w-24 ${isDark ? 'bg-white' : 'bg-primary'} rounded-full transition-colors duration-200`} />
            </div>
          </div>

          <Card isDark={isDark}>
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
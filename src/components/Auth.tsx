import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthNavbar } from './AuthNavbar';
import { useThemeStore } from '../store/themeStore';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Auth() {
  const navigate = useNavigate();
  const { isDark } = useThemeStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent, captchaToken: string) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            captchaToken
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Identifiants invalides');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('username', formData.username);
        localStorage.setItem('tokenExpiration', String(Date.now() + data.expiresIn * 1000));
        navigate('/dashboard');
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          return;
        }

        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            mail: formData.email,
            captchaToken
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Une erreur est survenue');
        }

        setIsLogin(true);
        setFormData({
          ...formData,
          email: '',
          confirmPassword: ''
        });
        setError('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <AuthNavbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center relative">
            <Link 
              to="/" 
              className={`absolute left-0 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-primary'} transition-colors flex items-center gap-2`}
            >
            </Link>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isLogin ? 'Bienvenue à nouveau' : 'Créer un compte'}
            </h2>
            <div className="mt-4 flex justify-center">
              <div className={`h-1 w-24 ${isDark ? 'bg-white' : 'bg-primary'} rounded-full transition-colors duration-200`}></div>
            </div>
          </div>

          {error && (
            <div className={`px-4 py-3 rounded-md ${
              error.includes('succès') 
                ? 'bg-green-50 border border-green-200 text-green-600'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {error}
            </div>
          )}

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-colors duration-200`}>
            {isLogin ? (
              <LoginForm
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                isDark={isDark}
              />
            ) : (
              <RegisterForm
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                isDark={isDark}
              />
            )}

            <div className="mt-6">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className={`w-full text-center text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-primary'} transition-colors duration-200`}
              >
                {isLogin ? "Vous n'avez pas de compte ? Créez-en un" : 'Vous avez déjà un compte ? Se connecter'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
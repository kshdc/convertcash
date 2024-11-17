import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';

export default function Footer() {
  const { isDark } = useThemeStore();

  return (
    <footer className={`${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>YeuSwap</h3>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-xs`}>
              Services de conversion de paiement sécurisés et rapides. Disponible 24/7 pour tous vos besoins de conversion.
            </p>
          </div>
          
          <div>
            <h3 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Liens Utiles</h3>
            <div className="space-y-2">
              <Link to="/terms" className={`block text-sm sm:text-base ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-primary'} transition-colors`}>
                Conditions Générales d'Utilisation
              </Link>
              <a href="#faq" className={`block text-sm sm:text-base ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-primary'} transition-colors`}>
                FAQ
              </a>
              <a href="#reviews" className={`block text-sm sm:text-base ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-primary'} transition-colors`}>
                Avis Clients
              </a>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className={`text-center text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} YeuSwap. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const contactInfo = [
  { Icon: Mail, text: 'support@YeuSwap.com' },
  { Icon: Phone, text: '+1 (555) 123-4567' },
  { Icon: MapPin, text: 'Paris, France' }
];

const links = [
  { to: '/terms', label: 'Conditions Générales d\'Utilisation' },
  { href: '#faq', label: 'FAQ' },
  { href: '#reviews', label: 'Avis Clients' }
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">YeuSwap</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-xs">
              Services de conversion de paiement sécurisés et rapides. Disponible 24/7 pour tous vos besoins de conversion.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Contactez-nous</h3>
            <div className="space-y-3">
              {contactInfo.map(({ Icon, text }) => (
                <div key={text} className="flex items-center text-gray-600">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Liens Utiles</h3>
            <div className="space-y-2">
              {links.map(({ to, href, label }) => (
                to ? (
                  <Link 
                    key={label}
                    to={to}
                    className="block text-sm sm:text-base text-gray-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={label}
                    href={href}
                    className="block text-sm sm:text-base text-gray-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-xs sm:text-sm text-gray-600">
            © {new Date().getFullYear()} YeuSwap. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
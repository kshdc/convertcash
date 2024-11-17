import { AuthNavbar } from './AuthNavbar';
import { useThemeStore } from '../store/themeStore';

export default function Terms() {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <AuthNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-6 sm:p-8 transition-colors duration-200`}>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            Conditions Générales d'Utilisation
          </h1>
          <div className="mt-4 flex mb-8">
            <div className={`h-1 w-24 ${isDark ? 'bg-white' : 'bg-primary'} rounded-full transition-colors duration-200`}></div>
          </div>

          <div className={`space-y-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <section className="space-y-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Mentions Légales</h2>
              <p>
                YeuSwap est une plateforme de conversion de paiements exploitée par YeuSwap SAS, société au capital de 10 000€.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Services Proposés</h2>
              <p>
                YeuSwap propose un service de conversion de Paysafecard, Transcash vers PayPal et diverses cryptomonnaies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>3. Responsabilités</h2>
              <p>
                L'utilisateur s'engage à :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir des informations exactes lors de l'inscription</li>
                <li>Ne pas utiliser le service à des fins illégales</li>
                <li>Respecter les conditions d'utilisation de Paysafecard, Transcash et PayPal</li>
                <li>Ne pas tenter de contourner les mesures de sécurité</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>4. Protection des Données</h2>
              <p>
              Nous ne collectons ni ne traitons aucune de vos données.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>5. Modifications</h2>
              <p>
                YeuSwap se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des changements importants.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>6. Droit Applicable</h2>
              <p>
                Ces conditions sont régies par le droit français. Tout litige relève de la compétence des tribunaux de Paris.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
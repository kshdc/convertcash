import { AuthNavbar } from './AuthNavbar';
import { useThemeStore } from '../store/themeStore';

export default function Terms() {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <AuthNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 transition-colors duration-200`}>
          <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-6`}>
            Conditions Générales d'Utilisation
          </h1>
          <div className="mt-4 flex mb-6 sm:mb-8">
            <div className={`h-1 w-16 sm:w-24 ${isDark ? 'bg-white' : 'bg-primary'} rounded-full transition-colors duration-200`}></div>
          </div>

          <div className={`space-y-6 sm:space-y-8 ${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>
            <section className="space-y-3 sm:space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Mentions Légales</h2>
              <p>
                YeuSwap est une plateforme de conversion de paiements exploitée par YeuSwap SAS, société au capital de 10 000€.
              </p>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Services Proposés</h2>
              <p>
                YeuSwap propose un service de conversion de Paysafecard, Transcash vers PayPal et diverses cryptomonnaies.
              </p>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>3. Responsabilités</h2>
              <p>L'utilisateur s'engage à :</p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                <li>Fournir des informations exactes lors de l'inscription</li>
                <li>Ne pas utiliser le service à des fins illégales</li>
                <li>Respecter les conditions d'utilisation de Paysafecard, Transcash et PayPal</li>
                <li>Ne pas tenter de contourner les mesures de sécurité</li>
              </ul>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>4. Protection des Données</h2>
              <p>
                Nous ne collectons ni ne traitons aucune de vos données.
              </p>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>5. Modifications</h2>
              <p>
                YeuSwap se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des changements importants.
              </p>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>6. Droit Applicable</h2>
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
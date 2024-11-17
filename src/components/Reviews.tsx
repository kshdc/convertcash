import { useThemeStore } from '../store/themeStore';

export default function Reviews() {
  const { isDark } = useThemeStore();

  return (
    <div id="reviews" className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-16 sm:py-20 lg:py-32`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Nos clients nous recommandent
          </h2>
          <div className="mt-4 flex justify-center">
            <div className={`h-1 w-24 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`}></div>
          </div>
        </div>

        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} p-4 sm:p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <img
                src="https://payswap.me/assets/img/Trustpilot_ratings_5star.png"
                alt="5 stars"
                className="h-5 sm:h-6 mb-4"
              />
              <h3 className={`font-semibold mb-2 text-base sm:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Excellente expérience</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Conversion fluide et paiement rapide. Je suis désormais un client fidèle.
              </p>
              <div className={`flex items-center justify-between text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>Laurent</span>
                <span>Il y a 4 heures</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} p-4 sm:p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <img
                src="https://payswap.me/assets/img/Trustpilot_ratings_5star.png"
                alt="5 stars"
                className="h-5 sm:h-6 mb-4"
              />
              <h3 className={`font-semibold mb-2 text-base sm:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Super service !</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Conversion rapide et fiable de Paysafecard à PayPal.
              </p>
              <div className={`flex items-center justify-between text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>Sofiane75</span>
                <span>Il y a 8 heures</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} p-4 sm:p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <img
                src="https://payswap.me/assets/img/Trustpilot_ratings_5star.png"
                alt="5 stars"
                className="h-5 sm:h-6 mb-4"
              />
              <h3 className={`font-semibold mb-2 text-base sm:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Nickel</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Tout était nickel. Suivi rapide et efficace.
              </p>
              <div className={`flex items-center justify-between text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>Erwan POIRAUD</span>
                <span>Il y a 9 heures</span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          <button className={`hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-full p-3 shadow-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition-colors`}>
            <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className={`hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-full p-3 shadow-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} transition-colors`}>
            <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
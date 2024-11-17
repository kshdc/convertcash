import { Shield, Clock, Wallet } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function Features() {
  const { isDark } = useThemeStore();

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-16 sm:py-20 lg:py-32`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Pourquoi Choisir YeuSwap
          </h2>
          <div className="mt-4 flex justify-center">
            <div className={`h-1 w-24 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className={`group ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-6 sm:p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-gray-500 transition-all duration-300 hover:shadow-lg`}>
            <div className="flex flex-col items-center">
              <div className={`p-3 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl group-hover:bg-gray-100/10 transition-colors duration-300`}>
                <Shield className={`h-6 w-6 sm:h-8 sm:w-8 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              <h3 className={`mt-4 text-base sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-gray-300 transition-colors duration-300`}>
                Transferts Sécurisés
              </h3>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                Cryptage bancaire pour toutes les transactions
              </p>
            </div>
          </div>

          <div className={`group ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-6 sm:p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-gray-500 transition-all duration-300 hover:shadow-lg`}>
            <div className="flex flex-col items-center">
              <div className={`p-3 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl group-hover:bg-gray-100/10 transition-colors duration-300`}>
                <Clock className={`h-6 w-6 sm:h-8 sm:w-8 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              <h3 className={`mt-4 text-base sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-gray-300 transition-colors duration-300`}>
                Traitement Rapide
              </h3>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                Conversions effectuées en moins de 24 heures
              </p>
            </div>
          </div>

          <div className={`group ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-6 sm:p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-gray-500 transition-all duration-300 hover:shadow-lg`}>
            <div className="flex flex-col items-center">
              <div className={`p-3 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl group-hover:bg-gray-100/10 transition-colors duration-300`}>
                <Wallet className={`h-6 w-6 sm:h-8 sm:w-8 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              <h3 className={`mt-4 text-base sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-gray-300 transition-colors duration-300`}>
                Options Multiples
              </h3>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                Conversion vers PayPal ou cryptomonnaies majeures
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
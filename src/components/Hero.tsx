import { ArrowRight } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function Hero() {
  const { isDark } = useThemeStore();
  
  return (
    <div className={`relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'} pt-16 sm:pt-24 lg:pt-32`}>
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-gray-800/10 to-gray-900/95' : 'from-gray-100/5 to-white/95'}`} />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight sm:leading-normal">
            <span className={isDark ? 'text-white' : 'text-gray-900'}>Vos</span>{' '}
            <span className={isDark ? 'text-white' : 'text-black'}>Paysafecard, Transhcash</span>{' '}
            <span className={isDark ? 'text-white' : 'text-gray-900'}>en</span>{' '}
            <span className={isDark ? 'text-white' : 'text-black'}>PayPal</span>{' '}
            <span className={isDark ? 'text-white' : 'text-gray-900'}>ou en</span>{' '}
            <span className={isDark ? 'text-white' : 'text-black'}>Crypto</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center">
            <div className={`w-16 sm:w-1 h-1 sm:h-8 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`}></div>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-lg`}>
              Convertissez votre ticket TranshCash, Paysafecard en PayPal ou en Crypto en moins de 24 heures
            </p>
          </div>
          
          <div className="mt-6 sm:mt-8">
            <button className={`rounded-lg ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all`}>
              Commencer <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function Converter() {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const { isDark } = useThemeStore();

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const inputAmount = parseFloat(amount);
    if (!isNaN(inputAmount)) {
      setConvertedAmount(inputAmount * 0.80);
    }
  };

  return (
    <div id="converter" className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-12 sm:py-16 lg:py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-8 sm:mb-12">
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Obtenez une estimation pour votre conversion
          </h2>
          <div className="mt-4 flex justify-center">
            <div className={`h-1 w-16 sm:w-24 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`}></div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg`}>
            <form onSubmit={handleSimulate} className="space-y-6">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-8">
                <div className="w-full md:flex-1">
                  <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src="https://payswap.me/assets/img/paysafecard-logo.png"
                        alt="Paysafecard"
                        className="h-6 sm:h-8"
                      />
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Vous envoyez</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`w-full bg-transparent text-xl sm:text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} focus:outline-none`}
                        placeholder="0.00"
                      />
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg`}>EUR</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:hidden justify-center">
                  <ArrowRight className={`transform rotate-90 h-6 w-6 ${isDark ? 'text-white' : 'text-black'}`} />
                </div>

                <div className="hidden md:flex items-center">
                  <ArrowRight className={`h-6 w-6 ${isDark ? 'text-white' : 'text-black'}`} />
                </div>

                <div className="w-full md:flex-1">
                  <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src="https://payswap.me/assets/img/paypal-logo.png"
                        alt="PayPal"
                        className="h-6 sm:h-8"
                      />
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Vous recevez</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className={`text-xl sm:text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {convertedAmount ? convertedAmount.toFixed(2) : '0.00'}
                      </span>
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg`}>EUR</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-2 sm:gap-0">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Taux de change</span>
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>1 EUR = 0.85 EUR</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm mt-3 gap-2 sm:gap-0">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Frais estimés</span>
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>20%</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} py-3 sm:py-4 px-6 rounded-xl text-base sm:text-lg font-semibold transition-all duration-200`}
              >
                Simuler la Conversion
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
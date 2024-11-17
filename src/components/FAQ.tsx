import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const faqs = [
  {
    question: "Combien de temps prend le processus de conversion ?",
    answer: "La plupart des conversions sont effectuées en moins de 24 heures. Une fois que nous recevons votre code Paysafecard, nous traitons la conversion et envoyons les fonds sur votre compte PayPal ou votre portefeuille crypto."
  },
  {
    question: "Quels sont les frais de conversion ?",
    answer: "Nos frais varient selon le type et le montant de la conversion. En général, ils se situent entre 5 et 10% de la valeur de la transaction. Vous verrez les frais exacts avant de confirmer votre conversion."
  },
  {
    question: "Quelles cryptomonnaies acceptez-vous ?",
    answer: "Nous prenons actuellement en charge Bitcoin (BTC), Ethereum (ETH) et d'autres cryptomonnaies majeures. La liste complète est disponible pendant le processus de conversion."
  },
  {
    question: "Ma transaction est-elle sécurisée ?",
    answer: "Oui, nous utilisons un cryptage de niveau bancaire pour toutes les transactions. Vos informations personnelles et détails de paiement sont entièrement protégés selon les normes de l'industrie."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isDark } = useThemeStore();

  return (
    <div id="faq" className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-16 sm:py-20 lg:py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Questions Fréquentes
          </h2>
          <div className="mt-4 flex justify-center">
            <div className={`h-1 w-24 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`}></div>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-lg overflow-hidden transition-all duration-200 shadow-sm`}
            >
              <button
                className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-base sm:text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className={`h-5 w-5 ${isDark ? 'text-white' : 'text-black'} flex-shrink-0`} />
                ) : (
                  <ChevronDown className={`h-5 w-5 ${isDark ? 'text-white' : 'text-black'} flex-shrink-0`} />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4">
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
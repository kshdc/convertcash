import { useState } from 'react';
import { useThemeStore } from '../store/themeStore';
import { PaymentMethodButton } from './convert/PaymentMethodButton';
import { CryptoButton } from './convert/CryptoButton';
import { PaysafecardStep } from './convert/PaysafecardStep';
import { ArrowLeft } from 'lucide-react';

const cryptocurrencies = [
  { id: 'BTC', name: 'Bitcoin', icon: '/src/resources/images/icons/bitcoin.png' },
  { id: 'LTC', name: 'Litecoin', icon: '/src/resources/images/icons/litecoin.png' },
  { id: 'USDT', name: 'Tether', icon: '/src/resources/images/icons/tether.png' },
  { id: 'SOL', name: 'Solana', icon: '/src/resources/images/icons/solana.png' },
  { id: 'ETH', name: 'Ethereum', icon: '/src/resources/images/icons/ethereum.png' }
];

type Step = 'coupon' | 'method' | 'details' | 'paysafecard';
type CouponType = 'paysafecard' | 'transcash';

export function ConvertPage() {
  const { isDark } = useThemeStore();
  const [currentStep, setCurrentStep] = useState<Step>('coupon');
  const [couponType, setCouponType] = useState<CouponType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'paypal' | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [email, setEmail] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [numberOfCards, setNumberOfCards] = useState<number | null>(null);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('paysafecard');
  };

  const handleBack = () => {
    if (currentStep === 'paysafecard') {
      setCurrentStep('details');
      setNumberOfCards(null);
    } else if (currentStep === 'details') {
      setCurrentStep('method');
      setPaymentMethod(null);
      setSelectedCrypto('');
      setEmail('');
      setCryptoAddress('');
    } else if (currentStep === 'method') {
      setCurrentStep('coupon');
      setCouponType(null);
    }
  };

  const handleNumberOfCardsSelect = (number: number) => {
    setNumberOfCards(number);
  };

  const handlePaysafecardCodesSubmit = (codes: string[], totalValue: number) => {
    console.log({
      couponType,
      paymentMethod,
      selectedCrypto,
      email,
      cryptoAddress,
      paysafecardCodes: codes,
      totalValue
    });
  };

  const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-700' : 'bg-gray-50';
  const inputText = isDark ? 'text-white' : 'text-gray-900';
  const inputBorder = isDark ? 'border-gray-600' : 'border-gray-300';
  const backButtonColor = isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700';

  const getPlaceholder = () => {
    switch (selectedCrypto) {
      default:
        return 'Entrez votre adresse de portefeuille';
    }
  };

  return (
    <div className={`${bgColor} shadow-lg rounded-lg p-6 transition-colors duration-200`}>
      <h2 className={`text-2xl font-bold ${textColor} mb-6`}>Convertir</h2>
      
      {currentStep === 'coupon' && (
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${textColor} mb-2`}>
              Type de coupon à convertir
            </label>
            <div className="grid grid-cols-2 gap-4">
              <PaymentMethodButton
                label="Paysafecard"
                isSelected={couponType === 'paysafecard'}
                onClick={() => {
                  setCouponType('paysafecard');
                  setCurrentStep('method');
                }}
                isDark={isDark}
                borderColor={borderColor}
                textColor={textColor}
                icon={undefined}
              />
              <PaymentMethodButton
                label="Transcash"
                isSelected={couponType === 'transcash'}
                onClick={() => {
                  setCouponType('transcash');
                  setCurrentStep('method');
                }}
                isDark={isDark}
                borderColor={borderColor}
                textColor={textColor}
                icon={undefined}
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 'method' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 ${backButtonColor} transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-2`}>
              Méthode de paiement
            </label>
            <div className="grid grid-cols-2 gap-4">
              <PaymentMethodButton
                icon={<img src="/src/resources/images/icons/bitcoin.png" alt="Crypto" className="w-6 h-6" />}
                label="Cryptocurrency"
                isSelected={paymentMethod === 'crypto'}
                onClick={() => {
                  setPaymentMethod('crypto');
                  setEmail('');
                  setCurrentStep('details');
                }}
                isDark={isDark}
                borderColor={borderColor}
                textColor={textColor}
              />
              <PaymentMethodButton
                icon={<img src="/src/resources/images/icons/paypal.png" alt="PayPal" className="w-6 h-6" />}
                label="PayPal"
                isSelected={paymentMethod === 'paypal'}
                onClick={() => {
                  setPaymentMethod('paypal');
                  setSelectedCrypto('');
                  setCryptoAddress('');
                  setCurrentStep('details');
                }}
                isDark={isDark}
                borderColor={borderColor}
                textColor={textColor}
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 ${backButtonColor} transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>
          </div>

          {paymentMethod === 'crypto' && (
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  Sélectionnez une cryptomonnaie
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {cryptocurrencies.map((crypto) => (
                    <CryptoButton
                      key={crypto.id}
                      crypto={crypto}
                      isSelected={selectedCrypto === crypto.id}
                      onClick={() => {
                        setSelectedCrypto(crypto.id);
                        setCryptoAddress('');
                      }}
                      isDark={isDark}
                      borderColor={borderColor}
                      textColor={textColor}
                    />
                  ))}
                </div>
              </div>

              {selectedCrypto && (
                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>
                    Adresse {cryptocurrencies.find(c => c.id === selectedCrypto)?.name}
                  </label>
                  <input
                    type="text"
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                    className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder={getPlaceholder()}
                    required
                  />
                  <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Assurez-vous que l'adresse est correcte. Les transactions sont irréversibles.
                  </p>
                </div>
              )}
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Adresse Email PayPal
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Entrez votre email PayPal"
                required
              />
            </div>
          )}

          {((paymentMethod === 'paypal' && email) || (selectedCrypto && cryptoAddress)) && (
            <button
              type="submit"
              className={`w-full ${isDark ? 'bg-white text-gray-900' : 'bg-black text-white'} py-3 px-6 rounded-lg font-medium ${isDark ? 'hover:bg-white/90' : 'hover:bg-black/90'} transition-colors`}
            >
              Suivant
            </button>
          )}
        </form>
      )}

      {currentStep === 'paysafecard' && (
        <PaysafecardStep
          numberOfCards={numberOfCards}
          onNumberSelect={handleNumberOfCardsSelect}
          onCodesSubmit={handlePaysafecardCodesSubmit}
          onBack={handleBack}
          isDark={isDark}
          paymentMethod={paymentMethod!}
          cryptoName={cryptocurrencies.find(c => c.id === selectedCrypto)?.name}
          receiverAddress={paymentMethod === 'crypto' ? cryptoAddress : email}
          couponType={couponType!}
        />
      )}
    </div>
  );
}
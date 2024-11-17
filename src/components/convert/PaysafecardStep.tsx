import { useState } from 'react';
import { ArrowLeft, CheckCircle, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaysafecardStepProps {
  numberOfCards: number | null;
  onNumberSelect: (number: number) => void;
  onCodesSubmit: (codes: string[], totalValue: number) => void;
  onBack: () => void;
  isDark: boolean;
  paymentMethod: 'crypto' | 'paypal';
  cryptoName?: string;
  receiverAddress: string;
  couponType: 'paysafecard' | 'transcash';
}

export function PaysafecardStep({ 
  numberOfCards, 
  onNumberSelect, 
  onCodesSubmit,
  onBack,
  isDark,
  paymentMethod,
  cryptoName,
  receiverAddress,
  couponType
}: PaysafecardStepProps) {
  const navigate = useNavigate();
  const [codes, setCodes] = useState<string[]>(Array(numberOfCards || 0).fill(''));
  const [totalValue, setTotalValue] = useState<number>(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const CONVERSION_FEE = 0.20;
  const finalAmount = totalValue * (1 - CONVERSION_FEE);
  
  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const formatCode = (code: string): string => {
    return code.replace(/[^0-9]/g, '');
  };

  const handleConfirmConversion = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const formattedCodes = codes
        .map(formatCode)
        .join(',');

      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          codes: formattedCodes,
          totalValue,
          finalAmount,
          paymentMethod,
          receiverAddress,
          payment_type: couponType === 'paysafecard' ? 'PaySafeCard' : 'Transcash',
          cryptoType: paymentMethod === 'crypto' ? cryptoName : undefined
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit transaction');
      }

      onCodesSubmit(codes, totalValue);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const inputBg = isDark ? 'bg-gray-700' : 'bg-gray-50';
  const inputText = isDark ? 'text-white' : 'text-gray-900';
  const inputBorder = isDark ? 'border-gray-600' : 'border-gray-300';
  const buttonBg = isDark ? 'bg-white text-gray-900' : 'bg-black text-white';
  const buttonHover = isDark ? 'hover:bg-white/90' : 'hover:bg-black/90';
  const backButtonColor = isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700';
  const summaryBg = isDark ? 'bg-gray-800' : 'bg-gray-50';
  const summaryBorder = isDark ? 'border-gray-700' : 'border-gray-200';

  const getCodePlaceholder = () => {
    return couponType === 'paysafecard' 
      ? "0000-0000-0000-0000"
      : "0000-0000-0000-0000-0000-0000";
  };

  const getCodePattern = () => {
    return couponType === 'paysafecard'
      ? "[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
      : "[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}";
  };

  const getMaxLength = () => {
    return couponType === 'paysafecard' ? 19 : 29;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const dashPositions = couponType === 'paysafecard' 
      ? [4, 9, 14] 
      : [4, 9, 14, 19, 24];

    if (dashPositions.includes(value.length)) {
      if (e.key !== '-') {
        e.currentTarget.value = value + '-';
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-8 text-center">
        <div className={`${summaryBg} border ${summaryBorder} rounded-lg p-8`}>
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
          <h3 className={`text-xl font-semibold ${textColor} mb-4`}>
            Merci pour votre confiance !
          </h3>
          <div className="space-y-4">
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Votre demande de conversion a été enregistrée avec succès. Le traitement peut prendre jusqu'à 24 heures.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const transactionsTab = document.querySelector('[data-tab="transactions"]') as HTMLElement;
            if (transactionsTab) {
              transactionsTab.click();
            }
          }}
          className={`flex items-center justify-center gap-2 mx-auto ${buttonBg} py-3 px-6 rounded-lg font-medium ${buttonHover} transition-colors`}
        >
          <History className="w-5 h-5" />
          <span>Voir mes transactions</span>
        </button>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSummary(false)}
            className={`flex items-center gap-2 ${backButtonColor} transition-colors`}
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modifier</span>
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className={`${summaryBg} border ${summaryBorder} rounded-lg p-6 space-y-4`}>
          <h3 className={`text-lg font-semibold ${textColor} mb-4`}>Résumé de la conversion</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type de coupon</span>
              <span className={textColor}>
                {couponType === 'paysafecard' ? 'Paysafecard' : 'Transcash'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Méthode de paiement</span>
              <span className={textColor}>
                {paymentMethod === 'crypto' ? cryptoName : 'PayPal'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {paymentMethod === 'crypto' ? 'Adresse' : 'Email PayPal'}
              </span>
              <span className={textColor}>{receiverAddress}</span>
            </div>
            
            <div className="flex justify-between">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Nombre de coupons</span>
              <span className={textColor}>{numberOfCards}</span>
            </div>

            {codes.map((code, index) => (
              <div key={index} className="flex justify-between">
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Code #{index + 1}
                </span>
                <span className={textColor}>{code}</span>
              </div>
            ))}
            
            <div className="border-t border-b py-3 my-3 space-y-3">
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Montant total</span>
                <span className={textColor}>{totalValue.toFixed(2)} €</span>
              </div>
              
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Frais de conversion (20%)</span>
                <span className={`${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  -{(totalValue * CONVERSION_FEE).toFixed(2)} €
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg font-medium`}>
                Montant final reçu
              </span>
              <span className={`${textColor} text-lg font-semibold`}>
                {finalAmount.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmConversion}
          disabled={isSubmitting}
          className={`w-full ${buttonBg} py-3 px-6 rounded-lg font-medium ${buttonHover} transition-colors flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          <span>{isSubmitting ? 'Traitement en cours...' : 'Confirmer la conversion'}</span>
        </button>
      </div>
    );
  }

  if (!numberOfCards) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${backButtonColor} transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
        </div>

        <div>
          <label className={`block text-lg font-medium ${textColor} mb-4`}>
            Votre nombre de codes :
          </label>
          <div className="grid grid-cols-5 gap-2 md:flex md:justify-center md:items-center md:gap-2 overflow-x-auto py-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => onNumberSelect(number)}
                className={`w-12 h-12 rounded-lg font-medium transition-all duration-200 flex-shrink-0
                  ${number === numberOfCards 
                    ? isDark 
                      ? 'bg-white text-gray-900' 
                      : 'bg-gray-900 text-white'
                    : isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } border-2 border-transparent flex items-center justify-center`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className={`flex items-center gap-2 ${backButtonColor} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </button>
      </div>

      <div>
        <label className={`block text-sm font-medium ${textColor} mb-2`}>
          Montant total des codes (€)
        </label>
        <input
          type="number"
          value={totalValue || ''}
          onChange={(e) => setTotalValue(Number(e.target.value))}
          className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent mb-6`}
          placeholder="Entrez le montant total"
          required
          min="1"
          step="1"
        />
      </div>

      <div className="space-y-4">
        {Array.from({ length: numberOfCards }).map((_, index) => (
          <div key={index}>
            <label className={`block text-sm font-medium ${textColor} mb-2`}>
              Code {couponType === 'paysafecard' ? 'Paysafecard' : 'Transcash'} #{index + 1}
            </label>
            <input
              type="text"
              value={codes[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className={`w-full ${inputBg} ${inputText} border ${inputBorder} rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent`}
              placeholder={getCodePlaceholder()}
              pattern={getCodePattern()}
              required
              maxLength={getMaxLength()}
              onKeyPress={handleKeyPress}
            />
          </div>
        ))}
      </div>

      <div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Total : {totalValue.toFixed(2)} € • Frais de conversion : 20% • Montant final reçu : {finalAmount.toFixed(2)} €
        </p>
      </div>

      <button
        type="submit"
        className={`w-full ${buttonBg} py-3 px-6 rounded-lg font-medium ${buttonHover} transition-colors`}
      >
        Suivant
      </button>
    </form>
  );
}
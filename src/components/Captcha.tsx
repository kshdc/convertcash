import { useState, useEffect } from 'react';

interface CaptchaProps {
  onVerify: (token: string) => void;
  isDark: boolean;
}

export function Captcha({ onVerify, isDark }: CaptchaProps) {
  const [answer, setAnswer] = useState('');
  const [numbers, setNumbers] = useState<{ a: number; b: number }>({ a: 0, b: 0 });
  const [error, setError] = useState(false);

  const generateNumbers = () => {
    const a = Math.floor(Math.random() * 40) + 10;
    const b = Math.floor(Math.random() * 40) + 10;
    setNumbers({ a, b });
    setAnswer('');
    setError(false);
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const generateToken = (answer: number) => {
    // Créer un token simple basé sur la réponse et un timestamp
    const timestamp = Date.now();
    const data = `${answer}-${timestamp}`;
    return btoa(data); // Encode en base64
  };

  const handleSubmit = () => {
    const correctAnswer = numbers.a + numbers.b;
    if (parseInt(answer) === correctAnswer) {
      const token = generateToken(correctAnswer);
      onVerify(token);
      setError(false);
    } else {
      setError(true);
      generateNumbers();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className={`${isDark ? 'bg-[#1C2128]' : 'bg-gray-100'} rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className={`text-xl font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {numbers.a} + {numbers.b} 
          </div>
          <button
            onClick={generateNumbers}
            className={`p-2 rounded-full ${
              isDark 
                ? 'bg-[#2D333B] hover:bg-[#353B43] text-gray-400' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
            } transition-colors`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Entrez le résultat"
          className={`w-full p-2 rounded ${
            isDark
              ? 'bg-[#2D333B] text-white border-[#2D333B] focus:border-gray-600'
              : 'bg-white text-gray-900 border-gray-300 focus:border-gray-400'
          } border focus:outline-none transition-colors`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">
          Réponse incorrecte. Veuillez réessayer.
        </p>
      )}
      <button
        onClick={handleSubmit}
        className={`w-full py-2 px-4 rounded font-medium transition-colors ${
          isDark
            ? 'bg-white text-gray-900 hover:bg-gray-100'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        Vérifier
      </button>
    </div>
  );
}
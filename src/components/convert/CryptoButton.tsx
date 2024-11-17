interface CryptoButtonProps {
  crypto: {
    id: string;
    name: string;
    icon: string;
  };
  isSelected: boolean;
  onClick: () => void;
  isDark: boolean;
  borderColor: string;
  textColor: string;
}

export function CryptoButton({
  crypto,
  isSelected,
  onClick,
  isDark,
  borderColor,
  textColor
}: CryptoButtonProps) {
  const selectedBorder = isDark ? 'border-white' : 'border-black';
  const selectedRing = isDark ? 'ring-white' : 'ring-black';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-lg border ${borderColor} ${
        isSelected ? `${selectedBorder} ring-2 ${selectedRing}` : ''
      } flex items-center justify-center gap-2 transition-all`}
    >
      <img src={crypto.icon} alt={crypto.name} className="w-6 h-6" />
      <span className={textColor}>{crypto.name}</span>
    </button>
  );
}
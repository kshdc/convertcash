interface PaymentMethodButtonProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isDark: boolean;
  borderColor: string;
  textColor: string;
}

export function PaymentMethodButton({
  icon,
  label,
  isSelected,
  onClick,
  isDark,
  borderColor,
  textColor
}: PaymentMethodButtonProps) {
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
      {icon}
      <span className={textColor}>{label}</span>
    </button>
  );
}
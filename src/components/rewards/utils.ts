export const ranks = [
  { name: 'Bronze', xpRequired: 100, discount: 2, maxAmount: 100 },
  { name: 'Silver', xpRequired: 300, discount: 4, maxAmount: 200 },
  { name: 'Gold', xpRequired: 500, discount: 5, maxAmount: 200 },
  { name: 'Platinum', xpRequired: 1000, discount: 7, maxAmount: 200 },
  { name: 'Diamond', xpRequired: 2000, discount: 10, maxAmount: 200 },
];

export function getRankColor(rankName: string, isDark: boolean) {
  const colors: Record<string, { text: string; bg: string }> = {
    Bronze: { 
      text: isDark ? 'text-gray-400' : 'text-gray-600',
      bg: isDark ? 'bg-gray-400' : 'bg-gray-600'
    },
    Silver: { 
      text: isDark ? 'text-gray-400' : 'text-gray-600',
      bg: isDark ? 'bg-gray-400' : 'bg-gray-600'
    },
    Gold: { 
      text: isDark ? 'text-gray-400' : 'text-gray-600',
      bg: isDark ? 'bg-gray-400' : 'bg-gray-600'
    },
    Platinum: { 
      text: isDark ? 'text-gray-400' : 'text-gray-600',
      bg: isDark ? 'bg-gray-400' : 'bg-gray-600'
    },
    Diamond: { 
      text: isDark ? 'text-gray-400' : 'text-gray-600',
      bg: isDark ? 'bg-gray-400' : 'bg-gray-600'
    },
  };
  return colors[rankName] || { text: 'text-gray-600', bg: 'bg-gray-600' };
}
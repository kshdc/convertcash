import { Shield } from 'lucide-react';
import { Card } from '../shared/Card';
import { getRankColor } from './utils';

interface RankCardProps {
  rank: string | null;
  xp: number;
  isDark: boolean;
}

export function RankCard({ rank, isDark }: RankCardProps) {
  const displayRank = rank === 'default' ? null : rank;

  return (
    <Card isDark={isDark} className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-red-100'} flex-shrink-0`}>
          <Shield className={`w-6 h-6 sm:w-8 sm:h-8 ${displayRank ? getRankColor(displayRank, isDark).text : isDark ? 'text-red-400' : 'text-red-600'}`} />
        </div>
        <div>
          <h2 className={`text-base sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {displayRank ? `Bravo ! Vous avez le rang ${displayRank}` : 'Pas encore de rang'}
          </h2>
        </div>
      </div>
    </Card>
  );
}
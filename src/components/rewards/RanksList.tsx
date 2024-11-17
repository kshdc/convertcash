import { Gift, Shield } from 'lucide-react';
import { Card } from '../shared/Card';
import { getRankColor } from './utils';
import { Rank } from './types';

interface RanksListProps {
  ranks: Rank[];
  currentRank: string | null;
  isDark: boolean;
}

export function RanksList({ ranks, currentRank, isDark }: RanksListProps) {
  return (
    <Card isDark={isDark}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Gift className={isDark ? 'text-white' : 'text-gray-900'} />
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Récompenses
          </h3>
        </div>
        <div className="space-y-4">
          {ranks.map((rank) => (
            <div
              key={rank.name}
              className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${
                currentRank?.toLowerCase() === rank.name.toLowerCase()
                  ? isDark
                    ? 'ring-2 ring-white'
                    : 'ring-2 ring-black'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield className={getRankColor(rank.name, isDark).text} />
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {rank.name}
                  </h4>
                </div>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Avoir converti {rank.xpRequired} €
                </span>
              </div>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {rank.discount}% de réduction sur un maximum de {rank.maxAmount}€ sur la prochaine commande
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
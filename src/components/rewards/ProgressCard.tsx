import { TrendingUp } from 'lucide-react';
import { Card } from '../shared/Card';
import { Rank } from './types';

interface ProgressCardProps {
  currentXp: number;
  nextRank: Rank;
  progress: number;
  remainingXp: number;
  isDark: boolean;
}

export function ProgressCard({ currentXp, nextRank, progress, remainingXp, isDark }: ProgressCardProps) {
  return (
    <Card isDark={isDark}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className={isDark ? 'text-white' : 'text-gray-900'} />
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Progression
            </h3>
          </div>
          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {currentXp} / {nextRank.xpRequired} XP
          </span>
        </div>
        
        <div className="relative w-full h-2">
          <div className={`absolute w-full h-full rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div
            className="absolute h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>

        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          {remainingXp > 0 
            ? `${remainingXp} € restants pour atteindre le rang ${nextRank.name}`
            : `Rang ${nextRank.name} atteint !`
          }
        </p>
      </div>
    </Card>
  );
}
import { useState, useEffect } from 'react';
import { RankCard } from './rewards/RankCard';
import { ProgressCard } from './rewards/ProgressCard';
import { RanksList } from './rewards/RanksList';
import { useThemeStore } from '../store/themeStore';
import { UserProfile } from './rewards/types';
import { ranks } from './rewards/utils';

export default function Rewards() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useThemeStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:3000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchProfile();
  }, []);

  const getCurrentRankIndex = () => {
    if (!profile?.reward_rank) return -1;
    return ranks.findIndex(r => r.name.toLowerCase() === profile.reward_rank.toLowerCase());
  };

  const getNextRank = () => {
    const currentIndex = getCurrentRankIndex();
    return currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : null;
  };

  const calculateProgress = () => {
    if (!profile?.xp) return 0;
    const nextRank = getNextRank();
    if (!nextRank) return 100;

    const currentRank = getCurrentRankIndex() >= 0 ? ranks[getCurrentRankIndex()] : { xpRequired: 0 };
    const xpForNextLevel = nextRank.xpRequired - currentRank.xpRequired;
    const currentXpInLevel = profile.xp - currentRank.xpRequired;
    return Math.min(100, (currentXpInLevel / xpForNextLevel) * 100);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
        {error}
      </div>
    );
  }

  const nextRank = getNextRank();

  return (
    <div className="space-y-6">
      <RankCard
        rank={profile?.reward_rank || null}
        xp={profile?.xp || 0}
        isDark={isDark}
      />

      {profile?.reward_rank && nextRank && (
        <ProgressCard
          currentXp={profile.xp}
          nextRank={nextRank}
          progress={calculateProgress()}
          remainingXp={nextRank.xpRequired - profile.xp}
          isDark={isDark}
        />
      )}

      <RanksList
        ranks={ranks}
        currentRank={profile?.reward_rank || null}
        isDark={isDark}
      />
    </div>
  );
}
export const RANK_THRESHOLDS = {
    BRONZE: 100,
    SILVER: 300,
    GOLD: 500,
    PLATINUM: 1000,
    DIAMOND: 2000
  } as const;
  
  export type RankType = keyof typeof RANK_THRESHOLDS;
  
  export function determineRank(xp: number): string | null {
    if (xp >= RANK_THRESHOLDS.DIAMOND) return 'Diamant';
    if (xp >= RANK_THRESHOLDS.PLATINUM) return 'Platine';
    if (xp >= RANK_THRESHOLDS.GOLD) return 'Or';
    if (xp >= RANK_THRESHOLDS.SILVER) return 'Argent';
    if (xp >= RANK_THRESHOLDS.BRONZE) return 'Bronze';
    return null;
  }
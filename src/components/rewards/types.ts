export interface Rank {
  name: string;
  xpRequired: number;
  discount: number;
  maxAmount: number;
}

export interface UserProfile {
  rank: string;
  reward_rank: string;
  xp: number;
}
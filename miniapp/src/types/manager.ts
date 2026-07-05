export interface StrategyManager {
  id: number;
  name: string;
  category: string;
  bio: string;
  markets: string;
  return6m: number;
  winRate: number;
  maxDrawdown: number;
  riskLevel: string;
  trackerUrl: string;
  status: string;
}
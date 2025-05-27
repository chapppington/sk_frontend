export interface IStatItem {
  value: string;
  unit?: {
    text: string;
    isSuperscript?: boolean;
  };
  description: string;
}

export interface IBlackBoxWithStatsProps {
  className?: string;
  stats: IStatItem[];
  transparent?: boolean;
}
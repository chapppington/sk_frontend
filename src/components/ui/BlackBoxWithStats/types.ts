export interface IStatItem {
  value: string;
  unit?: {
    text: string;
    isSuperscript?: boolean;
  };
  description: string;
  showOnMobile?: boolean;
}

export interface IBlackBoxWithStatsProps {
  className?: string;
  stats: IStatItem[];
  transparent?: boolean;
  showOnMobile?: boolean;
}

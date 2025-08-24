export interface FeederData {
  current: string;
  count: string;
}

export interface FeederSectionOptionProps {
  value: Record<string, FeederData[]>;
  onChange: (value: Record<string, FeederData[]>) => void;
  questionId: number;
  numberOfSections: number;
}

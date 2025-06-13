export interface Tab {
  label: string;
  value: string;
  content?: React.ReactNode;
}

export type TabContent = Tab;

export interface CharacteristicItem {
  title: string;
  description: string;
}

export interface DescriptionItem {
  text: string;
}

export interface TabData {
  description: {
    items: DescriptionItem[];
  };
  characteristics: {
    items: CharacteristicItem[];
  };
}

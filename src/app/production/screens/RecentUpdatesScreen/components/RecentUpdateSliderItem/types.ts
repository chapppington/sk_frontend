export interface IRecentUpdateItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface IRecentUpdateSliderItemProps {
  item: IRecentUpdateItem;
}

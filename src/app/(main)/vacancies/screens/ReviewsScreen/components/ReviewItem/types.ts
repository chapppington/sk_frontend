export interface Review {
  name: string;
  position: string;
  image: string;
  shortText: string;
}

export interface ReviewItemProps {
  review: Review;
  onClick: () => void;
}

import { Review } from "../../types";

export interface ReviewPopupProps {
  review: Review;
  isClosing: boolean;
  onClose: () => void;
}

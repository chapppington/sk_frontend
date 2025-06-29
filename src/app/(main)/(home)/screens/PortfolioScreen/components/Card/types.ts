export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  hasMarquee?: boolean;
  isIntroCard?: boolean;
  isLastCard?: boolean;
  totalCards?: number;
}

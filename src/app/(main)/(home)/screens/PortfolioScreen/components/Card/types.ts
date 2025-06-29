export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  slug?: string;
  hasMarquee?: boolean;
  isIntroCard?: boolean;
  isLastCard?: boolean;
  totalCards?: number;
}

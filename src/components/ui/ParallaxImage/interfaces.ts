export interface IParallaxImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  parallaxFactor?: number;
  isMobile?: boolean;
}
export interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  link: string;
  openInNewTab?: boolean;
  isExternal?: boolean;
}

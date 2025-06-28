export interface INewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
  shortContent?: string;
  image: string;
  alt?: string;
  slug: string;
}

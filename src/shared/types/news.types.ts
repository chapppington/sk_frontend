export interface INews {
  id: string;
  category: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  imageUrl?: string;
  alt?: string;
  readingTime: number;
  shortContent?: string;
}

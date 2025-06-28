export interface INews {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  slug: string;
  imageUrl?: string;
  alt?: string;
  readingTime: number;
  shortContent?: string;
}

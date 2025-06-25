export interface INews {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  slug: string;
  imageUrl?: string;
  readingTime: number;
  shortContent?: string;
}

export interface INews {
  id: string;
  category: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  imageUrl?: string;
  readingTime: number;
  shortContent?: string;
}

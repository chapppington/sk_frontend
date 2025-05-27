export type Category = {
  name: string;
  slug: string;
};

export type NewsItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  description: string;
};

export type SortOption = "new" | "old";

export type MonthMap = {
  [key: string]: number;
};

export type QueryParams = {
  category?: string;
  sort?: SortOption;
  page?: string;
};

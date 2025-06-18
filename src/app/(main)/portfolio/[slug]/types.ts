export interface IPortfolioItem {
  id: string;
  name: string;
  poster?: string;
  year: number;
  taskTitle: string;
  taskDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  solutionSubtitle: string;
  solutionSubdescription: string;
  solutionImages?: string[];
  previewVideoPath?: string;
  fullVideoPath?: string;
  hasReview: boolean;
  reviewTitle?: string;
  reviewText?: string;
  reviewName?: string;
  reviewImage?: string;
  reviewRole?: string;
  createdAt: string;
  updatedAt: string;
}

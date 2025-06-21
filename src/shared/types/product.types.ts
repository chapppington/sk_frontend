export interface ImportantCharacteristic {
  value: string;
  unit?: { text: string };
  description: string;
}

export interface Advantage {
  label: string;
  icon: string;
  image: string;
  description: string;
}

export interface SimpleDescriptionItem {
  text: string;
}

export interface DetailedDescriptionItem {
  title: string;
  description: string;
}

export interface SimpleDescription {
  items: SimpleDescriptionItem[];
}

export interface DetailedDescription {
  items: DetailedDescriptionItem[];
}

export interface IPortfolioItem {
  id: string;
  name: string;
  slug: string;
  poster: string;
  year: number;
  description: string;
  taskTitle: string;
  taskDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  solutionSubtitle: string;
  solutionSubdescription: string;
  solutionImages: string[];
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

export interface IProduct {
  id: string;
  category: string;
  name: string;
  description: string;
  importantCharacteristics: ImportantCharacteristic[];
  advantages: Advantage[];
  simpleDescription: SimpleDescription;
  detailedDescription: DetailedDescription;
  advantageImages?: string[];
  advantageImageUrls?: string[];
  portfolioItems: IPortfolioItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductCatalogResponse {
  products: IProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateProductData {
  category: string;
  name: string;
  description: string;
  importantCharacteristics: ImportantCharacteristic[];
  advantages: Advantage[];
  simpleDescription: SimpleDescription;
  detailedDescription: DetailedDescription;
}

export interface UpdateProductData extends Partial<CreateProductData> {}

import { productCategories } from "./mock_data";

// Utility function to validate tab parameter
export const validateTabParam = (tab: string | null): "products" | "services" => {
  return tab === "services" ? "services" : "products";
};

// Utility function to validate category parameter
export const validateCategoryParam = (category: string | null): string => {
  // Check if category exists in productCategories
  if (category && productCategories.some((cat) => cat.id === category)) {
    return category;
  }
  return "all";
};

// Utility function to validate page parameter
export const validatePageParam = (page: string | null): number => {
  if (!page) return 1;
  const parsedPage = parseInt(page, 10);
  return !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
};

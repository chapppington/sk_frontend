export interface FilterButtonsProps {
  categories: Array<{ slug: string; name: string }>;
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}

import { FC } from "react";
import CategoryButton from "@/components/ui/CategoryButton";
import { FilterButtonsProps } from "./types";

const FilterButtons: FC<FilterButtonsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-20">
      {categories.map(({ slug, name }) => (
        <CategoryButton
          key={slug}
          onClick={() => onCategoryChange(slug)}
          isActive={selectedCategory === name}
        >
          {name}
        </CategoryButton>
      ))}
    </div>
  );
};

export default FilterButtons;

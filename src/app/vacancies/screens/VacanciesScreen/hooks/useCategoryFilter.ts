import { useMemo } from "react";
import { categoryMap } from "../mock_data";

interface UseCategoryFilterProps {
  jobs: any[];
  selectedCategory: string;
}

export function useCategoryFilter({
  jobs,
  selectedCategory,
}: UseCategoryFilterProps) {
  const categories = useMemo(() => {
    return Object.entries(categoryMap).map(([slug, name]) => ({
      slug,
      name,
    }));
  }, []);

  const filteredJobs = useMemo(() => {
    return selectedCategory === categoryMap.all
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);
  }, [selectedCategory, jobs]);

  return {
    categories,
    filteredJobs,
  };
}

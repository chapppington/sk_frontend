"use client";

import { useRef, FC } from "react";
import { useSearchParams } from "next/navigation";
import CustomContainer from "@/components/ui/CustomContainer";
import Pagination from "@/components/Pagination";
import { usePagination } from "./hooks/usePagination";
import { useCategoryFilter } from "./hooks/useCategoryFilter";
import { useUrlSync } from "./hooks/useUrlSync";
import { useJobAnimations } from "./hooks/useJobAnimations";
import FilterButtons from "./components/FilterButtons";
import JobList from "./components/JobList";

import { jobs, categoryMap } from "./mock_data";

const VacanciesScreen: FC = () => {
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 3;

  const categorySlug = searchParams.get("category") || "all";
  const selectedCategory =
    categoryMap[categorySlug as keyof typeof categoryMap] || categoryMap.all;

  const { updateUrl } = useUrlSync();
  const { categories, filteredJobs } = useCategoryFilter({
    jobs,
    selectedCategory,
  });
  const { currentPage, totalPages, currentItems, setCurrentPage } =
    usePagination({
      items: filteredJobs,
      itemsPerPage,
    });

  useJobAnimations(containerRef, [currentPage, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl({ page: page.toString() });
  };

  const handleCategoryChange = (slug: string) => {
    updateUrl({ category: slug, page: "1" });
    setCurrentPage(1);
  };

  return (
    <section id="jobs_list_section" className="py-20 relative">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[512px] bg-gradient-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      />
      <div ref={containerRef}>
        <CustomContainer>
          <FilterButtons
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <JobList jobs={currentItems} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        </CustomContainer>
      </div>
    </section>
  );
};

export default VacanciesScreen;

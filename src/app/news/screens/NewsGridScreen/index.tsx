"use client";

import { FC, useCallback, useRef, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useSearchParams, usePathname } from "next/navigation";
import gsap from "gsap";

import CustomContainer from "@/components/ui/CustomContainer";
import CategoryButton from "@/components/ui/CategoryButton";
import SelectDropdown from "@/components/ui/SelectDropdown";
import NewsGridItem from "./NewsGridItem";
import Pagination from "@/components/ui/Pagination";

import type { SortOption, QueryParams } from "./types";
import { sampleNews, categories } from "./mock_data";
import { parseRussianDate, createQueryString } from "./utils";

const NewsGrid: FC = () => {
  const lenis = useLenis();
  // Track if this is the initial render
  const [initialRender, setInitialRender] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedCategorySlug = searchParams.get("category") || "all";
  const selectedCategory =
    categories.find((cat) => cat.slug === selectedCategorySlug)?.name || "Все";
  const sortBy = (searchParams.get("sort") as SortOption) || "new";
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 6;

  // Reference for news grid animations
  const newsGridRef = useRef<HTMLDivElement>(null);
  const noResultsRef = useRef<HTMLDivElement>(null);

  const filteredNews = sampleNews
    .filter(
      (news) =>
        selectedCategorySlug === "all" || news.category === selectedCategory
    )
    .sort((a, b) => {
      const dateA = parseRussianDate(a.date);
      const dateB = parseRussianDate(b.date);
      return sortBy === "new"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateUrl = useCallback(
    (params: QueryParams) => {
      const newUrl = `${pathname}?${createQueryString(searchParams, params)}`;
      window.history.pushState({}, "", newUrl);
    },
    [pathname, searchParams]
  );

  // Run animation when component mounts
  useEffect(() => {
    // This will run on component mount only
    setInitialRender(false);
  }, []);

  // GSAP animations for grid items
  useEffect(() => {
    if (newsGridRef.current) {
      const items = newsGridRef.current.children;

      // Set initial state immediately
      gsap.set(items, { opacity: 0, y: 20 });

      // Use requestAnimationFrame to ensure animation starts as soon as possible
      requestAnimationFrame(() => {
        // Run animation immediately
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
          onComplete: () => {
            // Notify Lenis about the content height change
            if (lenis) {
              lenis.resize();
            }
          },
        });
      });
    }
  }, [selectedCategorySlug, sortBy, currentPage]);

  // Ensure content is visible on initial load
  useEffect(() => {
    // This runs only once on initial component mount
    const timer = setTimeout(() => {
      if (newsGridRef.current) {
        // Force all items to be visible in case animation didn't run
        gsap.set(newsGridRef.current.children, { opacity: 1, y: 0 });
        // Notify Lenis about the content height change
        if (lenis) {
          lenis.resize();
        }
      }
    }, 500); // Safety timeout

    return () => clearTimeout(timer);
  }, [lenis]);

  // GSAP animations for no results
  useEffect(() => {
    if (noResultsRef.current && currentNews.length === 0) {
      gsap.fromTo(
        noResultsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // Notify Lenis about the content height change
            if (lenis) {
              lenis.resize();
            }
          },
        }
      );
    }
  }, [currentNews.length, lenis]);

  const sortOptions = [
    { value: "new", label: "Дате публикации (новые)" },
    { value: "old", label: "Дате публикации (старые)" },
  ];

  const sortIcon = (
    <svg
      className="w-5 h-5 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      ></path>
    </svg>
  );

  return (
    <section className="py-20 relative">
      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[512px] bg-gradient-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      />
      <CustomContainer className="container mx-auto px-4">
        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12 space-y-6 lg:space-y-0">
          {/* Filters */}
          <div className="flex flex-col space-y-4">
            <span className="text-white/60 text-sm flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
              Фильтр по новостям:
            </span>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {categories.map((category) => (
                <CategoryButton
                  key={category.slug}
                  onClick={() =>
                    updateUrl({ category: category.slug, page: "1" })
                  }
                  isActive={selectedCategorySlug === category.slug}
                >
                  {category.name}
                </CategoryButton>
              ))}
            </div>
          </div>

          {/* Sorting - Using SelectDropdown */}
          <SelectDropdown
            options={sortOptions}
            value={sortBy}
            onChange={(value) =>
              updateUrl({ sort: value as SortOption, page: "1" })
            }
            label="Сортировать по:"
            icon={sortIcon}
          />
        </div>

        {/* News Grid - using the same pattern as CatalogSection */}
        {currentNews.length > 0 ? (
          <div
            ref={newsGridRef}
            key={`news-grid-${selectedCategorySlug}-${sortBy}-${currentPage}${
              initialRender ? "-initial" : ""
            }`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {currentNews.map((news) => (
              <NewsGridItem
                key={news.id}
                id={news.id}
                slug={news.slug}
                title={news.title}
                description={news.description}
                date={news.date}
                readTime={news.readTime}
              />
            ))}
          </div>
        ) : (
          <div
            ref={noResultsRef}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-white/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-white text-xl mb-2">
              По вашему запросу новости не найдены
            </h3>
            <p className="text-white/60 max-w-md mb-6">
              Попробуйте изменить параметры фильтрации или сортировки
            </p>
            <button
              onClick={() => updateUrl({ category: "all" })}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-white transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && currentNews.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => updateUrl({ page: String(page) })}
            className="mt-8"
          />
        )}
      </CustomContainer>
    </section>
  );
};

export default NewsGrid;

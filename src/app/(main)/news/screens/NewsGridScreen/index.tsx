"use client";

import { FC, useCallback, useRef, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useSearchParams, usePathname } from "next/navigation";
import gsap from "gsap";
import { useQuery } from "@tanstack/react-query";
import newsService from "@/services/news.service";
import { BACKEND_MAIN } from "@/constants";

import CustomContainer from "@/components/ui/CustomContainer";
import CategoryButton from "@/components/ui/CategoryButton";
import SelectDropdown from "@/components/ui/SelectDropdown";
import NewsGridItem from "./components/NewsGridItem";
import Pagination from "@/components/ui/Pagination";
import { FilterIcon } from "@/shared/icons/FilterIcon";
import { SortIcon } from "@/shared/icons/SortIcon";
import { SearchIcon } from "@/shared/icons/SearchIcon";
import NoResultsPlaceholder from "@/components/ui/NoResultsPlaceholder";

import type { SortOption, QueryParams } from "./types";
import { sampleNews, categories } from "./mock_data";
import { parseRussianDate, createQueryString } from "./utils";

const categoryMap: Record<string, string> = {
  all: "Все",
  production: "Производство",
  technology: "Технологии",
  event: "События",
  interview: "Интервью",
};

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

  // Fetch news from backend
  const {
    data: backendNews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await newsService.fetchAll();
      return data;
    },
  });

  // Transform API data to match the expected format
  const backendNewsItems = backendNews.map((item: any) => ({
    id: parseInt(item.id) || 0,
    category: categoryMap[item.category] || item.category,
    date: item.date || item.createdAt, // ISO string for sorting
    readTime: `${item.readingTime} мин`,
    title: item.title,
    description: item.shortContent || item.content?.substring(0, 150) + "...",
    shortContent: item.shortContent,
    image: item.imageUrl ? `${BACKEND_MAIN}${item.imageUrl}` : "/news_bg.webp",
    alt: item.alt,
    slug: item.slug,
  }));

  // Use backend data if available, otherwise fallback to mock
  const allNews =
    !error && backendNewsItems.length > 0 ? backendNewsItems : sampleNews;

  const filteredNews = allNews
    .filter(
      (news) =>
        selectedCategorySlug === "all" || news.category === selectedCategory
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
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

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 min-h-[60vh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">Загрузка новостей...</div>
      </section>
    );
  }

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
              <FilterIcon />
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
            icon={<SortIcon />}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && currentNews.length > 0 && (
          <div className="flex justify-start">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => updateUrl({ page: String(page) })}
              className="mb-8"
            />
          </div>
        )}

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
                key={`${news.id}-${news.slug}`}
                id={news.id}
                slug={news.slug}
                title={news.title}
                description={news.description}
                date={new Date(news.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                readTime={news.readTime}
                image={news.image}
                alt={news.alt}
              />
            ))}
          </div>
        ) : (
          <div ref={noResultsRef}>
            <NoResultsPlaceholder
              icon={<SearchIcon />}
              title="По вашему запросу новости не найдены"
              description="Попробуйте изменить параметры фильтрации или сортировки"
              onReset={() => updateUrl({ category: "all" })}
            />
          </div>
        )}
      </CustomContainer>
    </section>
  );
};

export default NewsGrid;

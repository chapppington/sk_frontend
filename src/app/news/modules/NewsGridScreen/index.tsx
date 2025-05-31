"use client";

import { FC, useCallback, useRef, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";

import CustomContainer from "@/components/ui/CustomContainer";
import TransitionLink from "@/components/ui/TransitionLink";
import CategoryButton from "@/components/ui/CategoryButton";
import SelectDropdown from "@/components/ui/SelectDropdown";

import type { SortOption, MonthMap, QueryParams } from "./types";
import { sampleNews, categories } from "./mock_data";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Reference for news grid animations
  const newsGridRef = useRef<HTMLDivElement>(null);
  const noResultsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const sortOptionRef = useRef<HTMLDivElement>(null);

  const parseRussianDate = (dateStr: string) => {
    const months: MonthMap = {
      Января: 0,
      Февраля: 1,
      Марта: 2,
      Апреля: 3,
      Мая: 4,
      Июня: 5,
      Июля: 6,
      Августа: 7,
      Сентября: 8,
      Октября: 9,
      Ноября: 10,
      Декабря: 11,
    };

    const [day, month, year] = dateStr.split(" ");
    return new Date(
      parseInt(year),
      months[month as keyof typeof months],
      parseInt(day)
    );
  };

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

  const createQueryString = useCallback(
    (params: QueryParams) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) newParams.set(key, value);
      });
      return newParams.toString();
    },
    [searchParams]
  );

  const updateUrl = useCallback(
    (params: QueryParams) => {
      const newUrl = `${pathname}?${createQueryString(params)}`;
      window.history.pushState({}, "", newUrl);
    },
    [pathname, createQueryString]
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
          delay: 0.1, // Explicitly set delay to 0
          onComplete: () => {
            // Notify Lenis about the content height change
            if (lenis) {
              lenis.resize();
            }
          },
        });
      });
    }
  }, [selectedCategorySlug, sortBy, currentPage, lenis]);

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

  // GSAP animations for no results - exactly like in CatalogSection
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

  // Handle dropdown animations
  useEffect(() => {
    if (!dropdownRef.current || !optionsRef.current || !arrowRef.current)
      return;

    if (isDropdownOpen) {
      // Animate options appearing
      gsap.fromTo(
        optionsRef.current,
        {
          opacity: 0,
          y: -10,
          display: "none",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
          display: "block",
          onComplete: () => {
            // Ensure Lenis knows about the height change
            if (lenis) {
              lenis.resize();
            }
          },
        }
      );

      // Rotate arrow
      gsap.to(arrowRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Animate options disappearing
      gsap.to(optionsRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(optionsRef.current, { display: "none" });
          // Ensure Lenis knows about the height change
          if (lenis) {
            lenis.resize();
          }
        },
      });

      // Rotate arrow back
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isDropdownOpen, lenis]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle option selection with animation
  const handleSortChange = (newSort: SortOption) => {
    if (sortBy === newSort) return;

    if (sortOptionRef.current) {
      // Animate the selected option without changing size
      gsap.fromTo(
        sortOptionRef.current,
        { backgroundColor: "rgba(255, 255, 255, 0.2)" },
        {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }

    updateUrl({ sort: newSort });
    setIsDropdownOpen(false);
  };

  // Add resize listener for content changes
  useEffect(() => {
    // Update Lenis on page visibility change (when switching tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && lenis) {
        setTimeout(() => {
          lenis.resize();
        }, 100);
      }
    };

    // Update on window resize
    const handleResize = () => {
      if (lenis) lenis.resize();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [lenis]);

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
                  onClick={() => updateUrl({ category: category.slug })}
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
            onChange={(value) => updateUrl({ sort: value as SortOption })}
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
              <article
                key={news.id}
                className="group relative overflow-hidden rounded-lg p-1 transition-all duration-300"
                style={{ opacity: 0 }} /* Start invisible */
              >
                <TransitionLink href={`/news/${news.slug}`} className="block">
                  <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg aspect-[4/3]">
                    <Image
                      src="/news_bg.webp"
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center space-x-4 text-white/60 text-sm md:text-base lg:text-base">
                      <span>{news.date}</span>
                      <span>•</span>
                      <span>{news.readTime}</span>
                    </div>
                    <h3 className="text-xl font-medium text-white line-clamp-2 transition-colors duration-300 group-hover:text-white/80">
                      {news.title}
                    </h3>

                    <p className="text-white/60 transition-colors duration-300 group-hover:text-white/80">
                      {news.description}
                    </p>
                  </div>
                </TransitionLink>
                <TransitionLink
                  href={`/news/${news.slug}`}
                  className="inline-flex items-center mt-6 text-white transition-colors duration-300 group-hover:text-white/80"
                >
                  <div className="inline-flex items-center group">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        ></path>
                      </svg>
                    </div>
                    <span className="ml-4 text-white text-lg">Читать</span>
                  </div>
                </TransitionLink>
              </article>
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
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() =>
                updateUrl({
                  page: String(Math.max(currentPage - 1, 1)),
                })
              }
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-white"
              } transition-colors`}
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => updateUrl({ page: String(page) })}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white hover:border-white"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                updateUrl({
                  page: String(Math.min(currentPage + 1, totalPages)),
                })
              }
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-white"
              } transition-colors`}
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </CustomContainer>
    </section>
  );
};

export default NewsGrid;

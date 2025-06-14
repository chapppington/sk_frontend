"use client";

import gsap from "gsap";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";
import { FC, useState, useEffect, useRef, Suspense } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import TransitionLink from "@/components/ui/TransitionLink";
import CategoryButton from "@/components/ui/CategoryButton";
import Pagination from "@/components/ui/Pagination";

import { productCategories, products, services } from "./mock_data";
import {
  validateCategoryParam,
  validatePageParam,
  validateTabParam,
} from "./utils";

const CatalogSectionContent: FC = () => {
  const lenis = useLenis();
  const searchParams = useSearchParams();

  // Get and sanitize URL params
  const tabParam = validateTabParam(searchParams.get("tab"));
  const categoryParam = validateCategoryParam(searchParams.get("category"));
  const searchParam = searchParams.get("search") || "";
  const pageParam = validatePageParam(searchParams.get("page"));

  const [activeTab, setActiveTab] = useState<"products" | "services">(tabParam);
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchParam);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPage = 6;

  const activeTabIndicatorRef = useRef<HTMLDivElement>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const noResultsRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update URL params when state changes
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("tab", activeTab);

    if (activeCategory !== "all") {
      params.set("category", activeCategory);
    }

    if (debouncedSearchQuery) {
      params.set("search", debouncedSearchQuery);
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", url);
  }, [activeTab, activeCategory, debouncedSearchQuery, currentPage]);

  // Debounce search query
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      if (searchQuery) {
        setActiveCategory("all");
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const filteredProducts = products.filter(
    (product) =>
      (debouncedSearchQuery
        ? true
        : activeCategory === "all" || product.category === activeCategory) &&
      product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // GSAP animations for tab switching
  useEffect(() => {
    if (activeTabIndicatorRef.current) {
      gsap.to(activeTabIndicatorRef.current, {
        x: activeTab === "products" ? "0%" : "100%",
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          // Notify Lenis about the content height change
          if (lenis) {
            lenis.resize();
          }
        },
      });
    }
  }, [activeTab, lenis]);

  // GSAP animations for grid items
  useEffect(() => {
    const gridRef =
      activeTab === "products" ? productsGridRef : servicesGridRef;
    if (gridRef.current) {
      const items = gridRef.current.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
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
  }, [activeTab, debouncedSearchQuery, activeCategory, currentPage, lenis]);

  // GSAP animations for pagination
  useEffect(() => {
    if (paginationRef.current) {
      gsap.fromTo(
        paginationRef.current,
        { opacity: 0, y: -10 },
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
  }, [activeCategory, activeTab, lenis]);

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, debouncedSearchQuery]);

  // GSAP animations for no results
  useEffect(() => {
    if (noResultsRef.current) {
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
  }, [filteredProducts.length, filteredServices.length, lenis]);

  // Add general resize handler for content changes
  useEffect(() => {
    if (!lenis) return;

    // Update Lenis on page visibility change (when switching tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setTimeout(() => {
          lenis.resize();
        }, 100);
      }
    };

    // Update on window resize
    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [lenis]);

  // Effect to handle dropdown open/close and resize Lenis
  useEffect(() => {
    if (lenis && isDropdownOpen !== undefined) {
      // Small delay to allow the dropdown to render completely
      setTimeout(() => {
        lenis.resize();
      }, 50);
    }
  }, [isDropdownOpen, lenis]);

  return (
    <section id="catalog_section" className="bg-transparent py-24">
      <CustomContainer>
        {/* Mobile Navigation */}
        <div className="flex flex-col gap-6 xl:hidden">
          <div className="flex w-full relative">
            <button
              onClick={() => {
                setActiveTab("products");
                setActiveCategory("all");
                setSearchQuery("");
                setDebouncedSearchQuery("");
              }}
              className={`flex-1 text-xl pb-4 transition-colors duration-300 relative ${
                activeTab === "products" ? "text-white" : "text-white/60"
              }`}
            >
              Продукция
            </button>
            <button
              onClick={() => {
                setActiveTab("services");
                setActiveCategory("all");
                setSearchQuery("");
                setDebouncedSearchQuery("");
              }}
              className={`flex-1 text-xl pb-4 transition-colors duration-300 relative ${
                activeTab === "services" ? "text-white" : "text-white/60"
              }`}
            >
              Услуги
            </button>
            <div
              ref={activeTabIndicatorRef}
              className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-white"
            />
          </div>

          {/* Mobile Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по каталогу"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white/20"
            />
            <svg
              className="w-5 h-5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2"
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

          {/* Mobile Category Dropdown */}
          {activeTab === "products" && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              >
                <span>
                  {productCategories.find((cat) => cat.id === activeCategory)
                    ?.name || "Выберите категорию"}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg py-2">
                  {productCategories.map((category) => (
                    <CategoryButton
                      key={category.id}
                      isActive={activeCategory === category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setIsDropdownOpen(false);
                        setSearchQuery("");
                        setDebouncedSearchQuery("");
                      }}
                      className="w-full rounded-none"
                    >
                      {category.name}
                    </CategoryButton>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <div className="relative flex flex-col items-start group">
              <button
                onClick={() => {
                  setActiveTab("products");
                  setActiveCategory("all");
                  setSearchQuery("");
                  setDebouncedSearchQuery("");
                }}
                className={`text-xl pb-4 transition-colors duration-300 ${
                  activeTab === "products" ? "text-white" : "text-white/60"
                }`}
              >
                Продукция
              </button>
              <div
                className={`w-[240px] h-[2px] bg-white transition-transform duration-300 ${
                  activeTab === "products" ? "scale-x-100" : "scale-x-95"
                }`}
              />
            </div>
            <div className="relative flex flex-col items-start group">
              <button
                onClick={() => {
                  setActiveTab("services");
                  setActiveCategory("all");
                  setSearchQuery("");
                  setDebouncedSearchQuery("");
                }}
                className={`text-xl pb-4 transition-colors duration-300 ${
                  activeTab === "services" ? "text-white" : "text-white/60"
                }`}
              >
                Услуги
              </button>
              <div
                className={`w-[240px] h-[2px] bg-white transition-transform duration-300 ${
                  activeTab === "services" ? "scale-x-100" : "scale-x-95"
                }`}
              />
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по каталогу"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white/20"
            />
            <svg
              className="w-5 h-5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
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
        </div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mt-8 xl:mt-0">
          {/* Left Navigation */}
          {activeTab === "products" && (
            <div className="hidden xl:flex xl:w-[400px] flex-col gap-2">
              {productCategories.map((category) => (
                <CategoryButton
                  key={category.id}
                  isActive={activeCategory === category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setIsDropdownOpen(false);
                    setSearchQuery("");
                    setDebouncedSearchQuery("");
                  }}
                >
                  {category.name}
                </CategoryButton>
              ))}
            </div>
          )}

          {/* Catalog Grid Section */}
          <div className="flex-1">
            {activeTab === "products" && (
              <div className="hidden xl:flex justify-end mb-6">
                {totalPages > 1 && filteredProducts.length > 0 && (
                  <div ref={paginationRef}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === "products" ? (
              <>
                {filteredProducts.length > 0 ? (
                  <div
                    ref={productsGridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                  >
                    {currentProducts.map((product) => (
                      <div key={product.id} className="flex flex-col group">
                        <TransitionLink
                          href={`/product/${product.slug}`}
                          className="block"
                        >
                          <div className="bg-white rounded-xl overflow-hidden mb-4">
                            <Image
                              width={300}
                              height={300}
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-white text-lg transition-colors duration-300 group-hover:text-white/80">
                              {product.title}
                            </h3>
                            <div className="inline-flex items-center">
                              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-all duration-200 group-hover:scale-[0.99] group-active:scale-[0.93]">
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
                              <span className="ml-4 text-white text-lg">
                                Подробнее
                              </span>
                            </div>
                          </div>
                        </TransitionLink>
                      </div>
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
                      По вашему запросу продукция не найдена
                    </h3>
                    <p className="text-white/60 max-w-md mb-6">
                      Попробуйте изменить параметры поиска или категорию
                    </p>
                    <button
                      onClick={() => {
                        if (searchTimeoutRef.current) {
                          clearTimeout(searchTimeoutRef.current);
                        }
                        setSearchQuery("");
                        setDebouncedSearchQuery("");
                        setActiveCategory("all");
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-white transition-colors"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {filteredServices.length > 0 ? (
                  <div
                    ref={servicesGridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
                  >
                    {filteredServices.map((service) => (
                      <div key={service.id} className="flex flex-col group">
                        <TransitionLink
                          href={`/service/${service.category}`}
                          className="block"
                        >
                          <div className="space-y-4">
                            <h3 className="text-white text-lg transition-colors duration-300 group-hover:text-white/80">
                              {service.title}
                            </h3>
                            <p className="text-white/80 transition-colors duration-300 group-hover:text-white/80">
                              {service.description}
                            </p>
                            <div className="inline-flex items-center">
                              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-all duration-200 group-hover:scale-[0.99] group-active:scale-[0.93]">
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
                              <span className="ml-4 text-white text-lg">
                                Подробнее
                              </span>
                            </div>
                          </div>
                        </TransitionLink>
                      </div>
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
                      По вашему запросу услуги не найдены
                    </h3>
                    <p className="text-white/60 max-w-md mb-6">
                      Попробуйте изменить параметры поиска
                    </p>
                    <button
                      onClick={() => {
                        if (searchTimeoutRef.current) {
                          clearTimeout(searchTimeoutRef.current);
                        }
                        setSearchQuery("");
                        setDebouncedSearchQuery("");
                        setActiveCategory("all");
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-white transition-colors"
                    >
                      Сбросить поиск
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

const CatalogSection: FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <CatalogSectionContent />
    </Suspense>
  );
};

export default CatalogSection;

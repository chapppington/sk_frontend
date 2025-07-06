"use client";

import { FC, useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { useSearchParams, usePathname } from "next/navigation";
import gsap from "gsap";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import productService from "@/services/product.service";
import { IProduct, ProductCatalogResponse } from "@/shared/types/product.types";
import { BACKEND_MAIN, UPLOADS_URL } from "@/constants";

import CategoryButton from "@/components/ui/CategoryButton";
import Pagination from "@/components/ui/Pagination";
import NoResultsPlaceholder from "@/components/ui/NoResultsPlaceholder";
import SearchBar from "@/components/ui/SearchBar";
import { SearchIcon } from "@/shared/icons/SearchIcon";
import ProductCard from "../ProductCard";
import { Skeleton } from "@/components/ui/shadcn/skeleton";

import { productCategories } from "@/shared/utils/categoryMapping";
import { ProductsTabProps } from "./types";

// Кастомный skeleton для карточки товара в стиле страницы новости
const ProductCardSkeleton = () => (
  <div className="flex flex-col group">
    <div className="bg-white/10 rounded-xl overflow-hidden mb-4 aspect-square w-full flex items-center justify-center animate-pulse">
      
    </div>
    <div className="space-y-4 w-full">
      <div className="h-6 bg-white/20 rounded w-3/4 animate-pulse" />
      <div className="flex items-center space-x-2 mt-2">
        <div className="w-12 h-12 rounded-full border border-white/10 bg-white/10 animate-pulse" />
        <div className="h-5 w-20 bg-white/10 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const ProductsTab: FC<ProductsTabProps> = ({
  productsGridRef,
  paginationRef,
  noResultsRef,
}) => {
  const lenis = useLenis();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize state from URL params
  const [activeCategory, setActiveCategory] = useState(
    (() => {
      const param = searchParams.get("category");
      const found = productCategories.find((cat) => cat.slug === param);
      return found ? found.slug : "all";
    })()
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeCategory !== "all") {
      params.set("category", activeCategory);
    } else {
      params.delete("category");
    }
    if (debouncedSearchQuery) {
      params.set("search", debouncedSearchQuery);
    } else {
      params.delete("search");
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  }, [activeCategory, debouncedSearchQuery, currentPage, pathname]);

  const itemsPerPage = 6;

  // Получаем параметры для запроса
  const apiCategory = activeCategory === "all" ? undefined : activeCategory;
  const apiPage = currentPage;
  const apiLimit = itemsPerPage;

  // React Query для получения товаров
  const { data, isLoading, isError, isFetching, refetch } = useQuery<
    ProductCatalogResponse,
    Error
  >({
    queryKey: [
      "products-catalog",
      apiCategory,
      apiPage,
      apiLimit,
      debouncedSearchQuery,
    ],
    queryFn: async () => {
      // fetchCatalog не поддерживает поиск, если нужно — доработать на бэке
      const { data } = await productService.fetchCatalog(
        apiCategory,
        apiPage,
        apiLimit
      );
      // Фильтрация по поиску на клиенте, если нет поддержки на бэке
      if (debouncedSearchQuery) {
        const filtered = data.products.filter((product: IProduct) =>
          product.name
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
        );
        return {
          ...data,
          products: filtered,
          pagination: {
            ...data.pagination,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / apiLimit),
          },
        };
      }
      return data;
    },
  });

  // Обработка пагинации и продуктов
  const totalPages =
    (data as ProductCatalogResponse | undefined)?.pagination?.totalPages || 1;
  const currentProducts =
    (data as ProductCatalogResponse | undefined)?.products || [];

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, debouncedSearchQuery]);

  // GSAP animations for grid items
  useEffect(() => {
    if (productsGridRef.current) {
      const items = productsGridRef.current.children;
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
            if (lenis) {
              lenis.resize();
            }
          },
        }
      );
    }
  }, [debouncedSearchQuery, activeCategory, currentPage]);

  // GSAP animations for pagination to appear/disapear
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
            if (lenis) {
              lenis.resize();
            }
          },
        }
      );
    }
  }, [activeCategory]);

  // GSAP animations for no results
  useEffect(() => {
    if (noResultsRef.current && currentProducts.length === 0) {
      gsap.fromTo(
        noResultsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            if (lenis) {
              lenis.resize();
            }
          },
        }
      );
    }
  }, [currentProducts.length]);

  // Effect to handle dropdown open/close and resize Lenis
  useEffect(() => {
    if (lenis && isDropdownOpen !== undefined) {
      setTimeout(() => {
        lenis.resize();
      }, 50);
    }
  }, [isDropdownOpen]);

  console.log(
    "isLoading",
    isLoading,
    "isFetching",
    isFetching,
    "data",
    data,
    "currentProducts",
    currentProducts
  );

  return (
    <>
      <div className="hidden xl:flex xl:w-[400px] flex-col gap-2">
        {productCategories.map((category) => (
          <CategoryButton
            key={category.slug}
            isActive={activeCategory === category.slug}
            onClick={() => {
              setActiveCategory(category.slug);
              setIsDropdownOpen(false);
              setSearchQuery("");
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </div>

      <div className="flex-1">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск по каталогу"
          className="mb-6"
        />

        <div className="hidden xl:flex justify-start mb-6">
          {totalPages > 1 && currentProducts.length > 0 && (
            <div ref={paginationRef}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {(isLoading || isFetching) ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            style={{ minHeight: 200 }}
          >
            {[...Array(itemsPerPage)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center min-h-[200px] text-red-500">
            Ошибка загрузки товаров
          </div>
        ) : currentProducts.length > 0 ? (
          <div
            ref={productsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {currentProducts.map((product: IProduct) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={"slug" in product ? (product as any).slug : product.id}
                title={product.name}
                image={
                  product.previewImageUrl
                    ? `${UPLOADS_URL}${product.previewImageUrl}`
                    : product.previewImage || "/transformer.webp"
                }
              />
            ))}
          </div>
        ) : (
          <div ref={noResultsRef}>
            <NoResultsPlaceholder
              icon={<SearchIcon />}
              title="По вашему запросу продукция не найдена"
              description="Попробуйте изменить параметры поиска или категорию"
              onReset={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsTab;

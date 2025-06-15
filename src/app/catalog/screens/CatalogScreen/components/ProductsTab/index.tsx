"use client";

import { FC, useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useDebounce } from "@/hooks/useDebounce";

import CategoryButton from "@/components/ui/CategoryButton";
import Pagination from "@/components/ui/Pagination";
import NoResultsPlaceholder from "@/components/ui/NoResultsPlaceholder";
import SearchBar from "@/components/ui/SearchBar";
import { SearchIcon } from "@/icons/SearchIcon";
import ProductCard from "../ProductCard";

import { productCategories, products } from "../../mock_data";
import { ProductsTabProps } from "./types";

const ProductsTab: FC<ProductsTabProps> = ({
  productsGridRef,
  paginationRef,
  noResultsRef,
}) => {
  const lenis = useLenis();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const itemsPerPage = 6;
  const filteredProducts = products.filter(
    (product) =>
      (debouncedSearchQuery
        ? true
        : activeCategory === "all" || product.category === activeCategory) &&
      product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    if (noResultsRef.current && filteredProducts.length === 0) {
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
  }, [filteredProducts.length]);

  // Effect to handle dropdown open/close and resize Lenis
  useEffect(() => {
    if (lenis && isDropdownOpen !== undefined) {
      setTimeout(() => {
        lenis.resize();
      }, 50);
    }
  }, [isDropdownOpen]);

  return (
    <>
      <div className="hidden xl:flex xl:w-[400px] flex-col gap-2">
        {productCategories.map((category) => (
          <CategoryButton
            key={category.id}
            isActive={activeCategory === category.id}
            onClick={() => {
              setActiveCategory(category.id);
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

        {filteredProducts.length > 0 ? (
          <div
            ref={productsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                title={product.title}
                image={product.image}
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

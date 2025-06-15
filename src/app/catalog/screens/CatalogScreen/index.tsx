"use client";

import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";
import { FC, useState, useEffect, useRef, Suspense } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import CatalogTabButton from "./components/CatalogTabButton";

import { validateTabParam } from "./utils";
import ProductsTab from "./components/ProductsTab";
import ServicesTab from "./components/ServicesTab";

const CatalogSectionContent: FC = () => {
  const lenis = useLenis();
  const searchParams = useSearchParams();

  // Get and sanitize URL params
  const tabParam = validateTabParam(searchParams.get("tab"));

  const [activeTab, setActiveTab] = useState<"products" | "services">(tabParam);

  const activeTabIndicatorRef = useRef<HTMLDivElement | null>(null);
  const productsGridRef = useRef<HTMLDivElement | null>(null);
  const servicesGridRef = useRef<HTMLDivElement | null>(null);
  const noResultsRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  // Update URL params when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", url);
  }, [activeTab]);

  // GSAP animations for tab switching
  useEffect(() => {
    if (activeTabIndicatorRef.current) {
      gsap.to(activeTabIndicatorRef.current, {
        x: activeTab === "products" ? "0%" : "100%",
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          if (lenis) {
            lenis.resize();
          }
        },
      });
    }
  }, [activeTab]);

  return (
    <section id="catalog_section" className="bg-transparent py-24">
      <CustomContainer>
        {/* Navigation - Unified for both mobile and desktop */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 w-full xl:w-auto">
            <CatalogTabButton
              label="Продукция"
              isActive={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            />
            <CatalogTabButton
              label="Услуги"
              isActive={activeTab === "services"}
              onClick={() => setActiveTab("services")}
            />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mt-8 xl:mt-0">
          {activeTab === "products" ? (
            <ProductsTab
              productsGridRef={productsGridRef}
              paginationRef={paginationRef}
              noResultsRef={noResultsRef}
            />
          ) : (
            <ServicesTab
              servicesGridRef={servicesGridRef}
              noResultsRef={noResultsRef}
            />
          )}
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

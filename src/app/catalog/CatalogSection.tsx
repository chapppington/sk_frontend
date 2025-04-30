"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomContainer from "@/components/ui/CustomContainer";

// Sample data structure
const productCategories = [
  { id: "all", name: "Вся продукция" },
  { id: "kts", name: "Комплектные трансформаторные подстанции" },
  { id: "nku", name: "Низковольтные комплектные устройства" },
  { id: "quality", name: "Улучшение качества электроэнергии" },
  {
    id: "accounting",
    name: "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
  },
  { id: "stations", name: "Электростанции и установки" },
  { id: "kru", name: "Комплектные распределительные устройства" },
];

const products = [
  {
    id: 1,
    title: "2КТПт 25..250 кВА",
    image: "/transformer.png",
    category: "kts",
  },
  {
    id: 2,
    title: "КТП 63..2500 кВА",
    image: "/transformer.png",
    category: "kts",
  },
  {
    id: 3,
    title: "КТПН 25..250 кВА",
    image: "/transformer.png",
    category: "kts",
  },
  {
    id: 4,
    title: "НКУ-0,4 кВ",
    image: "/transformer.png",
    category: "nku",
  },
  {
    id: 5,
    title: "НКУ-0,4 кВ с АВР",
    image: "/transformer.png",
    category: "nku",
  },
  {
    id: 6,
    title: "НКУ-0,4 кВ с ЧРП",
    image: "/transformer.png",
    category: "nku",
  },
  {
    id: 7,
    title: "УКРМ-0,4 кВ",
    image: "/transformer.png",
    category: "quality",
  },
  {
    id: 8,
    title: "УКРМ-6(10) кВ",
    image: "/transformer.png",
    category: "quality",
  },
  {
    id: 9,
    title: "ПКУ-6(10) кВ",
    image: "/transformer.png",
    category: "accounting",
  },
  {
    id: 10,
    title: "ПКУ-35 кВ",
    image: "/transformer.png",
    category: "accounting",
  },
  {
    id: 11,
    title: "ДЭС 10..2000 кВт",
    image: "/transformer.png",
    category: "stations",
  },
  {
    id: 12,
    title: "КРУ-6(10) кВ",
    image: "/transformer.png",
    category: "kru",
  },
  {
    id: 13,
    title: "КРУ-35 кВ",
    image: "/transformer.png",
    category: "kru",
  },
];

const services = [
  {
    id: 1,
    title: "Монтаж и пусконаладка",
    description: "Профессиональный монтаж и настройка оборудования",
    category: "installation",
  },
  {
    id: 2,
    title: "Проектирование",
    description: "Разработка проектной документации и технических решений",
    category: "design",
  },
  {
    id: 3,
    title: "Техническое обслуживание",
    description: "Плановое и аварийное обслуживание оборудования",
    category: "maintenance",
  },
  {
    id: 4,
    title: "Ремонт и модернизация",
    description: "Восстановление и улучшение характеристик оборудования",
    category: "repair",
  },
  {
    id: 5,
    title: "Консультации и обучение",
    description: "Технические консультации и обучение персонала",
    category: "consulting",
  },
  {
    id: 6,
    title: "Аудит энергосистем",
    description: "Комплексный анализ и оптимизация энергосистем",
    category: "audit",
  },
];

const CatalogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"products" | "services">(
    "products"
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPage = 6;

  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "all" || product.category === activeCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <section id="catalog_section" className="bg-transparent py-24">
      <CustomContainer>
        {/* Mobile Navigation */}
        <div className="flex flex-col gap-6 xl:hidden">
          <div className="flex w-full">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 text-xl pb-4 transition-colors duration-300 relative ${
                activeTab === "products" ? "text-white" : "text-white/60"
              }`}
            >
              Продукция
              {activeTab === "products" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                  layoutId="activeTabMobile"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 text-xl pb-4 transition-colors duration-300 relative ${
                activeTab === "services" ? "text-white" : "text-white/60"
              }`}
            >
              Услуги
              {activeTab === "services" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                  layoutId="activeTabMobile"
                />
              )}
            </button>
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
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        activeCategory === category.id
                          ? "text-white bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {category.name}
                    </button>
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
                onClick={() => setActiveTab("products")}
                className={`text-xl pb-4 transition-colors duration-300 ${
                  activeTab === "products" ? "text-white" : "text-white/60"
                }`}
              >
                Продукция
              </button>
              <motion.div
                className="w-[240px] h-[2px] bg-white"
                initial={false}
                animate={{
                  scaleX: activeTab === "products" ? 1 : 0.95,
                  backgroundColor:
                    activeTab === "products"
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.6)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="relative flex flex-col items-start group">
              <button
                onClick={() => setActiveTab("services")}
                className={`text-xl pb-4 transition-colors duration-300 ${
                  activeTab === "services" ? "text-white" : "text-white/60"
                }`}
              >
                Услуги
              </button>
              <motion.div
                className="w-[240px] h-[2px] bg-white"
                initial={false}
                animate={{
                  scaleX: activeTab === "services" ? 1 : 0.95,
                  backgroundColor:
                    activeTab === "services"
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.6)",
                }}
                transition={{ duration: 0.3 }}
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
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-fit inline-block text-left px-4 py-3 rounded-lg transition-colors border ${
                    activeCategory === category.id
                      ? "text-white bg-white/10 border-white/20"
                      : "text-white/80 hover:text-white hover:bg-white/5 border-white/10"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          )}

          {/* Catalog Grid Section */}
          <div className="flex-1">
            {activeTab === "products" ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                  {currentProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col"
                    >
                      <div className="bg-white rounded-xl overflow-hidden mb-4">
                        <Image
                          width={300}
                          height={300}
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-white text-lg mb-3">
                        {product.title}
                      </h3>
                      <a href="#" className="inline-flex items-center group">
                        <div className="w-14 h-14 rounded-full border border-white/30 group-hover:border-white flex items-center justify-center mr-3 transition-colors">
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
                              d="M4.5 19.5l15-15 M19.5 19.5v-15 M4.5 4.5h15"
                            />
                          </svg>
                        </div>
                        <span className="text-white/60 group-hover:text-white border-b border-white/30 group-hover:border-white transition-colors">
                          Подробнее
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-white transition-colors"
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                            currentPage === page
                              ? "bg-white text-black border-white"
                              : "border-white/30 text-white hover:border-white"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-white transition-colors"
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
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
              >
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col"
                  >
                    <div className="bg-white/5 rounded-xl p-6 mb-4">
                      <h3 className="text-white text-lg mb-3">
                        {service.title}
                      </h3>
                      <p className="text-white/60">{service.description}</p>
                    </div>
                    <a href="#" className="inline-flex items-center group">
                      <div className="w-14 h-14 rounded-full border border-white/30 group-hover:border-white flex items-center justify-center mr-3 transition-colors">
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
                            d="M4.5 19.5l15-15 M19.5 19.5v-15 M4.5 4.5h15"
                          />
                        </svg>
                      </div>
                      <span className="text-white/60 group-hover:text-white border-b border-white/30 group-hover:border-white transition-colors">
                        Подробнее
                      </span>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default CatalogSection;

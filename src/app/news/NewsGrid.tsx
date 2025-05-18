"use client";

import { FC, useCallback, useRef, useEffect, useState } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import TransitionLink from "@/components/ui/TransitionLink";
import { useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";

// Sample data
const sampleNews = [
  {
    id: 1,
    title: "Очевидцы сообщают, что слышали гитарный перебор",
    category: "Музыка",
    date: "29 Января 2024",
    readTime: "5 минут",
    slug: "ochevidcy-soobshchayut-chto-slyshali-gitarnyy-perebor",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует подготовке и реализации анализа существующих паттернов поведения.",
  },
  {
    id: 2,
    title: "Новый альбом группы выходит в свет",
    category: "Музыка",
    date: "28 Января 2024",
    readTime: "3 минуты",
    slug: "novyy-albom-gruppy-vyhodit-v-svet",
    description:
      "Современные технологии достигли такого уровня, что реализация намеченных плановых заданий способствует подготовке и реализации анализа существующих паттернов поведения.",
  },
  {
    id: 3,
    title: "Концерт в поддержку молодых исполнителей",
    category: "События",
    date: "27 Января 2024",
    readTime: "4 минуты",
    slug: "koncert-v-podderzhku-molodyh-ispolniteley",
    description:
      "Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта.",
  },
  {
    id: 4,
    title: "Интервью с известным музыкантом",
    category: "Интервью",
    date: "26 Января 2024",
    readTime: "7 минут",
    slug: "intervyu-s-izvestnym-muzykantom",
    description:
      "Сложно сказать, почему элементы политического процесса, инициированные исключительно синтетически, разоблачены.",
  },
  {
    id: 5,
    title: "Музыкальный фестиваль в этом году",
    category: "События",
    date: "25 Января 2024",
    readTime: "6 минут",
    slug: "muzykalnyy-festival-v-etom-godu",
    description:
      "Принимая во внимание показатели успешности, высококачественный прототип будущего проекта способствует повышению качества анализа существующих паттернов поведения.",
  },
  {
    id: 6,
    title: "Новые тенденции в мире музыки",
    category: "Музыка",
    date: "24 Января 2024",
    readTime: "4 минуты",
    slug: "novye-tendencii-v-mire-muzyki",
    description:
      "С другой стороны, реализация намеченных плановых заданий способствует подготовке и реализации анализа существующих паттернов поведения.",
  },
  {
    id: 7,
    title: "Эксклюзивное интервью с дирижером",
    category: "Интервью",
    date: "23 Января 2024",
    readTime: "8 минут",
    slug: "eksklyuzivnoe-intervyu-s-dirizherom",
    description:
      "Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовке и реализации позиций.",
  },
  {
    id: 8,
    title: "Музыкальный конкурс для молодых талантов",
    category: "События",
    date: "22 Января 2024",
    readTime: "5 минут",
    slug: "muzykalnyy-konkurs-dlya-molodyh-talantov",
    description:
      "Повседневная практика показывает, что сложившаяся структура организации позволяет выполнять важные задания по разработке направлений прогрессивного развития.",
  },
  {
    id: 9,
    title: "Новый музыкальный инструмент в коллекции музея",
    category: "Музыка",
    date: "21 Января 2024",
    readTime: "4 минуты",
    slug: "novyy-muzykalnyy-instrument-v-kollekcii-muzeya",
    description:
      "Разнообразный и богатый опыт говорит нам, что реализация намеченных плановых заданий создаёт предпосылки для новых предложений.",
  },
  {
    id: 10,
    title: "Мастер-класс по игре на скрипке",
    category: "События",
    date: "20 Января 2024",
    readTime: "6 минут",
    slug: "master-klass-po-igre-na-skripke",
    description:
      "С другой стороны, укрепление и развитие внутренней структуры требует от нас анализа системы массового участия.",
  },
  {
    id: 11,
    title: "Интервью с композитором современной музыки",
    category: "Интервью",
    date: "19 Января 2024",
    readTime: "7 минут",
    slug: "intervyu-s-kompozitorom-sovremennoy-muzyki",
    description:
      "Таким образом, высокое качество позиционных исследований способствует подготовке и реализации дальнейших направлений развития.",
  },
  {
    id: 12,
    title: "Открытие нового концертного зала",
    category: "События",
    date: "18 Января 2024",
    readTime: "5 минут",
    slug: "otkrytie-novogo-koncertnogo-zala",
    description:
      "С учётом сложившейся международной обстановки, постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовке и реализации новых предложений.",
  },
];

const categories = [
  { name: "Все", slug: "all" },
  { name: "Музыка", slug: "music" },
  { name: "События", slug: "events" },
  { name: "Интервью", slug: "interviews" },
];

const NewsGrid: FC = () => {
  // Track if this is the initial render
  const [initialRender, setInitialRender] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedCategorySlug = searchParams.get("category") || "all";
  const selectedCategory =
    categories.find((cat) => cat.slug === selectedCategorySlug)?.name || "Все";
  const sortBy = (searchParams.get("sort") as "new" | "old") || "new";
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
    const months = {
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
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value);
      });
      return newParams.toString();
    },
    [searchParams]
  );

  const updateUrl = useCallback(
    (params: Record<string, string>) => {
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
      }
    }, 500); // Safety timeout

    return () => clearTimeout(timer);
  }, []);

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
        }
      );
    }
  }, [currentNews.length]);

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
        },
      });

      // Rotate arrow back
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isDropdownOpen]);

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
  const handleSortChange = (newSort: "new" | "old") => {
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
                <button
                  key={category.slug}
                  onClick={() => updateUrl({ category: category.slug })}
                  className={`px-4 py-2 rounded transition-colors ${
                    selectedCategorySlug === category.slug
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-white/60 hover:bg-white/10"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting - Custom Dropdown */}
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
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                ></path>
              </svg>
              Сортировать по:
            </span>
            <div ref={dropdownRef} className="relative">
              {/* Custom selected option */}
              <div
                ref={sortOptionRef}
                className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 cursor-pointer flex justify-between items-center w-70 h-10"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsDropdownOpen(!isDropdownOpen);
                  }
                }}
                onFocus={() => {}}
                onBlur={() => {}}
              >
                <div className="w-full overflow-visible">
                  <span className="block text-white">
                    {sortBy === "new"
                      ? "Дате публикации (новые)"
                      : "Дате публикации (старые)"}
                  </span>
                </div>
                <svg
                  ref={arrowRef}
                  className="w-5 h-5 text-white/60 ml-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>

              {/* Dropdown options */}
              <div
                ref={optionsRef}
                className="absolute left-0 right-0 top-full bg-zinc-800 rounded-lg overflow-hidden z-20 border border-white/10 shadow-lg w-70"
                style={{ display: "none" }}
              >
                <div
                  className={`px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors ${
                    sortBy === "new" ? "bg-white/5" : ""
                  } whitespace-nowrap h-10 flex items-center`}
                  onClick={() => handleSortChange("new")}
                >
                  <span className="block truncate text-white">
                    Дате публикации (новые)
                  </span>
                </div>
                <div
                  className={`px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors ${
                    sortBy === "old" ? "bg-white/5" : ""
                  } whitespace-nowrap h-10 flex items-center`}
                  onClick={() => handleSortChange("old")}
                >
                  <span className="block truncate text-white">
                    Дате публикации (старые)
                  </span>
                </div>
              </div>
            </div>
          </div>
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

"use client";

import { FC, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomContainer from "@/components/ui/CustomContainer";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedCategorySlug = searchParams.get("category") || "all";
  const selectedCategory =
    categories.find((cat) => cat.slug === selectedCategorySlug)?.name || "Все";
  const sortBy = (searchParams.get("sort") as "new" | "old") || "new";
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 6;

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

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.15 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

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

          {/* Sorting */}
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
            <select
              className="bg-transparent text-white/60 border-none outline-none cursor-pointer"
              value={sortBy}
              onChange={(e) => {
                const newSort = e.target.value as "new" | "old";
                updateUrl({ sort: newSort });
              }}
            >
              <option value="new">Дате публикации (новые)</option>
              <option value="old">Дате публикации (старые)</option>
            </select>
          </div>
        </div>
        {/* News Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="wait">
            {currentNews.map((news) => (
              <motion.article
                key={news.id}
                variants={item}
                initial="hidden"
                animate="show"
                exit="exit"
                className="group relative overflow-hidden"
                whileHover={{ y: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href={`/news/${news.slug}`}
                  prefetch={false}
                  className="block"
                >
                  <motion.div className="relative aspect-[4/3] overflow-hidden mb-6">
                    <Image
                      src="/news_bg.webp"
                      alt="News"
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-black/80 backdrop-blur-md text-white text-sm rounded">
                        {news.category}
                      </span>
                    </div>
                  </motion.div>
                  <div>
                    <div className="flex items-center space-x-4 text-white/60 text-sm">
                      <span>{news.date}</span>
                      <span>•</span>
                      <span>{news.readTime}</span>
                    </div>
                    <h2 className="text-2xl text-white font-light hover:text-white/80 transition-colors py-4">
                      {news.title}
                    </h2>
                    <p className="text-white/60">{news.description}</p>
                  </div>
                </Link>
                <Link
                  href={`/news/${news.slug}`}
                  prefetch={false}
                  className="inline-flex items-center group mt-4"
                >
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
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() =>
                updateUrl({ page: String(Math.max(currentPage - 1, 1)) })
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

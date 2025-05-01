"use client";

import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";

// Mock news data - replace with your actual data source
const newsItems = [
  {
    id: 1,
    category: "Производство",
    title:
      "Новая модель организационной деятельности оказалась чрезвычайно полезной",
    date: "29 Января 2024",
    readTime: "5 минут",
    description:
      "Являясь всего лишь частью общей картины, тщательные исследования конкурентов могут быть описаны максимально подробно.",
    image: "/news_bg.webp",
    slug: "novaya-model-organizatsionnoy-deyatelnosti",
  },
  {
    id: 2,
    category: "Технологии",
    title: "Внедрение современных методов управления производством",
    date: "25 Января 2024",
    readTime: "7 минут",
    description:
      "Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение форм развития.",
    image: "/news_bg2.webp",
    slug: "vnedrenie-sovremennyh-metodov-upravleniya",
  },
  {
    id: 3,
    category: "Инновации",
    title: "Запуск новой производственной линии в Казахстане",
    date: "20 Января 2024",
    readTime: "4 минуты",
    description:
      "Приятно, граждане, наблюдать, как элементы политического процесса призваны к ответу. В целом, конечно, выбранный нами инновационный путь однозначно определяет каждого участника.",
    image: "/news_bg.webp",
    slug: "zapusk-novoy-proizvodstvennoy-linii",
  },
  {
    id: 4,
    category: "Развитие",
    title: "Расширение дилерской сети в регионах России",
    date: "15 Января 2024",
    readTime: "6 минут",
    description:
      "Повседневная практика показывает, что сложившаяся структура организации требует от нас анализа поставленных обществом задач.",
    image: "/news_bg2.webp",
    slug: "rasshirenie-dilerskoy-seti",
  },
];

const FirstScreen: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : newsItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < newsItems.length - 1 ? prev + 1 : 0));
  };

  const currentNews = newsItems[currentIndex];

  return (
    <header className="relative h-screen overflow-hidden">
      {/* Background Images with Stacked Animation */}
      <div className="absolute inset-0 w-full h-full">
        {newsItems.map((item, index) => (
          <AnimatePresence key={item.id}>
            {(index === currentIndex ||
              index ===
                (currentIndex - 1 + newsItems.length) % newsItems.length) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: index === currentIndex ? 1 : 0 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover cursor-pointer"
                  priority={index === currentIndex}
                  onClick={() => (window.location.href = `/news/${item.slug}`)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Base Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-20"></div>

      {/* Mobile Navigation - Absolute Positioned */}
      <div className="md:hidden flex items-center justify-between absolute bottom-6 left-0 right-0 px-8 z-[31]">
        {/* Page Counter */}
        <div className="text-white text-lg news-counter-mobile">
          <span className="text-2xl current-page">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/60">
            /{String(newsItems.length).padStart(2, "0")}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors prev-btn"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors next-btn"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Main Content Container */}
      <CustomContainer className="h-screen flex flex-col justify-end relative z-30">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Новости", href: "#", current: true },
          ]}
          disableContainer={true}
        />
        {/* Desktop Navigation - Absolute Positioned */}
        <div className="hidden md:flex items-center absolute bottom-20 right-4 md:right-10 xl:right-24 z-[50]">
          {/* Page Counter */}
          <div className="text-white text-xl news-counter">
            <span className="text-4xl current-page">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/60">
              /{String(newsItems.length).padStart(2, "0")}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex ml-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors prev-btn mr-4"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors next-btn"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </motion.button>
          </div>
        </div>
        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-end align-start z-30 mb-24 md:mb-6 lg:mb-18">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="md:mb-14 news-content"
            >
              {/* Category */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mb-8 lg:mb-10 news-category"
              >
                <span className="px-4 py-2 border border-white text-white text-sm rounded font-light">
                  {currentNews.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07, duration: 0.3 }}
              >
                <a
                  href={`/news/${currentNews.slug}`}
                  className="block hover:opacity-90 transition-opacity"
                >
                  <GradientHeading>{currentNews.title}</GradientHeading>
                </a>
              </motion.div>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="flex items-center space-x-4 text-white/60 text-sm md:text-base lg:text-base news-meta"
              >
                <span>{currentNews.date}</span>
                <span>•</span>
                <span>{currentNews.readTime}</span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mt-4 news-description"
              >
                {currentNews.description}
              </motion.p>

              {/* Read More Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-6"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`/news/${currentNews.slug}`}
                  className="inline-flex items-center group news-button"
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
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </CustomContainer>
    </header>
  );
};

export default FirstScreen;

"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import MainButton from "@/components/ui/MainButton";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface JobItem {
  title: string;
  requirements: string[];
  experience: string[];
  salary: number;
  link: string;
  category: string;
}

const VacanciesList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Все вакансии");
  const itemsPerPage = 3;

  const jobs: JobItem[] = [
    {
      title: "Инженер-конструктор",
      requirements: [
        "Проектирование и расчет изделий, выпускаемых предприятием. Корпусные детали оборудования из листового металла.",
        "Разработка и оформление конструкторской документации изделий и выдача на производство.",
        "Выполнение графической и текстовой части, необходимых расчетов.",
      ],
      experience: ["от 3х лет стаж", "от 3х лет стаж"],
      salary: 50000,
      link: "#",
      category: "Производство",
    },
    {
      title: "Инженер расчетной группы",
      requirements: [
        "Обработка опросных листов и технических заданий заказчика;",
        "Поиск и согласование с заказчиком аналогов требуемого оборудования исходя из технических характеристик, стоимости и сроков изготовления и поставки;",
        "Анализ рынка, контроль за изменением стоимости комплектующих;",
        "Подготовка опросного листа для включения в план производства;",
        "Работа с обращениями заказчика. Консультация по технической части.",
      ],
      experience: ["от 3х лет стаж", "от 3х лет стаж"],
      salary: 50000,
      link: "#",
      category: "Производство",
    },
    {
      title: "Инженер-проектировщик",
      requirements: [
        "Проектирование и разработка электрических схем: распределительных устройств 0,4, 6, 10, 35КВ, шкафов автоматизации, распределительных шкафов (НКУ, ВРУ);",
        "Разработка и оформление проекторной конструкторской документации изделий и выдача чертежей и схем на производство;",
        "Конструкторское сопровождение сборки электрической части изделий, авторский надзор;",
        "Оптимизация проектной документации и конструкторской документации",
      ],
      experience: ["от 3х лет стаж", "от 3х лет стаж"],
      salary: 50000,
      link: "#",
      category: "Производство",
    },
    {
      title: "Менеджер по продажам",
      requirements: [
        "Поиск и привлечение новых клиентов;",
        "Ведение переговоров и заключение договоров;",
        "Сопровождение сделок и работа с документацией;",
        "Анализ рынка и конкурентов;",
        "Выполнение плана продаж",
      ],
      experience: ["от 1 года стаж", "Высшее образование"],
      salary: 45000,
      link: "#",
      category: "Продажи и маркетинг",
    },
    {
      title: "Маркетолог",
      requirements: [
        "Разработка и реализация маркетинговых стратегий;",
        "Проведение маркетинговых исследований;",
        "Управление рекламными кампаниями;",
        "Анализ эффективности маркетинговых активностей;",
        "Работа с социальными сетями",
      ],
      experience: ["от 2х лет стаж", "Высшее образование"],
      salary: 55000,
      link: "#",
      category: "Продажи и маркетинг",
    },
    {
      title: "Секретарь-референт",
      requirements: [
        "Организация работы офиса;",
        "Ведение деловой переписки;",
        "Работа с документами;",
        "Организация встреч и совещаний;",
        "Взаимодействие с клиентами",
      ],
      experience: ["от 1 года стаж", "Высшее образование"],
      salary: 35000,
      link: "#",
      category: "Офис компании",
    },
    {
      title: "Бухгалтер",
      requirements: [
        "Ведение бухгалтерского учета;",
        "Подготовка и сдача отчетности;",
        "Работа с первичной документацией;",
        "Расчет заработной платы;",
        "Взаимодействие с налоговыми органами",
      ],
      experience: ["от 3х лет стаж", "Высшее образование"],
      salary: 60000,
      link: "#",
      category: "Офис компании",
    },
    {
      title: "HR-специалист",
      requirements: [
        "Подбор персонала;",
        "Проведение собеседований;",
        "Адаптация новых сотрудников;",
        "Ведение кадрового делопроизводства;",
        "Организация обучения персонала",
      ],
      experience: ["от 2х лет стаж", "Высшее образование"],
      salary: 45000,
      link: "#",
      category: "Кадровый резерв",
    },
  ];

  const categories = [
    "Все вакансии",
    "Кадровый резерв",
    "Производство",
    "Продажи и маркетинг",
    "Офис компании",
  ];

  const filteredJobs = useMemo(() => {
    return selectedCategory === "Все вакансии"
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredJobs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  return (
    <section id="jobs_list_section" className="bg-transparent py-20">
      <CustomContainer>
        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 transition-colors font-light backdrop-blur-sm rounded ${
                selectedCategory === category
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-white/5 text-white/60 hover:bg-white/15"
              }`}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Job Listings */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${selectedCategory}`}
            className="space-y-16"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            {currentJobs.map((job, index) => (
              <motion.div
                key={`${job.title}-${index}`}
                className="border-t border-white/10 pt-16"
                variants={itemVariants}
              >
                <motion.h2
                  className="text-4xl text-white font-light mb-6 order-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {job.title}
                </motion.h2>
                <motion.ul
                  className="text-white/70 mb-8 max-w-3xl order-3 list-disc pl-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                >
                  {job.requirements.map((req, reqIndex) => (
                    <li key={reqIndex}>{req}</li>
                  ))}
                </motion.ul>
                <motion.div
                  className="flex flex-wrap items-center justify-between gap-6 order-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.25 }}
                >
                  <div className="flex flex-wrap gap-4 w-full md:w-auto mb-4 md:mb-0">
                    {job.experience.map((exp, expIndex) => (
                      <span
                        key={expIndex}
                        className="px-6 py-3 bg-transparent border border-white/50 text-white font-light"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <motion.div
                      className="text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.35 }}
                    >
                      <span className="text-white/60 text-sm">от</span>
                      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light ml-2">
                        {job.salary.toLocaleString()}
                      </span>
                      <span className="text-sm sm:text-base">₽/мес</span>
                    </motion.div>

                    <MainButton text="Подробнее" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-2 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
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
                onClick={() => handlePageChange(page)}
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
                handlePageChange(Math.min(currentPage + 1, totalPages))
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
          </motion.div>
        )}
      </CustomContainer>
    </section>
  );
};

export default VacanciesList;

"use client";

import gsap from "gsap";
import { useState, useMemo, useEffect, useRef, FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import MainButton from "@/components/ui/MainButton";
import { IJobItem } from "@/app/vacancies/screens/VacanciesScreen/types";

const VacanciesScreen: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Все вакансии");
  const itemsPerPage = 3;
  const containerRef = useRef<HTMLDivElement>(null);
  const jobItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const jobs: IJobItem[] = [
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

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        // Animate job items
        gsap.from(".job-item", {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        });

        // Animate job titles
        gsap.from(".job-title", {
          opacity: 0,
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        });

        // Animate requirements list
        gsap.from(".requirements-list", {
          opacity: 0,
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        });

        // Animate job details
        gsap.from(".job-details", {
          opacity: 0,
          y: 10,
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [currentPage, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="jobs_list_section" className="bg-transparent py-20">
      <div ref={containerRef}>
        <CustomContainer>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`filter-button px-6 py-3 transition-all duration-200 font-light backdrop-blur-sm rounded ${
                  selectedCategory === category
                    ? "bg-white/20 text-white hover:bg-white/30 scale-105 shadow-lg shadow-white/10"
                    : "bg-white/5 text-white/60 hover:bg-white/15"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-16">
            {currentJobs.map((job, index) => (
              <div
                key={`${job.title}-${index}`}
                className="job-item border-t border-white/10 pt-16"
                ref={(el) => {
                  jobItemsRef.current[index] = el;
                }}
              >
                <h2 className="job-title text-4xl text-white font-light mb-6 order-1">
                  {job.title}
                </h2>
                <ul className="requirements-list text-white/70 mb-8 max-w-3xl order-3 list-disc pl-5">
                  {job.requirements.map((req, reqIndex) => (
                    <li key={reqIndex}>{req}</li>
                  ))}
                </ul>
                <div className="job-details flex flex-wrap items-center justify-between gap-6 order-2">
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
                    <div className="text-white">
                      <span className="text-white/60 text-sm">от</span>
                      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light ml-2">
                        {job.salary.toLocaleString()}
                      </span>
                      <span className="text-sm sm:text-base">₽/мес</span>
                    </div>

                    <MainButton text="Подробнее" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
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
            </div>
          )}
        </CustomContainer>
      </div>
    </section>
  );
};

export default VacanciesScreen;

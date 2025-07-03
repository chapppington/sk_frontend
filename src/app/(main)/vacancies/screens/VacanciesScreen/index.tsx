"use client";

import { useRef, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import CustomContainer from "@/components/ui/CustomContainer";
import JobList from "./components/JobList";
import vacancyService from "@/services/vacancy.service";
import type { IVacancy } from "@/shared/types/vacancy.types";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";

const VacanciesScreen: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: vacancies = [], isLoading } = useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const { data } = await vacancyService.fetchAll();
      return data;
    },
  });

  // Transform backend data to match frontend format
  const transformedJobs = vacancies.map((vacancy: IVacancy) => ({
    title: vacancy.title,
    requirements: vacancy.requirements,
    experience: vacancy.experience,
    salary: vacancy.salary,
  }));

  if (isLoading) {
    return (
      <section id="jobs_list_section" className="py-20 relative">
        <div
          className="absolute inset-x-0 top-0 h-[512px] bg-gradient-to-b from-black to-transparent"
          style={{ zIndex: -1 }}
        />
        <CustomContainer>
          <div className="text-center text-white">Загрузка вакансий...</div>
        </CustomContainer>
      </section>
    );
  }

  return (
    <section id="jobs_list_section" className="py-20 relative">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[512px] bg-gradient-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      />
      <div ref={containerRef}>
        <CustomContainer>
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
            <div className="mb-8 md:mb-0">
              <BracketsText>ВАКАНСИИ</BracketsText>
            </div>

            <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
              <GradientHeading>Список вакансий</GradientHeading>
              <p className="text-white/70 mt-6">
                В нашей компании регулярно открываются вакансии, как для опытных
                специалистов, так и для тех, кто только начинает свою карьеру.Вы
                можете ознакомиться с нашими вакансиями на сайте или
                откликнуться на одну из них через сайт hh.ru.
              </p>
            </div>
          </div>
          <JobList jobs={transformedJobs} />
        </CustomContainer>
      </div>
    </section>
  );
};

export default VacanciesScreen;

"use client";

import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import BracketsText from "@/components/ui/BracketsText";
import Dropdown from "@/components/ui/Dropdown";

import { taskItems } from "./mock_data";

export default function TasksScreen() {
  return (
    <section className="bg-transparent py-24 relative">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <BracketsText className="text-white/60 mb-8">ЗАДАЧИ</BracketsText>
          </div>

          {/* Main Content */}
          <div className="container mx-auto relative">
            <div className="flex flex-col mx-auto">
              <div className="pl-0">
                {/* Heading and Description */}
                <GradientHeading>
                  Реконструкция трансформаторных подстанций
                </GradientHeading>
                <p className="text-white/60 text-base my-12 ">
                  Две ранее установленные трансформаторные подстанции мощностью
                  2×1000 кВА не обеспечивали необходимый объём мощности для
                  существующих и перспективных производственных нагрузок.
                  Требовалось увеличить суммарную мощность энергоснабжения,
                  обеспечить отказоустойчивость и гибкость в управлении
                  нагрузками. При этом необходимо было интегрировать решение в
                  действующую инфраструктуру предприятия, минимизируя простои и
                  риски для производственного процесса.
                </p>

                {/* Tasks List */}
                {[
                  {
                    title: "Увеличение мощности",
                    description:
                      "Необходимо было увеличить суммарную мощность энергоснабжения для обеспечения растущих производственных потребностей.",
                  },
                  {
                    title: "Повышение надёжности",
                    description:
                      "Требовалось обеспечить отказоустойчивость системы электроснабжения и гибкость в управлении нагрузками.",
                  },
                  {
                    title: "Интеграция в существующую инфраструктуру",
                    description:
                      "Необходимо было интегрировать новое решение в действующую инфраструктуру предприятия, минимизируя простои и риски для производственного процесса.",
                  },
                ].map((item, idx) => (
                  <Dropdown key={idx} title={item.title} defaultOpen={false}>
                    <p className="text-white/60 text-base select-none">
                      {item.description}
                    </p>
                  </Dropdown>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
}

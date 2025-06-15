"use client";

import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/AnimatedText";
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
              <div className="pl-0 md:pl-8">
                {/* Heading and Description */}
                <AnimatedText>
                  <GradientHeading>Заголовок о задаче проекта</GradientHeading>
                </AnimatedText>
                <AnimatedText>
                  <p className="text-white/60 text-base my-12 ">
                    Круглогодичный курортный комплекс «Манжерок» расположен у
                    знаменитого озера Манжерокское у подножия горы Малая Синюха
                    – это центр семейного отдыха Республики Алтай, привлекающий
                    туристов со всей России, Азиатского региона и Европы.
                  </p>
                </AnimatedText>

                {/* Tasks List */}
                {taskItems.map((item, idx) => (
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

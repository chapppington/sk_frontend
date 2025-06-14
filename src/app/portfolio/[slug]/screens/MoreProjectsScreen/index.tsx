"use client";

import { FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/AnimatedText";
import CustomSlider from "@/components/CustomSlider";
import ProjectSlide from "./components/ProjectSlide";

import { projects } from "./mock_data";

const MoreProjectsScreen: FC = () => {
  return (
    <section className="bg-transparent py-24 relative">
      <CustomContainer className="h-full flex flex-col relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          {/* Main Title (left) */}
          <div className="mb-4 lg:mb-0 lg:max-w-[60%]">
            <AnimatedText delay={0}>
              <GradientHeading>Другие проекты</GradientHeading>
            </AnimatedText>
          </div>

          {/* Category Label (right) */}
          <div className="self-end lg:self-start">
            <BracketsText>ОПЫТ</BracketsText>
          </div>
        </div>

        {/* Slider Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Projects Slider */}
          <div className="overflow-hidden">
            <CustomSlider
              slidesPerView={2}
              spaceBetween={20}
              loop={true}
              showIndicators={true}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
            >
              {projects.map((project) => (
                <ProjectSlide
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  image={project.image}
                  year={project.year}
                />
              ))}
            </CustomSlider>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default MoreProjectsScreen;

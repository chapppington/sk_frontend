"use client";

import Image from "next/image";
import { FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import MainButton from "@/components/ui/MainButton";
import AnimatedText from "@/components/ui/AnimatedText";
import CustomSlider from "@/components/CustomSlider";

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
                <div
                  key={project.id}
                  className="relative h-[420px] w-full overflow-hidden rounded-lg"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className="brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                    <div className="flex items-center">
                      <button className="py-2 px-4 bg-white text-dark text-sm rounded-md">
                        Что реализовали
                      </button>
                      <button className="py-2 px-4 ml-2 bg-white text-dark text-sm rounded-md">
                        {project.year}
                      </button>
                    </div>

                    <div className="w-full">
                      <h3 className="text-3xl text-white max-w-[66.67%]">
                        {project.title}
                      </h3>
                      <MainButton
                        text="Узнать подробнее"
                        href={`/portfolio/${project.id}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CustomSlider>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default MoreProjectsScreen;

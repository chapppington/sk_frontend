import React from "react";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";

const imageUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"; // Placeholder image

export default function SolutionScreen() {
  return (
    <section className="py-24 relative min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-16 2xl:px-24">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <div className="text-white/60">[РЕШЕНИЕ]</div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col mx-auto">
              <div className="pl-0 md:pl-8">
                {/* Heading and Description */}
                <GradientHeading>
                  Заголовок о решениях в проекте
                </GradientHeading>
                <p className="text-white/60 text-base my-12 ">
                  Круглогодичный курортный комплекс «Манжерок» расположен у
                  знаменитого озера Манжерокское у подножия горы Малая Синюха –
                  это центр семейного отдыха Республики Алтай, привлекающий
                  туристов со всей России, Азиатского региона и Европы.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Three-column section: full width of container */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-0 items-stretch mt-12">
          {/* Left image */}
          <div className="flex-1 min-w-0">
            <img
              src={imageUrl}
              alt="solution left"
              className="w-full h-[400px] object-cover"
            />
          </div>
          {/* Center card */}
          <div className="flex-1 min-w-0 flex flex-col justify-center p-8">
            <h2 className="text-white text-3xl font-light mb-6">Решение</h2>
            <div className="text-white/80 text-lg leading-relaxed">
              Круглогодичный курортный комплекс «Манжерок» расположен у
              знаменитого озера Манжерокское у подножия горы Малая Синюха – это
              центр семейного отдыха Республики Алтай, привлекающий туристов со
              всей России, Азиатского региона и Европы.
            </div>
          </div>
          {/* Right image */}
          <div className="flex-1 min-w-0">
            <img
              src={imageUrl}
              alt="solution right"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
        {/* End three-column section */}
      </div>
    </section>
  );
}

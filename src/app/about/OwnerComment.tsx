import React from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import Image from "next/image";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealAnimation from "@/components/ui/RevealAnimation";

export default function OwnerComment() {
  return (
    <CustomContainer className="py-24">
      <div className="grid grid-cols-1 md:[grid-template-columns:1fr_auto_2fr] gap-2 w-full mx-auto items-stretch">
        {/* Left Column: Squared Photo with Skewed Corner */}
        <RevealAnimation duration={0.8}>
          <div
            className="border border-white/10 rounded-md overflow-hidden flex items-center justify-center bg-black/20 relative w-full aspect-square"
            style={{
              clipPath: "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
            }}
          >
            <Image src="/man.png" alt="Owner" fill className="object-cover" />
          </div>
        </RevealAnimation>
        {/* Middle Column: Name and Job Title */}
        <div className="border border-white/10 rounded-md flex flex-col justify-end px-8 pb-8 pt-0 min-w-[180px] max-w-[220px] bg-black/20">
          <AnimatedText delay={0}>
            <div className="text-white text-3xl font-medium mb-2 mt-auto">
              Иван Федоров
            </div>
          </AnimatedText>
          <AnimatedText delay={0}>
            <div className="text-gray-400 text-xl">Генеральный директор</div>
          </AnimatedText>
        </div>
        {/* Right Column: Quote */}
        <blockquote className="border border-white/10 rounded-md flex items-center p-8 bg-black/20">
          <AnimatedText delay={0}>
            <p className="text-white text-2xl md:text-3xl xl:text-4xl ">
              "В своём стремлении улучшить пользовательский опыт мы упускаем,
              что предприниматели
              <span className="text-gray-500/60">
                {" "}
                в сети интернет лишь добавляют{" "}
              </span>
              фракционных разногласий и представлены в исключительно
              положительном свете."
            </p>
          </AnimatedText>
        </blockquote>
      </div>
    </CustomContainer>
  );
}

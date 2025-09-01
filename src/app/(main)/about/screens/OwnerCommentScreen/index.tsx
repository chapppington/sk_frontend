import React, { FC } from "react";
import Image from "next/image";

import CustomContainer from "@/components/ui/CustomContainer";
import MainButton from "@/components/ui/MainButton";

export const OwnerCommentScreen: FC = () => {
  return (
    <CustomContainer className="py-24">
      <div className="grid grid-cols-1 md:[grid-template-columns:1fr_auto_2fr] gap-2 w-full mx-auto items-stretch">
        {/* Left Column: Squared Photo with Skewed Corner */}
        <div
          className="border border-white/10 rounded-md overflow-hidden flex items-center justify-center bg-black/20 relative w-full aspect-square"
          style={{
            clipPath: "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
          }}
        >
          <Image
            src="/Полозов_Сергей_Николаевич_Генеральный_директор.png"
            alt="Owner"
            fill
            className="object-cover"
          />
        </div>
        {/* Middle Column: Name and Job Title */}
        <div className="border border-white/10 rounded-md flex flex-col justify-end px-5 pb-5 pt-5 md:pt-0 w-full md:min-w-[180px] md:max-w-[220px] bg-black/20">
          <div className="text-white text-2xl font-medium mb-2 mt-auto">
            Полозов Сергей Николаевич
          </div>
          <div className="text-gray-400 text-lg">Генеральный директор</div>
        </div>
        {/* Right Column: Quote and Button */}
        <div className="flex flex-col">
          <blockquote className="border border-white/10 rounded-md flex items-center p-8 bg-black/20 flex-1">
            <p className="text-white text-2xl md:text-3xl xl:text-4xl">
              "Наша миссия - показывать новые горизонты, превосходящие ожидания
              клиентов. Мы являемся надежным партнером, обеспечивающим
              безопасность, инновации и устойчивое развитие в отрасли."
            </p>
          </blockquote>
          <MainButton
            text="Cмотреть политику качества"
            href="/quality"
            transparent
            fullWidth
          />
        </div>
      </div>
    </CustomContainer>
  );
};

export default OwnerCommentScreen;

import React, { FC } from "react";
import Image from "next/image";

import CustomContainer from "@/components/ui/CustomContainer";
import MainButton from "@/components/ui/MainButton";

export const OwnerCommentScreen: FC = () => {
  return (
    <CustomContainer className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mx-auto items-stretch">
        {/* Left Column: Two Photos with Names */}
        <div className="flex gap-4 w-full">
          {/* First Person */}
          <div className="flex flex-col gap-2 w-1/2">
            <div
              className="border border-white/10 rounded-md overflow-hidden flex items-center justify-center bg-black/20 relative w-full aspect-square"
              style={{
                clipPath:
                  "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
              }}
            >
              <Image
                src="/Полозов_Сергей_Николаевич_Генеральный_директор.png"
                alt="Полозов Сергей Николаевич"
                fill
                className="object-cover"
              />
            </div>
            <div className="border border-white/10 rounded-md px-4 py-3 bg-black/20">
              <div className="text-white text-lg font-medium mb-1">
                Полозов Сергей <br></br>Николаевич
              </div>
              <div className="text-gray-400 text-sm">Генеральный директор</div>
            </div>
          </div>

          {/* Second Person */}
          <div className="flex flex-col gap-2 w-1/2">
            <div
              className="border border-white/10 rounded-md overflow-hidden flex items-center justify-center bg-black/20 relative w-full aspect-square"
              style={{
                clipPath:
                  "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
              }}
            >
              <Image
                src="/Малиновский_Михаил_Валентинович_Технический_директор.png"
                alt="Малиновский Михаил Валентинович"
                fill
                className="object-cover"
              />
            </div>
            <div className="border border-white/10 rounded-md px-4 py-3 bg-black/20">
              <div className="text-white text-lg font-medium mb-1">
                Малиновский Михаил Валентинович
              </div>
              <div className="text-gray-400 text-sm">Технический директор</div>
            </div>
          </div>
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

"use client";
import { FC } from "react";
import Image from "next/image";
import { ILogoGridProps } from "./types";

const LogoGrid: FC<ILogoGridProps> = ({ partners }) => {
  return (
    <div className="mt-16">
      {/* Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-16 items-center">
        {partners.slice(0, 6).map((logo, index) => (
          <div
            key={index}
            className="grayscale opacity-50 hover:opacity-100 transition-all"
          >
            <Image
              src={`/img/partners/${logo}`}
              alt="Partner logo"
              width={200}
              height={50}
              className="w-full h-[50px] object-contain"
            />
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-16 items-center mt-16">
        {partners.slice(6).map((logo, index) => (
          <div
            key={index}
            className="grayscale opacity-50 hover:opacity-100 transition-all"
          >
            <Image
              src={`/img/partners/${logo}`}
              alt="Partner logo"
              width={200}
              height={50}
              className="w-full h-[50px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoGrid;

"use client";
import { useRef, FC } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ILogoGridProps } from "./types";

const LogoGrid: FC<ILogoGridProps> = ({ partners }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    gsap.fromTo(
      grid,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className="mt-16" ref={gridRef}>
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

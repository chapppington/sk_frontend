"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading";
import Image from "next/image";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/textAnimation/AnimatedText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface LogoGridProps {
  partners?: string[];
}

const samplePartners = [
  "logo1.svg",
  "logo2.svg",
  "logo3.svg",
  "logo4.svg",
  "logo5.svg",
  "logo6.svg",
  "logo7.svg",
  "logo8.svg",
  "logo9.svg",
  "logo10.svg",
  "logo11.svg",
  "logo12.svg",
];

export default function LogoGrid({ partners = samplePartners }: LogoGridProps) {
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
    <CustomContainer className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <AnimatedText delay={0}>
          <GradientHeading className="text-center md:text-right">
            Нас уже выбрали
          </GradientHeading>
        </AnimatedText>
        <BracketsText className="md:mb-0 mb-2">ПАРТНЕРЫ</BracketsText>
      </div>
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
    </CustomContainer>
  );
}

"use client";

import gsap from "gsap";
import { useState, useRef, useEffect } from "react";

import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/AnimatedText";

import { taskItems } from "./mock_data";

export default function TasksScreen() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevOpenItems = useRef<number[]>([]);

  useEffect(() => {
    taskItems.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;
      const isOpen = openItems.includes(idx);
      if (!isOpen) {
        gsap.set(el, {
          height: 0,
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        });
      } else {
        gsap.set(el, {
          height: "auto",
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    taskItems.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;
      const wasOpen = prevOpenItems.current.includes(idx);
      const isOpen = openItems.includes(idx);

      if (wasOpen === isOpen) return;

      if (isOpen) {
        gsap.killTweensOf(el);
        gsap.set(el, {
          height: 0,
          opacity: 0,
          visibility: "visible",
          pointerEvents: "auto",
        });
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(el, { height: "auto" });
          },
        });
      } else {
        gsap.killTweensOf(el);
        gsap.set(el, {
          height: el.scrollHeight,
          opacity: 1,
        });
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(el, { visibility: "hidden", pointerEvents: "none" });
          },
        });
      }
    });
    prevOpenItems.current = openItems;
  }, [openItems]);

  const toggleItem = (idx: number) => {
    setOpenItems((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="bg-transparent py-24 relative ">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <BracketsText className="text-white/60 mb-8">РЕШЕНИЕ</BracketsText>
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
                  <div
                    key={idx}
                    className={`border-t ${
                      idx === taskItems.length - 1 ? "border-b" : ""
                    } border-white/10 py-8`}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleItem(idx)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon */}
                        <span className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                          >
                            <rect
                              x="4"
                              y="4"
                              width="16"
                              height="16"
                              rx="3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M8 8L16 16M16 8L8 16"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </span>
                        <h3 className="text-white text-2xl font-light select-none">
                          {item.title}
                        </h3>
                      </div>
                      <button
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 ease-in-out cursor-pointer hover:bg-white/10"
                        aria-label="Toggle"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{
                            transform: openItems.includes(idx)
                              ? "rotate(45deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.2s",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 6v12M6 12h12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      ref={(el) => {
                        contentRefs.current[idx] = el;
                      }}
                      className="overflow-hidden w-full min-w-0"
                    >
                      <div className="pt-6">
                        <p className="text-white/60 text-base select-none">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
}

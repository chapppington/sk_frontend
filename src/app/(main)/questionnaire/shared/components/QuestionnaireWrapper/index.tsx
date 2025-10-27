"use client";

import { useState, useEffect, useRef } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import Questionnaire from "../Questionnaire";
import QuestionnaireLeftMenu from "../QuestionnaireLeftMenu";
import { initializeFormState } from "../../utils/initializeFormState";
import { IFormState } from "@/app/(main)/questionnaire/shared/types";
import { FeederData } from "../QuestionDropdown/components/FeederSectionOption/types";
import { useLenis } from "lenis/react";
import { QuestionnaireWrapperProps } from "./types";

export default function QuestionnaireWrapper({
  questions,
  stages,
  questionnaireType,
  title = "Опросный лист",
  subtitle,
  breadcrumbLabel = "Опросный лист",
}: QuestionnaireWrapperProps) {
  const [activeStage, setActiveStage] = useState(1);
  const [formState, setFormState] = useState<IFormState>(() =>
    initializeFormState(questions)
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInitialLoad = useRef(true);
  const lenis = useLenis();
  const isScrolling = useRef(false);

  const handleStateChange = (
    key: number,
    value: string | number | string[] | Record<string, FeederData[]>
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSuccess = () => {
    setIsSuccess(true);
    // Сбросить состояние через 5 секунд
    setTimeout(() => {
      setIsSuccess(false);
      // Также сбросить форму
      setFormState(initializeFormState(questions));
      setActiveStage(1);
    }, 5000);
  };

  const scrollToStage = (stageIndex: number) => {
    const targetRef = stageRefs.current[stageIndex - 1];
    if (targetRef && lenis) {
      isScrolling.current = true;
      setActiveStage(stageIndex);
      lenis.scrollTo(targetRef, {
        offset: -100,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isScrolling.current = false;
        },
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isInitialLoad.current || isScrolling.current) return;

      const viewportHeight = window.innerHeight;
      const scrollThreshold = viewportHeight * 0.3; // Increased threshold for better detection

      let newActiveStage = activeStage;

      stageRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;

        // Check if the element is in the viewport threshold area
        if (elementTop <= scrollThreshold && elementBottom >= 0) {
          newActiveStage = index + 1;
        }
      });

      if (newActiveStage !== activeStage) {
        setActiveStage(newActiveStage);
      }
    };

    // Add throttling to prevent too frequent updates
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);

    const timer = setTimeout(() => {
      isInitialLoad.current = false;
    }, 100);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(timer);
    };
  }, [activeStage]);

  return (
    <main className="text-white pb-24">
      <CustomContainer>
        {isSuccess ? (
          // Сообщение об успехе
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center py-8 max-w-md">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  Опросный лист отправлен!
                </h3>
                <p className="text-white/70">
                  Спасибо за заполнение опросного листа. Наши специалисты
                  свяжутся с вами в ближайшее время.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <QuestionnaireLeftMenu
              activeStage={activeStage}
              setActiveStage={(stage) => {
                setActiveStage(stage);
                scrollToStage(stage);
              }}
              stages={stages}
              title={title}
              subtitle={subtitle}
              breadcrumbLabel={breadcrumbLabel}
            />

            {/* Right side */}
            <div className="w-full lg:w-1/2 pt-32 pr-4">
              <Questionnaire
                formState={formState}
                handleStateChange={handleStateChange}
                stageRefs={stageRefs}
                onSuccess={handleSuccess}
                questions={questions}
                questionnaireType={questionnaireType}
              />
            </div>
          </div>
        )}
      </CustomContainer>
    </main>
  );
}


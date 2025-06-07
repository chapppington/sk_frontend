"use client";

import { useState, useEffect, useRef } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import Questionnaire from "./components/Questionnaire";
import QuestionnaireLeftMenu from "./components/QuestionnaireLeftMenu";
import { initializeFormState } from "./utils/initializeFormState";
import { IFormState } from "./types";
import { useLenis } from "lenis/react";

export default function QuestionnairePage() {
  const [activeStage, setActiveStage] = useState(1);
  const [formState, setFormState] = useState<IFormState>(initializeFormState);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInitialLoad = useRef(true);
  const lenis = useLenis();
  const isScrolling = useRef(false);

  const handleStateChange = (
    key: number,
    value: string | number | string[]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const scrollToStage = (stageIndex: number) => {
    const targetRef = stageRefs.current[stageIndex - 1];
    if (targetRef && lenis) {
      isScrolling.current = true;
      lenis.scrollTo(targetRef, {
        offset: -72,
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

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollThreshold = viewportHeight * 0.2;

      stageRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const elementTop = rect.top + scrollPosition;

        if (
          elementTop - scrollPosition <= scrollThreshold &&
          elementTop - scrollPosition >= 0
        ) {
          setActiveStage(index + 1);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      isInitialLoad.current = false;
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="text-white pb-24 scroll-smooth">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row gap-10">
          <QuestionnaireLeftMenu
            activeStage={activeStage}
            setActiveStage={(stage) => {
              setActiveStage(stage);
              scrollToStage(stage);
            }}
          />

          {/* Right side */}
          <div className="w-full lg:w-1/2 pt-32 pr-4">
            <Questionnaire
              formState={formState}
              handleStateChange={handleStateChange}
              stageRefs={stageRefs}
            />
          </div>
        </div>
      </CustomContainer>
    </main>
  );
}

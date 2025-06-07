"use client";

import { useState, useEffect, useRef } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import Questionnaire from "./components/Questionnaire";
import QuestionnaireLeftMenu from "./components/QuestionnaireLeftMenu";
import { initializeFormState, IFormState } from "./utils/initializeFormState";

export default function QuestionnairePage() {
  const [activeStage, setActiveStage] = useState(1);
  const [formState, setFormState] = useState<IFormState>(initializeFormState);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInitialLoad = useRef(true);

  const handleStateChange = (
    key: number,
    value: string | number | string[]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInitialLoad.current) {
            const stageIndex = stageRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (stageIndex !== -1) {
              setActiveStage(stageIndex + 1);
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-30% 0px 0px 0px",
      }
    );

    stageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Set initial load to false after a short delay
    const timer = setTimeout(() => {
      isInitialLoad.current = false;
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const scrollToStage = (stageIndex: number) => {
    const targetRef = stageRefs.current[stageIndex - 1];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: "smooth" });
    }
  };

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

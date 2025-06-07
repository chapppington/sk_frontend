"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import QuestionnaireStage from "@/app/questionnaire/QuestionnaireStage";
import { IQuestionnaireState } from "./types";
import QuestionnaireQuestions from "./components/QuestionnaireQuestions";
import { stages } from "./config/stages";

export default function QuestionnairePage() {
  const [activeStage, setActiveStage] = useState(1);
  const [formState, setFormState] = useState<IQuestionnaireState>({
    selectedKtpType: "",
    selectedImplementation: "",
    selectedTransformerCount: "",
    selectedTransformerType: "",
    selectedTransformerPower: "",
    selectedWindingGroup: "",
    selectedVoltageClass: "",
    selectedSwitchgear: "",
    selectedCellPurpose: "",
    selectedSection10: "",
    selectedSection11: "",
    selectedSection12: "",
    selectedSection13: "",
    selectedSection14: "",
    selectedSection15: "",
    selectedSection16: "",
    selectedSection17: "",
    selectedSection18: "",
    selectedSection19: "",
    selectedSection20: "",
    selectedSection21: "",
    selectedSection22: "",
    selectedSection23: "",
    selectedSection24: "",
    selectedSection25: [],
    name: "",
    phone: "",
    email: "",
    comments: "",
  });

  const handleStateChange = (key: keyof IQuestionnaireState, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const breadcrumbItems = [
    { label: "Главная", href: "/", current: false },
    { label: "Опросный лист", href: "/questionnaire", current: true },
  ];

  const changeStage = (sectionNumber: number) => {
    setActiveStage(sectionNumber);
  };

  return (
    <main className="text-white pb-24">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left side: Breadcrumbs, Heading, Description, and Stages */}
          <div className="w-full lg:w-1/2">
            <Breadcrumbs items={breadcrumbItems} disableContainer />

            <GradientHeading className="mt-8 mb-6">
              Опросный лист
            </GradientHeading>

            <p className="text-white/60 mb-12">
              на изготовление комплектной трансформаторной подстанции (КТП),
              производства ООО «СибКомплект»
            </p>

            {/* Stages section - Desktop */}
            <div className="relative">
              {stages.map((stage, stageIndex) => (
                <QuestionnaireStage
                  key={stageIndex}
                  stage={stage}
                  activeStage={activeStage}
                  stageIndex={stageIndex}
                  changeStage={changeStage}
                  totalStages={stages.length}
                />
              ))}
            </div>
          </div>

          {/* Right side: Questions */}
          <div className="w-full lg:w-1/2 pt-32 h-[calc(100vh-12rem)] overflow-y-auto pr-4">
            <QuestionnaireQuestions
              formState={formState}
              handleStateChange={handleStateChange}
            />
          </div>
        </div>
      </CustomContainer>
    </main>
  );
}

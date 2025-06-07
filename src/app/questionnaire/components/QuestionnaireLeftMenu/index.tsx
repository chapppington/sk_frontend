import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import QuestionnaireStage from "@/app/questionnaire/components/QuestionnaireStage";

import { QuestionnaireLeftMenuProps } from "./types";
import { stages } from "../../config/stages";

export default function QuestionnaireLeftMenu({
  activeStage,
  setActiveStage,
}: QuestionnaireLeftMenuProps) {
  return (
    <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/", current: false },
          {
            label: "Опросный лист",
            href: "/questionnaire",
            current: true,
          },
        ]}
        disableContainer
      />

      <GradientHeading className="mt-8 mb-6">Опросный лист</GradientHeading>

      <p className="text-white/60 mb-12">
        на изготовление комплектной трансформаторной подстанции (КТП),
        производства ООО «СибКомплект»
      </p>

      {/* Stages */}
      <div className="relative">
        {stages.map((stage, index) => (
          <QuestionnaireStage
            key={index}
            stage={stage}
            activeStage={activeStage}
            stageIndex={index}
            changeStage={setActiveStage}
            totalStages={stages.length}
          />
        ))}
      </div>
    </div>
  );
}

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import QuestionnaireStage from "@/app/(main)/questionnaire/shared/components/QuestionnaireStage";

import { QuestionnaireLeftMenuProps } from "./types";

export default function QuestionnaireLeftMenu({
  activeStage,
  setActiveStage,
  stages,
  title = "Опросный лист",
  subtitle,
  breadcrumbLabel = "Опросный лист",
}: QuestionnaireLeftMenuProps) {
  return (
    <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen ">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/", current: false },
          { label: "Опросные листы", href: "/questionnaire", current: false },
          {
            label: breadcrumbLabel,
            href: "#",
            current: true,
          },
        ]}
        disableContainer
      />

      <GradientHeading className="mt-8 mb-6">{title}</GradientHeading>

      {subtitle && (
        <p className="text-white/60 mb-12">
          {subtitle}
        </p>
      )}

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

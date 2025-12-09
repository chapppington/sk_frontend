"use client";

import QuestionnaireWrapper from "@/app/(main)/questionnaire/shared/components/QuestionnaireWrapper";
import { questionsConfig } from "./config/questions";
import { stages } from "./config/stages";

export default function QuestionnairePage() {
  return (
    <QuestionnaireWrapper
      questions={questionsConfig}
      stages={stages}
      questionnaireType="kso"
      title="Опросный лист"
      subtitle="на изготовление камеры сборной одностороннего обслуживания (КСО), производства ООО «СибКомплект»"
      breadcrumbLabel="Опросный лист КСО"
    />
  );
}








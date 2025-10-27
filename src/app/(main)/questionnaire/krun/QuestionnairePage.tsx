"use client";

import QuestionnaireWrapper from "@/app/(main)/questionnaire/shared/components/QuestionnaireWrapper";
import { questionsConfig } from "./config/questions";
import { stages } from "./config/stages";

export default function QuestionnairePage() {
  return (
    <QuestionnaireWrapper
      questions={questionsConfig}
      stages={stages}
      title="Опросный лист"
      subtitle="на изготовление комплектного распределительного устройства наружной установки (КРУН/ЯКНО), производства ООО «СибКомплект»"
      breadcrumbLabel="Опросный лист КРУН/ЯКНО"
    />
  );
}


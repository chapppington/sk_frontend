"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import QuestionnaireCard from "./components/QuestionnaireCard";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  href: string;
}

const questionnaires: Questionnaire[] = [
  {
    id: "ktp",
    title: "КТП",
    description:
      "Опросный лист на изготовление комплектной трансформаторной подстанции",
    href: "/questionnaire/ktp",
  },
  {
    id: "krun",
    title: "КРУН/ЯКНО",
    description:
      "Опросный лист на изготовление комплектного распределительного устройства наружной установки",
    href: "/questionnaire/krun",
  },
  {
    id: "kso",
    title: "КСО",
    description:
      "Опросный лист на изготовление камеры сборной одностороннего обслуживания",
    href: "/questionnaire/kso",
  },
];

export default function QuestionnaireListPage() {
  return (
    <main className="text-white pb-24">
      <CustomContainer>
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/", current: false },
            { label: "Опросные листы", href: "/questionnaire", current: true },
          ]}
          disableContainer
        />

        <div className="pt-8 pb-16">
          <GradientHeading className="mb-6">Опросные листы</GradientHeading>
          <p className="text-white/70 text-lg max-w-3xl">
            Заполните опросный лист для точного расчета стоимости и
            характеристик оборудования. Наши специалисты свяжутся с вами в
            ближайшее время для уточнения деталей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionnaires.map((questionnaire) => (
            <QuestionnaireCard
              key={questionnaire.id}
              title={questionnaire.title}
              description={questionnaire.description}
              href={questionnaire.href}
            />
          ))}
        </div>
      </CustomContainer>
      <ContactUsScreen />
    </main>
  );
}


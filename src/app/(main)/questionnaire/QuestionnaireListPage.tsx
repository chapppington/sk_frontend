"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import MainButton from "@/components/ui/MainButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface QuestionnaireCard {
  id: string;
  title: string;
  description: string;
  href: string;
}

const questionnaires: QuestionnaireCard[] = [
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
            <div
              key={questionnaire.id}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] flex flex-col"
            >
              {/* Заголовок */}
              <h3 className="text-2xl font-semibold text-white mb-3">
                {questionnaire.title}
              </h3>

              {/* Описание */}
              <p className="text-white/60 text-sm mb-6 flex-grow">
                {questionnaire.description}
              </p>

              {/* Кнопка */}
              <div className="mt-auto">
                <MainButton
                  text="Перейти к заполнению"
                  href={questionnaire.href}
                  className="w-full"
                />
              </div>

              {/* Декоративный градиент */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-3">
            Нужна помощь с выбором?
          </h3>
          <p className="text-white/70 mb-4">
            Если у вас возникли вопросы или вам нужна консультация по выбору
            оборудования, свяжитесь с нами любым удобным способом.
          </p>
          <div className="flex flex-wrap gap-4">
            <MainButton text="Связаться с нами" href="/contacts" />
          </div>
        </div>
      </CustomContainer>
    </main>
  );
}


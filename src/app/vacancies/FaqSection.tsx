"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import Dropdown from "@/components/ui/Dropdown";

interface FaqItem {
  title: string;
  content: string;
  list?: string[];
}

const faqItems: FaqItem[] = [
  {
    title: "Официальное трудоустройство по ТК?",
    content: "Основные условия официального трудоустройства:",
    list: [
      "Официальное трудоустройство в соответствии с Трудовым кодексом РФ",
      "Заработная плата выплачивается 2 раза в месяц на банковскую карту",
      "Оплачиваемые отпуска и больничные",
      "Учебные отпуска для студентов-заочников (по справке-вызову из учебного заведения)",
    ],
  },
  {
    title: "Как проходит адаптация нового сотрудника?",
    content: "Процесс адаптации включает:",
    list: [
      "Стандартный испытательный срок — 3 месяца",
      "За каждым новым сотрудником закрепляется наставник, который обучает и помогает быстрее освоить рабочие процессы",
      "В компании работает специалист, проводящий обучение по технической и электрической части оборудования в Центре развития компетенций на базе производства СК",
    ],
  },
  {
    title: "Почему стоит идти к нам?",
    content: "Преимущества работы в нашей компании:",
    list: [
      "ДМС для всех сотрудников после прохождения испытательного срока (3 месяца)",
      "Реферальная программа «Приведи друга» — премия 5000 рублей за каждого приведенного сотрудника",
      "Собственный «Центр развития компетенций» с групповыми и индивидуальными занятиями по техническим вопросам",
      "Обучение сотрудников от наших партнеров, которые предоставляют комплектующие и оборудование для нашего производства.",
      "Экскурсии на производство для партнеров и гостей",
      "Производственная практика для студентов техникумов и колледжей, обучение и наставничество для молодых специалистов",
      "Сотрудничество с АлтГТУ им. Ползунова, принимаем студентов на практику, работаем по научной деятельности на базе энергетического факультета.",
    ],
  },
  {
    title: "Какая корпоративная культура в компании?",
    content: "Наша корпоративная культура включает:",
    list: [
      "Регулярные внутренние конкурсы для сотрудников",
      "Корпоративные мероприятия: новогодние праздники, День рождения компании, собственные «Олимпийские игры»",
      "Активное участие в городских конкурсах, форумах, спортивных и интеллектуальных играх, встречах и фестивалях регионального уровня",
      "Поддержка спортсменов компании",
    ],
  },
];

const FaqSection = () => {
  return (
    <section id="faq_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <span className="text-white/40 text-sm tracking-wider">
              [ FAQ ]
            </span>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>Ответы на частозадаваемые вопросы</GradientHeading>
            <p className="text-white/70 mt-6">
              Здесь вы найдете ответы на самые распространенные вопросы о работе
              в нашей компании, условиях трудоустройства и корпоративной
              культуре. Если у вас остались дополнительные вопросы, свяжитесь с
              нашим HR-отделом.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mx-auto">
          <div className="md:w-1/2 pr-0 md:pr-8">
            {faqItems.slice(0, 2).map((item, index) => (
              <Dropdown
                key={index}
                title={item.title}
                content=""
                defaultOpen={index === 0}
                customContent={
                  <>
                    <p className="text-white/60 text-base select-none">
                      {item.content}
                    </p>
                    {item.list && item.list.length > 0 && (
                      <ul className="text-white/80 text-base list-disc pl-5 mt-4">
                        {item.list.map((listItem, i) => (
                          <li key={i}>{listItem}</li>
                        ))}
                      </ul>
                    )}
                  </>
                }
              />
            ))}
          </div>

          <div className="md:w-1/2 pl-0 md:pl-8">
            {faqItems.slice(2).map((item, index) => (
              <Dropdown
                key={index + 2}
                title={item.title}
                defaultOpen={index === 0}
                customContent={
                  <>
                    <p className="text-white/60 text-base select-none">
                      {item.content}
                    </p>
                    {item.list && item.list.length > 0 && (
                      <ul className="text-white/80 text-base list-disc pl-5 mt-4">
                        {item.list.map((listItem, i) => (
                          <li key={i}>{listItem}</li>
                        ))}
                      </ul>
                    )}
                  </>
                }
              />
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default FaqSection;

"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string[];
}

const faqItems: FaqItem[] = [
  {
    question: "Официальное трудоустройство по ТК?",
    answer: [
      "Официальное трудоустройство в соответствии с Трудовым кодексом РФ",
      "Заработная плата выплачивается 2 раза в месяц на банковскую карту",
      "Оплачиваемые отпуска и больничные",
      "Учебные отпуска для студентов-заочников (по справке-вызову из учебного заведения)",
    ],
  },
  {
    question: "Как проходит адаптация нового сотрудника?",
    answer: [
      "Стандартный испытательный срок — 3 месяца",
      "За каждым новым сотрудником закрепляется наставник, который обучает и помогает быстрее освоить рабочие процессы",
      "В компании работает специалист, проводящий обучение по технической и электрической части оборудования в Центре развития компетенций на базе производства СК",
    ],
  },
  {
    question: "Почему стоит идти к нам?",
    answer: [
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
    question: "Какая корпоративная культура в компании?",
    answer: [
      "Регулярные внутренние конкурсы для сотрудников",
      "Корпоративные мероприятия: новогодние праздники, День рождения компании, собственные «Олимпийские игры»",
      "Активное участие в городских конкурсах, форумах, спортивных и интеллектуальных играх, встречах и фестивалях регионального уровня",
      "Поддержка спортсменов компании",
    ],
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              <div
                key={index}
                className="faq-item border-t border-white/10 py-8"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-white text-2xl font-light">
                    {item.question}
                  </h3>
                  <motion.button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 6v12M6 12h12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6">
                        <ul className="text-white/80 text-base list-disc pl-5">
                          {item.answer.map((answer, i) => (
                            <li key={i}>{answer}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="md:w-1/2 pl-0 md:pl-8">
            {faqItems.slice(2).map((item, index) => (
              <div
                key={index + 2}
                className="faq-item border-t border-white/10 py-8"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(index + 2)}
                >
                  <h3 className="text-white text-2xl font-light">
                    {item.question}
                  </h3>
                  <motion.button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    animate={{ rotate: openIndex === index + 2 ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 6v12M6 12h12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <AnimatePresence>
                  {openIndex === index + 2 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6">
                        <ul className="text-white/80 text-base list-disc pl-5">
                          {item.answer.map((answer, i) => (
                            <li key={i}>{answer}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default FaqSection;

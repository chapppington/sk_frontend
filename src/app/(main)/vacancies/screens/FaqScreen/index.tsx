"use client";

import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import Dropdown from "@/components/ui/Dropdown";
import BracketsText from "@/components/ui/BracketsText";
import { useVacanciesPageConfigPublic } from "@/hooks/useVacanciesPageConfigPublic";

type Answer = { title: string; content: string; list?: string[] };

const FaqScreen = () => {
  const { config } = useVacanciesPageConfigPublic();
  const title =
    config?.sixthScreen?.title || "Ответы на частозадаваемые вопросы";
  const subtitle =
    config?.sixthScreen?.subtitle ||
    "Здесь вы найдете ответы на самые распространенные вопросы о работе в нашей компании, условиях трудоустройства и корпоративной культуре. Если у вас остались дополнительные вопросы, свяжитесь с нашим HR-отделом.";
  const answers = (config?.sixthScreen?.answers ?? []) as Answer[];

  const mid = Math.ceil(answers.length / 2);
  const left: Answer[] = answers.slice(0, mid);
  const right: Answer[] = answers.slice(mid);

  return (
    <section id="faq_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <BracketsText>FAQ</BracketsText>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>{title}</GradientHeading>
            <p className="text-white/70 mt-6">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mx-auto">
          <div className="md:w-1/2 pr-0 md:pr-8">
            {left.map((item: Answer, index: number) => (
              <Dropdown
                key={index}
                title={item.title}
                defaultOpen={index === 0}
              >
                <p className="text-white/60 text-base select-none">
                  {item.content}
                </p>
                {item.list && item.list.length > 0 && (
                  <ul className="text-white/80 text-base list-disc pl-5 mt-4">
                    {item.list.map((listItem: string, i: number) => (
                      <li key={i}>{listItem}</li>
                    ))}
                  </ul>
                )}
              </Dropdown>
            ))}
          </div>

          <div className="md:w-1/2 pl-0 md:pl-8">
            {right.map((item: Answer, index: number) => (
              <Dropdown key={index} title={item.title}>
                <p className="text-white/60 text-base select-none">
                  {item.content}
                </p>
                {item.list && item.list.length > 0 && (
                  <ul className="text-white/80 text-base list-disc pl-5 mt-4">
                    {item.list.map((listItem: string, i: number) => (
                      <li key={i}>{listItem}</li>
                    ))}
                  </ul>
                )}
              </Dropdown>
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default FaqScreen;

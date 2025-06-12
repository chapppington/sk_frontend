"use client";

import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import Dropdown from "@/components/ui/Dropdown";
import AnimatedText from "@/components/ui/AnimatedText";
import BracketsText from "@/components/ui/BracketsText";

import { faqItems } from "./mock_data";

const FaqScreen = () => {
  return (
    <section id="faq_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <BracketsText>FAQ</BracketsText>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <AnimatedText>
              <GradientHeading>
                Ответы на частозадаваемые вопросы
              </GradientHeading>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <p className="text-white/70 mt-6">
                Здесь вы найдете ответы на самые распространенные вопросы о
                работе в нашей компании, условиях трудоустройства и
                корпоративной культуре. Если у вас остались дополнительные
                вопросы, свяжитесь с нашим HR-отделом.
              </p>
            </AnimatedText>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mx-auto">
          <div className="md:w-1/2 pr-0 md:pr-8">
            {faqItems.slice(0, 2).map((item, index) => (
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
                    {item.list.map((listItem, i) => (
                      <li key={i}>{listItem}</li>
                    ))}
                  </ul>
                )}
              </Dropdown>
            ))}
          </div>

          <div className="md:w-1/2 pl-0 md:pl-8">
            {faqItems.slice(2).map((item, index) => (
              <Dropdown key={index + 2} title={item.title}>
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
              </Dropdown>
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default FaqScreen;

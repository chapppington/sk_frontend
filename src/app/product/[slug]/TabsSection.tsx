"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedText from "@/components/ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<(HTMLLIElement | HTMLDivElement)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (contentRef.current) {
      const items = listItemsRef.current;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          x: 10,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    if (lineRef.current && tabsContainerRef.current) {
      const tabs = tabsContainerRef.current.children;
      const targetTab = tabs[index] as HTMLElement;
      const targetRect = targetTab.getBoundingClientRect();
      const containerRect = tabsContainerRef.current.getBoundingClientRect();

      gsap.to(lineRef.current, {
        x: targetRect.left - containerRect.left,
        width: targetRect.width,
        duration: 0.1,
        ease: "power2.inOut",
      });
    }
    setActiveTab(index);
  };

  // Initialize line position
  useEffect(() => {
    if (lineRef.current && tabsContainerRef.current) {
      const tabs = tabsContainerRef.current.children;
      const targetTab = tabs[activeTab] as HTMLElement;
      const targetRect = targetTab.getBoundingClientRect();
      const containerRect = tabsContainerRef.current.getBoundingClientRect();

      gsap.set(lineRef.current, {
        x: targetRect.left - containerRect.left,
        width: targetRect.width,
      });
    }
  }, []);

  const tabData = [
    {
      title: "Описание",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
          <div>
            <AnimatedText delay={0}>
              <GradientHeading className="mb-6">
                Пункт автоматического регулирования напряжения (ПАРН)
              </GradientHeading>
            </AnimatedText>
            <AnimatedText delay={0}>
              <p className="text-white/70 text-lg">
                — это устройство, предназначенное для обеспечения стабильного и
                безопасного уровня напряжения в электрических сетях.
              </p>
            </AnimatedText>
            <AnimatedText delay={0}>
              <div className="mt-8">
                <button className="flex items-center text-white border-b border-white hover:opacity-80">
                  <span>Скачать документацию</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </AnimatedText>
          </div>

          <div ref={contentRef}>
            <ul className="space-y-8">
              <li
                ref={(el) => {
                  if (el) listItemsRef.current[0] = el;
                }}
                className="flex items-start gap-4"
              >
                <span className="text-white/70 text-3xl leading-none">•</span>
                <p className="text-white/70">
                  ПАРН предназначен для стабилизации уровня напряжения в
                  электрической сети, автоматической компенсации колебаний
                  напряжения и поддержания напряжения в пределах номинальных
                  значений.
                </p>
              </li>
              <li
                ref={(el) => {
                  if (el) listItemsRef.current[1] = el;
                }}
                className="flex items-start gap-4"
              >
                <span className="text-white/70 text-3xl leading-none">•</span>
                <p className="text-white/70">
                  Обеспечивает защиту оборудования и потребителей от скачков
                  напряжения, гарантируя качественное электроснабжение для
                  распределительных сетей, промышленных предприятий и объектов с
                  критическим потреблением энергии.
                </p>
              </li>
              <li
                ref={(el) => {
                  if (el) listItemsRef.current[2] = el;
                }}
                className="flex items-start gap-4"
              >
                <span className="text-white/70 text-3xl leading-none">•</span>
                <p className="text-white/70">
                  ПАРН отличается высокой надежностью, полной автоматизацией
                  процесса, эффективностью использования энергии и простотой
                  обслуживания. Опционально доступен дистанционный мониторинг
                  для удобства эксплуатации.
                </p>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Характеристики",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
          <div>
            <AnimatedText delay={0}>
              <GradientHeading className="mb-6">
                Пункт автоматического регулирования напряжения (ПАРН)
              </GradientHeading>
            </AnimatedText>
            <AnimatedText delay={0}>
              <p className="text-white/70 text-lg">
                — это устройство, предназначенное для обеспечения стабильного и
                безопасного уровня напряжения в электрических сетях.
              </p>
            </AnimatedText>
            <AnimatedText delay={0}>
              <div className="mt-8">
                <button className="flex items-center text-white border-b border-white hover:opacity-80">
                  <span>Скачать документацию</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </AnimatedText>
          </div>

          <div ref={contentRef} className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div
                ref={(el) => {
                  if (el) listItemsRef.current[0] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Номинальное напряжение
                </h3>
                <ul className="space-y-1 text-white/70">
                  <li>• Диапазон напряжения: 6-35 кВ</li>
                </ul>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[1] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Стабилизация напряжения
                </h3>
                <p className="text-white/70">±5-10% от номинального значения</p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[2] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">Тип регулировки</h3>
                <p className="text-white/70">
                  Автоматическая (с использованием регуляторов напряжения и
                  трансформаторов)
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[3] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">Автоматизация</h3>
                <p className="text-white/70">
                  Встроенные системы регулирования
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[4] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Климатические условия эксплуатации
                </h3>
                <p className="text-white/70">
                  У, УХЛ, Т (различные климатические исполнения)
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[5] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Особенности применения
                </h3>
                <p className="text-white/70">
                  Подходит для распределительных сетей, промышленных
                  предприятий, объектов с критическим потреблением
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[6] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">Системы защиты</h3>
                <p className="text-white/70">
                  От коротких замыканий, перегрузок, высоких токов
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[7] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Основные компоненты
                </h3>
                <p className="text-white/70">
                  Трансформатор напряжения, автоматический регулятор напряжения,
                  система управления и мониторинга
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[8] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Коммутационные аппараты
                </h3>
                <p className="text-white/70">
                  Автоматические выключатели, разъединители, предохранители для
                  защиты
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[9] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Опциональные возможности
                </h3>
                <p className="text-white/70">
                  Дистанционный мониторинг и управление
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[10] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">Уровень нагрузки</h3>
                <p className="text-white/70">
                  Поддержка работы при разных уровнях нагрузки и различной
                  мощности потребителей
                </p>
              </div>

              <div
                ref={(el) => {
                  if (el) listItemsRef.current[11] = el;
                }}
              >
                <h3 className="text-lg font-semibold mb-2">Преимущества</h3>
                <p className="text-white/70">
                  Надежность, эффективность, снижение потерь энергии,
                  автоматизация процесса
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <CustomContainer className="py-24">
      <div className="text-white rounded-2xl overflow-hidden">
        <div
          className="flex border-b border-gray-700 relative"
          ref={tabsContainerRef}
        >
          {tabData.map((tab, index) => (
            <button
              key={index}
              className={`px-6 py-4 text-lg font-medium ${
                activeTab === index
                  ? "text-white"
                  : "text-white/90 hover:text-gray-300"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ))}
          <div
            ref={lineRef}
            className="absolute bottom-0 h-0.5 bg-white transition-all duration-200"
          />
        </div>
        <div className="py-6">
          <div key={activeTab}>{tabData[activeTab].content}</div>
        </div>
      </div>
    </CustomContainer>
  );
};

export default TabsSection;

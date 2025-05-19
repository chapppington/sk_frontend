"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import { useState } from "react";
import { motion } from "framer-motion";

const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        duration: 0.3,
      },
    },
  };

  const tabData = [
    {
      title: "Описание",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
          <div>
            <GradientHeading className="mb-6">
              Пункт автоматического регулирования напряжения (ПАРН)
            </GradientHeading>
            <p className="text-white/70 text-lg">
              — это устройство, предназначенное для обеспечения стабильного и
              безопасного уровня напряжения в электрических сетях.
            </p>

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
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ul className="space-y-8">
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <span className="text-white/70 text-3xl leading-none">•</span>
                <p className="text-white/70">
                  ПАРН предназначен для стабилизации уровня напряжения в
                  электрической сети, автоматической компенсации колебаний
                  напряжения и поддержания напряжения в пределах номинальных
                  значений.
                </p>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <span className="text-white/70 text-3xl leading-none">•</span>
                <p className="text-white/70">
                  Обеспечивает защиту оборудования и потребителей от скачков
                  напряжения, гарантируя качественное электроснабжение для
                  распределительных сетей, промышленных предприятий и объектов с
                  критическим потреблением энергии.
                </p>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <span className="text-white/70 text-3xl leading-none">•</span>
                <p className="text-white/70">
                  ПАРН отличается высокой надежностью, полной автоматизацией
                  процесса, эффективностью использования энергии и простотой
                  обслуживания. Опционально доступен дистанционный мониторинг
                  для удобства эксплуатации.
                </p>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      ),
    },
    {
      title: "Характеристики",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
          <div>
            <GradientHeading className="mb-6">
              Пункт автоматического регулирования напряжения (ПАРН)
            </GradientHeading>
            <p className="text-white/70 text-lg">
              — это устройство, предназначенное для обеспечения стабильного и
              безопасного уровня напряжения в электрических сетях.
            </p>

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
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">
                  Номинальное напряжение
                </h3>
                <ul className="space-y-1 text-white/70">
                  <li>• Диапазон напряжения: 6-35 кВ</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">
                  Стабилизация напряжения
                </h3>
                <p className="text-white/70">±5-10% от номинального значения</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">Тип регулировки</h3>
                <p className="text-white/70">
                  Автоматическая (с использованием регуляторов напряжения и
                  трансформаторов)
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">Автоматизация</h3>
                <p className="text-white/70">
                  Встроенные системы регулирования
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">
                  Климатические условия эксплуатации
                </h3>
                <p className="text-white/70">
                  У, УХЛ, Т (различные климатические исполнения)
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">
                  Особенности применения
                </h3>
                <p className="text-white/70">
                  Подходит для распределительных сетей, промышленных
                  предприятий, объектов с критическим потреблением
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">Системы защиты</h3>
                <p className="text-white/70">
                  От коротких замыканий, перегрузок, высоких токов
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">
                  Основные компоненты
                </h3>
                <p className="text-white/70">
                  Трансформатор напряжения, автоматический регулятор напряжения,
                  система управления и мониторинга
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">
                  Коммутационные аппараты
                </h3>
                <p className="text-white/70">
                  Автоматические выключатели, разъединители, предохранители для
                  защиты
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">
                  Опциональные возможности
                </h3>
                <p className="text-white/70">
                  Дистанционный мониторинг и управление
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">Уровень нагрузки</h3>
                <p className="text-white/70">
                  Поддержка работы при разных уровнях нагрузки и различной
                  мощности потребителей
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-2">Преимущества</h3>
                <p className="text-white/70">
                  Надежность, эффективность, снижение потерь энергии,
                  автоматизация процесса
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <CustomContainer className="py-24">
      <div className="text-white rounded-2xl overflow-hidden">
        <div className="flex border-b border-gray-700">
          {tabData.map((tab, index) => (
            <button
              key={index}
              className={`px-6 py-4 text-lg font-medium ${
                activeTab === index
                  ? "text-white border-b-2 border-white"
                  : "text-white/90 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="py-6">
          <div key={activeTab}>{tabData[activeTab].content}</div>
        </div>
      </div>
    </CustomContainer>
  );
};

export default TabsSection;

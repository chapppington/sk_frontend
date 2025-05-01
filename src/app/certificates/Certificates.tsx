"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomContainer from "@/components/ui/CustomContainer";

interface FAQItem {
  title: string;
  content: string;
  documents?: {
    title: string;
    link: string;
  }[];
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    name: "Бухгалтерская документация",
    items: [
      {
        title: "Бухгалтерская документация",
        content:
          "Каждый из нас понимает очевидную вещь: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения распределения внутренних резервов и ресурсов.",
        documents: [
          { title: "Отчет от 05.0.2024 о каких-либо параметрах", link: "#" },
          { title: "Отчет от 05.0.2024 о каких-либо параметрах", link: "#" },
        ],
      },
      {
        title: "Вопрос",
        content:
          "Каждый из нас понимает очевидную вещь: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения распределения внутренних резервов и ресурсов.",
      },
    ],
  },
  {
    name: "Документация",
    items: [
      {
        title: "Вопрос",
        content:
          "Каждый из нас понимает очевидную вещь: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения распределения внутренних резервов и ресурсов.",
      },
      {
        title: "Вопрос",
        content:
          "Каждый из нас понимает очевидную вещь: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения распределения внутренних резервов и ресурсов.",
      },
    ],
  },
  {
    name: "Еще Документация",
    items: [
      {
        title: "Вопрос",
        content:
          "Каждый из нас понимает очевидную вещь: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения распределения внутренних резервов и ресурсов.",
      },
    ],
  },
];

export default function Certificates() {
  const [activeTab, setActiveTab] = useState(0);
  const [openItems, setOpenItems] = useState<{ [key: number]: number[] }>({
    0: [0],
  });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab]?.includes(index)
        ? prev[activeTab].filter((i) => i !== index)
        : [...(prev[activeTab] || []), index],
    }));
  };

  return (
    <main className="mb-10">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Сертификаты", href: "/certificates" },
        ]}
      />

      {/* Page Title */}
      <CustomContainer className="my-8">
        <GradientHeading>Сертификаты и документация</GradientHeading>
      </CustomContainer>

      {/* Left Sidebar Navigation */}
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Menu */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <ul className="space-y-4">
              {faqCategories.map((category, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setActiveTab(index)}
                    className={`block w-full px-6 py-4 text-lg rounded-md border transition-all duration-200 relative overflow-hidden text-left cursor-pointer ${
                      activeTab === index
                        ? "bg-[rgba(255,255,255,0.15)] text-white border-[rgba(255,255,255,0.3)]"
                        : "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.15)] text-white/80 border-[rgba(255,255,255,0.1)]"
                    }`}
                  >
                    {category.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="container mx-auto relative">
            <div className="flex flex-col md:flex-row mx-auto">
              <div className="pl-0 md:pl-8 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {faqCategories[activeTab].items.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`faq-item border-t ${
                          index === faqCategories[activeTab].items.length - 1
                            ? "border-b"
                            : ""
                        } border-white/10 py-8`}
                      >
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleItem(index)}
                        >
                          <h3 className="text-white text-2xl font-light select-none">
                            {item.title}
                          </h3>
                          <motion.button
                            animate={{
                              rotate: openItems[activeTab]?.includes(index)
                                ? 45
                                : 0,
                            }}
                            transition={{ duration: 0.1 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 ease-in-out cursor-pointer hover:bg-white/10"
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
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: openItems[activeTab]?.includes(index)
                              ? "auto"
                              : 0,
                            opacity: openItems[activeTab]?.includes(index)
                              ? 1
                              : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6">
                            <p className="text-white/60 text-base select-none">
                              {item.content}
                            </p>

                            {item.documents && (
                              <div className="space-y-4 mt-6">
                                {item.documents.map((doc, docIndex) => (
                                  <motion.div
                                    key={docIndex}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center"
                                  >
                                    <a
                                      href={doc.link}
                                      className="text-white hover:text-white/80 flex items-center group"
                                    >
                                      <span>{doc.title}</span>
                                      <svg
                                        className="w-5 h-5 ml-2 text-white/60 group-hover:text-white/80"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="1.5"
                                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                      </svg>
                                    </a>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </main>
  );
}

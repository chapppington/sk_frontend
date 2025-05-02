"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  title: string;
  content: string;
  documents?: {
    title: string;
    link: string;
  }[];
}

const faqItems: FAQItem[] = [
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
    title: "Документация",
    content:
      "Каждый из нас понимает очевидную вещь: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения распределения внутренних резервов и ресурсов. Значимость этих проблем настолько очевидна, что курс на социально-ориентированный национальный проект напрямую зависит от системы массового участия.",
  },
  {
    title: "Документация",
    content:
      "Каждый из нас понимает очевидную вещь: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения распределения внутренних резервов и ресурсов. Значимость этих проблем настолько очевидна, что курс на социально-ориентированный национальный проект напрямую зависит от системы массового участия.",
  },
];

export default function CertificatesSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="certificates_section"
      className="bg-transparent py-24 relative"
    >
      <div className="container mx-auto px-4 lg:px-16 2xl:px-24">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <div className="text-white/60">[ ДОКУМЕНТАЦИЯ ]</div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row mx-auto">
              <div className="pl-0 md:pl-8">
                <AnimatePresence mode="wait">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`faq-item border-t ${
                        index === faqItems.length - 1 ? "border-b" : ""
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
                            rotate: openItems.includes(index) ? 45 : 0,
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
                          height: openItems.includes(index) ? "auto" : 0,
                          opacity: openItems.includes(index) ? 1 : 0,
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
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

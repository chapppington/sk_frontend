"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

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
  const [openItems, setOpenItems] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevOpenItems = useRef<number[]>([]);

  useEffect(() => {
    faqItems.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;
      const isOpen = openItems.includes(idx);
      if (!isOpen) {
        gsap.set(el, {
          height: 0,
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        });
      } else {
        gsap.set(el, {
          height: "auto",
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    faqItems.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) return;
      const wasOpen = prevOpenItems.current.includes(idx);
      const isOpen = openItems.includes(idx);

      if (wasOpen === isOpen) return; // Only animate if state changed

      if (isOpen) {
        gsap.killTweensOf(el);
        gsap.set(el, {
          height: 0,
          opacity: 0,
          visibility: "visible",
          pointerEvents: "auto",
        });
        gsap.to(el, {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(el, { height: "auto" });
          },
        });
      } else {
        gsap.killTweensOf(el);
        gsap.set(el, {
          height: el.scrollHeight,
          opacity: 1,
        });
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(el, { visibility: "hidden", pointerEvents: "none" });
          },
        });
      }
    });
    prevOpenItems.current = openItems;
  }, [openItems]);

  const toggleItem = (idx: number) => {
    setOpenItems((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
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
                {faqItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`faq-item border-t ${
                      idx === faqItems.length - 1 ? "border-b" : ""
                    } border-white/10 py-8`}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleItem(idx)}
                    >
                      <h3 className="text-white text-2xl font-light select-none">
                        {item.title}
                      </h3>
                      <button
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 ease-in-out cursor-pointer hover:bg-white/10"
                        aria-label="Toggle"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{
                            transform: openItems.includes(idx)
                              ? "rotate(45deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.2s",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 6v12M6 12h12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      ref={(el) => {
                        contentRefs.current[idx] = el;
                      }}
                      className="overflow-hidden w-full min-w-0"
                    >
                      <div className="pt-6">
                        <p className="text-white/60 text-base select-none">
                          {item.content}
                        </p>

                        {item.documents && (
                          <div className="space-y-4 mt-6">
                            {item.documents.map((doc, docIndex) => (
                              <div key={docIndex} className="flex items-center">
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
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

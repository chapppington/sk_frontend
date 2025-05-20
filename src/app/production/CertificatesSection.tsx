"use client";

import { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";

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
                  <Dropdown
                    key={idx}
                    title={item.title}
                    content={item.content}
                    documents={item.documents}
                    defaultOpen={idx === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

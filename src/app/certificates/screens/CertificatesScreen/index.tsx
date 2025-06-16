"use client";

import gsap from "gsap";
import { useState, useRef, useEffect } from "react";

import Dropdown from "@/components/ui/Dropdown";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import CategoryButton from "@/components/ui/CategoryButton";

import { faqCategories } from "./mock_data";

export default function CertificatesScreen() {
  const [activeTab, setActiveTab] = useState(0);

  // Main content container ref
  const tabContentRef = useRef<HTMLDivElement>(null);

  // Tab animation when switching tabs
  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <div className="mb-10">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Сертификаты", href: "/certificates" },
        ]}
      />

      {/* Page Title */}
      <CustomContainer className="mt-8 mb-12">
        <GradientHeading>
          Сертификаты <br></br>и документация
        </GradientHeading>
      </CustomContainer>

      {/* Left Sidebar Navigation */}
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Menu */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <ul className="space-y-4">
              {faqCategories.map((category, index) => (
                <li key={index}>
                  <CategoryButton
                    key={index}
                    onClick={() => setActiveTab(index)}
                    isActive={activeTab === index}
                    className="w-full"
                  >
                    {category.name}
                  </CategoryButton>
                </li>
              ))}
            </ul>
          </div>

          <div className="container mx-auto relative">
            <div className="flex flex-col md:flex-row mx-auto">
              <div className="pl-0 md:pl-8 w-full">
                <div ref={tabContentRef} key={`tab-content-${activeTab}`}>
                  {faqCategories[activeTab].items.map((item, index) => (
                    <Dropdown
                      key={index}
                      title={item.title}
                      defaultOpen={faqCategories[activeTab].items.length === 1}
                    >
                      <p className="text-white/60 text-base select-none">
                        {item.content}
                      </p>

                      {item.documents && item.documents.length > 0 && (
                        <div className="space-y-4 mt-6">
                          {item.documents.map((doc, index) => (
                            <div
                              key={index}
                              className="doc-link flex items-center"
                            >
                              <a
                                href={doc.link}
                                target="_blank"
                                rel="noopener noreferrer"
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
                    </Dropdown>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
}

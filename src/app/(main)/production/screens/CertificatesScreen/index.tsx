"use client";

import { FC } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { faqItems } from "./mock_data";
import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";

const CertificatesScreen: FC = () => {
  return (
    <section
      id="certificates_section"
      className="bg-transparent py-24 relative"
    >
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <BracketsText>СЕРТИФИКАЦИЯ</BracketsText>
          </div>

          <div className="container mx-auto relative">
            <div className="flex flex-col md:flex-row mx-auto">
              <div className="pl-0 md:pl-8 ml-auto">
                {faqItems.map((item, idx) => (
                  <Dropdown
                    key={idx}
                    title={item.title}
                    defaultOpen={idx === 0}
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
      </CustomContainer>
    </section>
  );
};

export default CertificatesScreen;

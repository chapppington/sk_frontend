"use client";

import { FC } from "react";
import YandexMapContainer from "@/components/ui/YandexMapContainer";
import { companyAddress, contactBlocks } from "../../mock_data";

const FooterMain: FC = () => {
  return (
    <div className="md:border-t md:border-white/30 md:pt-12 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 with 2 contact blocks */}
        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {contactBlocks.slice(0, 2).map((block, index) => (
            <div key={index}>
              <p className="text-white/80 mb-4">• {block.title}</p>
              <div className="flex items-center mb-3">
                <svg
                  className="w-4 h-4 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-white">{block.phone}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-white">{block.email}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2 with 2 contact blocks */}
        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {contactBlocks.slice(2, 4).map((block, index) => (
            <div key={index}>
              <p className="text-white/80 mb-4">• {block.title}</p>
              <div className="flex items-center mb-3">
                <svg
                  className="w-4 h-4 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-white">{block.phone}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-white">{block.email}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3 with map */}
        <div>
          <p className="text-white/80 mb-4">• Адрес</p>
          <div className="flex items-center mb-3">
            <svg
              className="w-4 h-4 text-white mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-white">{companyAddress}</span>
          </div>
          <YandexMapContainer />
        </div>
      </div>
    </div>
  );
};

export default FooterMain;

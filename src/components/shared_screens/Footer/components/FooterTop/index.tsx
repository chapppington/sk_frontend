"use client";

import { PagesConfig } from "@/config/pages.config";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { mobileNavigationItems, desktopNavigationItems } from "../../mock_data";

const FooterTop: FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-12">
      {/* Logo Section */}
      <div className="mb-8 md:mb-0">
        <Link href={PagesConfig.home} className="flex items-center">
          <Image
            src="/logo.svg"
            alt="СИБКОМПЛЕКТ"
            width={150}
            height={32}
            className="h-8"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="w-full md:w-auto">
        {/* Mobile Links (full width with arrows) */}
        <div className="md:hidden w-full space-y-4">
          {mobileNavigationItems.map((item) => (
            <div key={item.name} className="border-b border-white/30 pb-4">
              <Link
                href={item.link}
                className="flex justify-between items-center text-white"
              >
                <span>{item.name}</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop Links (grid) */}
        <div className="hidden md:flex justify-center items-center w-full">
          <div className="flex space-x-8 mx-auto">
            {desktopNavigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.link}
                  className="text-white hover:text-white/80 text-sm whitespace-nowrap relative select-none group transition-colors"
                >
                  {item.name}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;

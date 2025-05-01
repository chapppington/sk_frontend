"use client";

import { FC } from "react";
import CustomContainer from "../ui/CustomContainer";
import YandexMapContainer from "@/components/ui/YandexMapContainer";

const Footer: FC = () => {
  return (
    <footer id="footer" className="bg-transparent py-12">
      <CustomContainer>
        {/* Top Section with Logo and Menu */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          {/* Logo Section */}
          <div className="mb-8 md:mb-0">
            <a href="#" className="flex items-center">
              <img src="/logo.svg" alt="СИБКОМПЛЕКТ" className="h-8" />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-auto">
            {/* Mobile Links (full width with arrows) */}
            <div className="md:hidden w-full space-y-4">
              {[
                "Каталог",
                "Проекты",
                "О компании",
                "О производстве",
                "Вакансии",
                "Контакты",
              ].map((item) => (
                <div key={item} className="border-b border-white/30 pb-4">
                  <a
                    href="#"
                    className="flex justify-between items-center text-white"
                  >
                    <span>{item}</span>
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
                  </a>
                </div>
              ))}
            </div>

            {/* Desktop Links (grid) */}
            <div className="hidden md:grid grid-cols-4 gap-4">
              {["Каталог", "Проекты", "О компании", "О производстве"].map(
                (item) => (
                  <div key={item} className="col-span-1 text-center">
                    <a
                      href="#"
                      className="text-white hover:text-white/80 text-sm"
                    >
                      {item}
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="border-t border-white/30 pt-12 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 with 2 contact blocks */}
            <div className="space-y-8 md:flex md:flex-col md:justify-between">
              {[
                {
                  title: "Отдел продаж",
                  phone: "8 (880) 990-00-00",
                  email: "test@mail.ru",
                },
                {
                  title: "Офис компании",
                  phone: "8 (880) 990-00-00",
                  email: "test@mail.ru",
                },
              ].map((block, index) => (
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
              {[
                {
                  title: "Конструкторский отдел",
                  phone: "8 (880) 990-00-00",
                  email: "test@mail.ru",
                },
                {
                  title: "Сервисная служба",
                  phone: "8 (880) 990-00-00",
                  email: "test@mail.ru",
                },
              ].map((block, index) => (
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
                <span className="text-white">ул. Арбат, 26, Москва</span>
              </div>
              <YandexMapContainer />
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright and Policy Links */}
        <div className="border-t border-white/30 pt-8">
          {/* Mobile version (stacked vertically) */}
          <div className="md:hidden space-y-4">
            <p className="text-white/80 text-sm">
              © {new Date().getFullYear()}г. Все права защищены.
            </p>
            <a
              href="#"
              className="block text-white/80 text-sm hover:text-white/70"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="block text-white/80 text-sm hover:text-white/70"
            >
              Условия обработки персональных данных
            </a>
          </div>

          {/* Desktop version (flex row) */}
          <div className="hidden md:flex md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm">
              © {new Date().getFullYear()}г. Все права защищены.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/80 text-sm hover:text-white/70">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-white/80 text-sm hover:text-white/70">
                Условия обработки персональных данных
              </a>
            </div>
          </div>
        </div>
      </CustomContainer>
    </footer>
  );
};

export default Footer;

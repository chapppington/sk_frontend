"use client";

import React from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MainButton from "@/components/ui/MainButton";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";

import Input from "@/components/ui/Input";
import CustomContainer from "@/components/ui/CustomContainer";
import YandexMapContainer from "@/components/ui/YandexMapContainer";
const Contacts: React.FC = () => {
  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Контакты", href: "/contacts", current: true },
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Contact Section */}
      <section className="py-16">
        <CustomContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Form */}
            <div>
              <GradientHeading className="mb-8">
                Связаться с нами
              </GradientHeading>
              <p className="text-white/80 mb-10">
                В своём стремлении улучшить пользовательский опыт мы упускаем,
                что предприниматели в сети интернет лишь добавляют
              </p>

              <form className="space-y-6">
                <Input
                  type="text"
                  id="name"
                  label="Ваше имя"
                  className="w-full"
                />
                <Input
                  type="email"
                  id="email"
                  label="Ваш E-mail"
                  className="w-full"
                />
                <Input
                  type="text"
                  id="organization"
                  label="Организация"
                  className="w-full"
                />
                <MainButton text="Отправить заявку" />
              </form>
            </div>

            {/* Right Column - Contact Information */}
            <div className="space-y-12">
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sales Department */}
                <div>
                  <h3 className="text-white/80 mb-4">• Отдел продаж</h3>
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
                    <a href="tel:88809900000" className="text-white">
                      8 (880) 990-00-00
                    </a>
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
                    <a href="mailto:test@mail.ru" className="text-white">
                      test@mail.ru
                    </a>
                  </div>
                </div>

                {/* Design Department */}
                <div>
                  <h3 className="text-white/80 mb-4">
                    • Конструкторский отдел
                  </h3>
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
                    <a href="tel:88809900000" className="text-white">
                      8 (880) 990-00-00
                    </a>
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
                    <a href="mailto:test@mail.ru" className="text-white">
                      test@mail.ru
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-white/80 mb-4">• Адрес</h3>
                <div className="flex items-center mb-4">
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
                <YandexMapContainer height="300px" />
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </main>
  );
};

export default Contacts;

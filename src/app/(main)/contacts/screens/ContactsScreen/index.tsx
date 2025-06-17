"use client";

// TODO create form component with react hook form

import { FC } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MainButton from "@/components/ui/MainButton";
import GradientHeading from "@/components/ui/GradientHeading";
import Input from "@/components/ui/Input";
import CustomContainer from "@/components/ui/CustomContainer";
import YandexMapContainer from "@/components/ui/YandexMapContainer";
import PhoneIcon from "@/icons/PhoneIcon";
import EmailIcon from "@/icons/EmailIcon";
import LocationIcon from "@/icons/LocationIcon";

const Contacts: FC = () => {
  return (
    <main>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Контакты", href: "/contacts", current: true },
        ]}
      />

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
                  className="w-full mb-6"
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
                    <PhoneIcon className="w-4 h-4 text-white mr-2" />
                    <a href="tel:88809900000" className="text-white">
                      8 (880) 990-00-00
                    </a>
                  </div>
                  <div className="flex items-center">
                    <EmailIcon className="w-4 h-4 text-white mr-2" />
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
                    <PhoneIcon className="w-4 h-4 text-white mr-2" />
                    <a href="tel:88809900000" className="text-white">
                      8 (880) 990-00-00
                    </a>
                  </div>
                  <div className="flex items-center">
                    <EmailIcon className="w-4 h-4 text-white mr-2" />
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
                  <LocationIcon className="w-4 h-4 text-white mr-2" />
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

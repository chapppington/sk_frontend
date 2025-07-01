"use client";

// TODO create form component with react hook form

import { FC } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MainButton from "@/components/ui/MainButton";
import GradientHeading from "@/components/ui/GradientHeading";
import Input from "@/components/ui/Input";
import CustomContainer from "@/components/ui/CustomContainer";
import YandexMapContainer from "@/components/ui/YandexMapContainer";
import PhoneIcon from "@/shared/icons/PhoneIcon";
import EmailIcon from "@/shared/icons/EmailIcon";
import LocationIcon from "@/shared/icons/LocationIcon";
import {
  contactBlocks,
  companyAddress,
} from "@/components/shared_screens/Footer/mock_data";

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
                {contactBlocks.map((block, idx) => (
                  <div key={block.title + idx}>
                    <h3 className="text-white/80 mb-4">• {block.title}</h3>
                    {block.phone && (
                      <div className="flex items-center mb-3">
                        <PhoneIcon className="w-4 h-4 text-white mr-2" />
                        <a
                          href={`tel:${block.phoneRaw}`}
                          className="text-white"
                        >
                          {block.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center">
                      <EmailIcon className="w-4 h-4 text-white mr-2" />
                      <a href={`mailto:${block.email}`} className="text-white">
                        {block.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div>
                <h3 className="text-white/80 mb-4">• Адрес</h3>
                <div className="flex items-center mb-4">
                  <LocationIcon className="w-4 h-4 text-white mr-2" />
                  <span className="text-white">{companyAddress}</span>
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

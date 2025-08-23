"use client";

import { FC } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import YandexMapContainer from "@/components/ui/YandexMapContainer";
import PhoneIcon from "@/shared/icons/PhoneIcon";
import EmailIcon from "@/shared/icons/EmailIcon";
import LocationIcon from "@/shared/icons/LocationIcon";
import { useContactsPageConfig } from "@/hooks/useContactsPageConfig";
import ContactForm from "@/components/ContactForm";

const Contacts: FC = () => {
  const { config } = useContactsPageConfig();

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
                Заполните форму — мы свяжемся с вами в рабочее время, ответим на
                вопросы и подготовим предложение. При необходимости можно
                прикрепить файлы с ТЗ или спецификацией.
              </p>
              <ContactForm />
            </div>

            {/* Right Column - Contact Information */}
            <div className="space-y-12">
              {config?.departments?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {config.departments.map((dep, idx) => (
                    <div key={idx}>
                      <h3 className="text-white/80 mb-4">• {dep.name}</h3>
                      {dep.phone && (
                        <div className="flex items-center mb-3">
                          <PhoneIcon className="w-4 h-4 text-white mr-2" />
                          <a
                            href={`tel:${dep.phone.replace(/\s|\(|\)|-/g, "")}`}
                            className="text-white"
                          >
                            {dep.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center">
                        <EmailIcon className="w-4 h-4 text-white mr-2" />
                        <a href={`mailto:${dep.email}`} className="text-white">
                          {dep.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Address */}
              <div>
                <h3 className="text-white/80 mb-4">• Адрес</h3>
                {config?.address && (
                  <div className="flex items-center mb-4">
                    <LocationIcon className="w-4 h-4 text-white mr-2" />
                    <span className="text-white">{config.address}</span>
                  </div>
                )}
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

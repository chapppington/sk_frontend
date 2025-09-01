"use client";

import { FC, useState } from "react";
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
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
    // Сбросить состояние через 5 секунд
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

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

              {isSuccess ? (
                // Сообщение об успехе
                <div className="text-center py-8">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-white/70">
                      Мы получили ваше сообщение и свяжемся с вами в ближайшее
                      время.
                    </p>
                  </div>
                </div>
              ) : (
                <ContactForm onSuccess={handleSuccess} />
              )}
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

"use client";
import { FC } from "react";
import BracketsText from "@/components/ui/BracketsText";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import ContactForm from "@/components/ContactForm";
import { ContactFormVariant } from "@/components/ContactForm/types";

interface ContactUsScreenProps {
  variant?: ContactFormVariant;
}

const ContactUsScreen: FC<ContactUsScreenProps> = ({ variant = "default" }) => {
  const isVacancy = variant === "vacancy";
  return (
    <section id="contact_us_section" className="bg-transparent py-24">
      <CustomContainer>
        {/* Section Title */}
        <BracketsText className="mb-8">СВЯЗАТЬСЯ С НАМИ</BracketsText>
        {/* Main content with two columns on desktop */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Left column - Headings and description */}
          <div className="lg:w-1/2">
            {/* Main Heading */}
            <GradientHeading className="mb-8">
              {isVacancy ? (
                <>
                  Хотите сотрудничать <br />с нами?
                </>
              ) : (
                <>Хотите обсудить проект или получить предложение?</>
              )}
            </GradientHeading>

            {/* Description text */}
            <div className="mt-8 lg:mb-0">
              <p className="text-white/70 max-w-[600px]">
                {isVacancy
                  ? "Если Вас заинтересовали вакансии нашей компании, заполните форму и мы обязательно с Вами свяжемся"
                  : "Если вы заинтересованы в нашей продукции или ищете техническое решение — оставьте свои контакты, и наш специалист свяжется с вами в ближайшее время."}
              </p>
            </div>
          </div>

          {/* Right column - Contact Form */}
          <div className="lg:w-1/2">
            <ContactForm variant={variant} />
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ContactUsScreen;

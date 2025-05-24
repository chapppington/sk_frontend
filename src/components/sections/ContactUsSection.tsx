"use client";

import { FC } from "react";
import BracketsText from "@/components/ui/BracketsText";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import CustomContainer from "../ui/CustomContainer";
import ContactForm from "@/components/sections/ContactForm";

const ContactUsSection: FC = () => {
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
              Хотите сотрудничать <br />с нами?
            </GradientHeading>

            {/* Description text */}
            <div className="mt-8 lg:mb-0">
              <p className="text-white/70 max-w-[600px]">
                Если Вас заинтересовали вакансии нашей компании, заполните форму
                и мы обязательно с Вами свяжемся
              </p>
            </div>
          </div>

          {/* Right column - Contact Form */}
          <div className="lg:w-1/2">
            <ContactForm />
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ContactUsSection;

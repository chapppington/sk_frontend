import React from "react";
import BracketsText from "@/components/ui/BracketsText";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import MainButton from "@/components/ui/MainButton";
import Input from "@/components/ui/Input";
import CustomContainer from "../ui/CustomContainer";

const ContactUsSection: React.FC = () => {
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
            <GradientHeading className="mb-16">
              Хотите сотрудничать <br />с нами?
            </GradientHeading>

            {/* Description text */}
            <div className="mb-8 lg:mb-0">
              <p className="text-white/70 max-w-[600px]">
                Если Вас заинтересовали вакансии нашей компании, заполните форму
                и мы обязательно с Вами свяжемся
              </p>
            </div>
          </div>

          {/* Right column - Contact Form */}
          <div className="lg:w-1/2">
            <form className="space-y-8">
              <Input type="text" id="name" label="ФИО" required />

              <Input type="email" id="email" label="Почта" required />

              <Input type="tel" id="phone" label="Телефон" required />

              {/* File Upload and Consent Section */}
              <div className="flex flex-col gap-6 mt-8">
                <button
                  type="button"
                  className="flex items-center text-white/80 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  Прикрепить резюме
                </button>

                <label className="flex items-center text-white/80 cursor-pointer">
                  <div className="relative flex items-center mr-3">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      required
                    />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  Я согласен с условиями обработки персональных данных
                </label>
              </div>

              {/* Submit Button with Arrow */}
              <MainButton text="Отправить" />
            </form>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ContactUsSection;

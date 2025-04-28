import React from "react";
import BracketsText from "@/components/ui/BracketsText";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import MainButton from "@/components/ui/MainButton";

const ContactUsSection: React.FC = () => {
  return (
    <section id="contact_us_section" className="bg-transparent py-24">
      <div className="container mx-auto px-4 lg:px-16 2xl:px-24">
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
              {/* Input Group for Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="block w-full bg-transparent border border-white/50 text-white p-4 focus:border-white focus:outline-none peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute text-white/80 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent backdrop-blur-md px-2 peer-focus:px-2 peer-focus:text-black peer-focus:bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  ФИО
                </label>
              </div>

              {/* Input Group for Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="block w-full bg-transparent border border-white/50 text-white p-4 focus:border-white focus:outline-none peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-white/80 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent backdrop-blur-md px-2 peer-focus:px-2 peer-focus:text-black peer-focus:bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Почта
                </label>
              </div>

              {/* Input Group for Phone */}
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  className="block w-full bg-transparent border border-white/50 text-white p-4 focus:border-white focus:outline-none peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute text-white/80 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent backdrop-blur-md px-2 peer-focus:px-2 peer-focus:text-black peer-focus:bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Телефон
                </label>
              </div>

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
      </div>
    </section>
  );
};

export default ContactUsSection;

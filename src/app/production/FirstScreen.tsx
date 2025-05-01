"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const FirstScreen = () => {
  return (
    <header className="relative h-screen">
      {/* Background Image with Next.js Image optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/production_bg.webp"
          alt="Production background"
          fill
          priority
          quality={85}
          className="object-cover"
        />
      </div>

      {/* Base Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/40 z-[1]"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-[2]" />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 lg:px-16 2xl:px-24 h-full flex flex-col relative z-10">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/", current: false },
              { label: "О производстве", href: "/production", current: true },
            ]}
            disableContainer={true}
          />
        </motion.div>

        {/* Main Content */}
        <div
          className="relative container mx-auto flex flex-col justify-between"
          style={{ height: "calc(100vh - 180px)" }}
        >
          <motion.h1
            className="text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-light text-white max-w-4xl pt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Новая модель организационной деятельности оказалась чрезвычайно
            полезной
          </motion.h1>

          {/* Bottom Content */}
          <motion.div
            className="flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex flex-col justify-end max-w-xl md:mb-8">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center mb-4 md:mb-6"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </motion.div>
              <motion.p
                className="text-base md:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-[500px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                Являясь всего лишь частью общей картины, тщательные исследования
                конкурентов могут быть описаны максимально подробно.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        style={{ zIndex: 10 }}
        className="hidden md:block absolute bottom-0 right-0 w-full md:w-auto md:min-w-[800px] lg:min-w-[500px] xl:min-w-[550px] 2xl:min-w-[600px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 p-6 md:p-16 lg:p-10 xl:p-12 2xl:p-14">
          {[
            {
              number: "7776",
              unit: "м²",
              text: "Собственных производственных площадей",
            },
            {
              number: "20+",
              unit: "лет",
              text: "Беспрерывной работы на рынке электрооборудования",
            },
            {
              number: "4.7",
              unit: "NPS",
              text: "Индекс потребительской лояльности",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.number}
              className="hidden md:block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-white mb-4">
                <span>
                  {stat.number}{" "}
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                    {stat.unit}
                  </span>
                </span>
              </div>
              <div className="text-sm sm:text-base md:text-lg lg:text-sm xl:text-base 2xl:text-lg font-light text-white mb- max-w-[250px] lg:max-w-[160px] xl:max-w-[180px] 2xl:max-w-[200px]">
                <span>{stat.text}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </header>
  );
};

export default FirstScreen;

"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import Dropdown from "@/components/ui/Dropdown";

const stages = [
  {
    number: 1,
    title: "Тип КТП",
    active: true,
  },
  {
    number: 2,
    title: "Конфигурация и коммутационные аппараты",
    active: false,
  },
  {
    number: 3,
    title: "Этап 3",
    active: false,
  },
  {
    number: 4,
    title: "Этап 4",
    active: false,
  },
  {
    number: 5,
    title: "Этап 5",
    active: false,
  },
];

export default function QuestionnairePage() {
  const [activeStage, setActiveStage] = useState(1);
  const [selectedKtpType, setSelectedKtpType] = useState("Блочная (КТПБ)");
  const [selectedImplementation, setSelectedImplementation] =
    useState("Проходная");
  const [wallMaterial, setWallMaterial] = useState("");

  const breadcrumbItems = [
    { label: "Главная", href: "/", current: false },
    { label: "Опросный лист", href: "/questionnaire", current: true },
  ];

  // Function to change stage
  const changeStage = (stageNumber: number) => {
    setActiveStage(stageNumber);

    // Update stages array
    stages.forEach((stage) => {
      stage.active = stage.number === stageNumber;
    });
  };

  return (
    <main className="text-white">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left side: Breadcrumbs, Heading, Description, and Stages */}
          <div className="w-full lg:w-1/2">
            <Breadcrumbs items={breadcrumbItems} disableContainer />

            <GradientHeading className="mt-8 mb-6">
              Опросный лист
            </GradientHeading>

            <p className="text-white/60 mb-12">
              на изготовление комплектной трансформаторной подстанции (КТП),
              производства ООО «СибКомплект»
            </p>

            {/* Stages section - Desktop */}
            <div className="relative">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className="flex items-start mb-8 cursor-pointer"
                  onClick={() => changeStage(stage.number)}
                >
                  {/* Stage indicator with vertical line */}
                  <div className="relative mr-6">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${
                        stage.active
                          ? "bg-white text-black"
                          : "border border-white/30 text-white/60"
                      } transition-all duration-300`}
                    >
                      {stage.number}
                    </div>
                    {index < stages.length - 1 && (
                      <div className="absolute top-10 left-1/2 w-px h-12 bg-white/20 -translate-x-1/2"></div>
                    )}
                  </div>

                  {/* Stage content */}
                  <div className="flex-1">
                    <h3
                      className={`text-lg ${
                        stage.active ? "text-white" : "text-white/60"
                      } transition-colors duration-300`}
                    >
                      {stage.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Vertical sliding Dropdowns */}
          <div className="w-full lg:w-1/2 pt-32">
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-lg border border-white/10">
              {/* Accordion 1: Type of KTP */}
              <Dropdown title="01 · Тип КТП" defaultOpen={activeStage === 1}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="ktpType1"
                        name="ktpType"
                        checked={selectedKtpType === "Мачтовая (КТПМ)"}
                        onChange={() => setSelectedKtpType("Мачтовая (КТПМ)")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="ktpType1"
                      className="text-white/80 cursor-pointer"
                    >
                      Мачтовая (КТПМ)
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="ktpType2"
                        name="ktpType"
                        checked={selectedKtpType === "Киосковая (КТПК)"}
                        onChange={() => setSelectedKtpType("Киосковая (КТПК)")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="ktpType2"
                      className="text-white/80 cursor-pointer"
                    >
                      Киосковая (КТПК)
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="ktpType3"
                        name="ktpType"
                        checked={selectedKtpType === "Блочная (КТПБ)"}
                        onChange={() => setSelectedKtpType("Блочная (КТПБ)")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="ktpType3"
                      className="text-white/80 cursor-pointer"
                    >
                      Блочная (КТПБ)
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="ktpType4"
                        name="ktpType"
                        checked={selectedKtpType === "Внутрицеховая"}
                        onChange={() => setSelectedKtpType("Внутрицеховая")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="ktpType4"
                      className="text-white/80 cursor-pointer"
                    >
                      Внутрицеховая
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="ktpType5"
                        name="ktpType"
                        checked={selectedKtpType === "Пристроенная"}
                        onChange={() => setSelectedKtpType("Пристроенная")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="ktpType5"
                      className="text-white/80 cursor-pointer"
                    >
                      Пристроенная
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="ktpType6"
                        name="ktpType"
                        checked={selectedKtpType === "Стационарная"}
                        onChange={() => setSelectedKtpType("Стационарная")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="ktpType6"
                      className="text-white/80 cursor-pointer"
                    >
                      Стационарная
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="ktpType7"
                        name="ktpType"
                        checked={selectedKtpType === "Передвижная"}
                        onChange={() => setSelectedKtpType("Передвижная")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="ktpType7"
                      className="text-white/80 cursor-pointer"
                    >
                      Передвижная
                    </label>
                  </div>

                  <div className="mt-8">
                    <label className="text-white mb-2 block">
                      Укажите материал стен
                    </label>
                    <input
                      type="text"
                      value={wallMaterial}
                      onChange={(e) => setWallMaterial(e.target.value)}
                      placeholder="Введите текст"
                      className="w-full bg-transparent border border-white/20 rounded p-4 text-white"
                    />
                  </div>
                </div>
              </Dropdown>

              {/* Accordion 2: Implementation */}
              <Dropdown
                title="02 · Исполнение КТП:"
                defaultOpen={activeStage === 2}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="impl1"
                        name="implementation"
                        checked={selectedImplementation === "Проходная"}
                        onChange={() => setSelectedImplementation("Проходная")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="impl1"
                      className="text-white/80 cursor-pointer"
                    >
                      Проходная
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="impl2"
                        name="implementation"
                        checked={selectedImplementation === "Тупиковая"}
                        onChange={() => setSelectedImplementation("Тупиковая")}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="impl2"
                      className="text-white/80 cursor-pointer"
                    >
                      Тупиковая
                    </label>
                  </div>
                </div>
              </Dropdown>

              {/* Accordion 3, 4, 5 placeholders */}
              <Dropdown title="03 · Этап 3" defaultOpen={activeStage === 3}>
                <div className="py-4">
                  <p className="text-white/60">Содержимое этапа 3</p>
                </div>
              </Dropdown>

              <Dropdown title="04 · Этап 4" defaultOpen={activeStage === 4}>
                <div className="py-4">
                  <p className="text-white/60">Содержимое этапа 4</p>
                </div>
              </Dropdown>

              <Dropdown title="05 · Этап 5" defaultOpen={activeStage === 5}>
                <div className="py-4">
                  <p className="text-white/60">Содержимое этапа 5</p>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </CustomContainer>
    </main>
  );
}

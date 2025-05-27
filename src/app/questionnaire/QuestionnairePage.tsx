"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import Dropdown from "@/components/ui/Dropdown";
import QuestionnaireStage from "@/app/questionnaire/QuestionnaireStage";
import MainButton from "@/components/ui/MainButton";

const stages = [
  {
    number: 1,
    title: "Основные параметры КТП",
    shortTitle: "Этап 1",
    sections: [
      { number: 1, title: "Тип КТП" },
      { number: 2, title: "Исполнение КТП:" },
      { number: 3, title: "Количество трансформаторов" },
      { number: 4, title: "Тип трансформатора:" },
      { number: 5, title: "Мощность силового трансформатора, кВА:" },
    ],
  },
  {
    number: 2,
    title: "Конфигурация и коммутационные аппараты",
    shortTitle: "Этап 2",
    sections: [
      { number: 6, title: "Схема и группа обмотки:" },
      { number: 7, title: "Класс напряжения по стороне ВН, кВ:" },
      { number: 8, title: "Коммутационные аппараты ВН:" },
      { number: 9, title: "Назначение ячейки:" },
    ],
  },
  {
    number: 3,
    title: "Дополнительные параметры и учет",
    shortTitle: "Этап 3",
    sections: [
      { number: 10, title: "Секционирование по стороне ВН:" },
      { number: 11, title: "Исполнение вводов РУВН:" },
      { number: 12, title: "Учет электроэнергии по РУВН:" },
      { number: 13, title: "Секционирование по РУНН:" },
    ],
  },
  {
    number: 4,
    title: "Коммутационные аппараты и токи фидеров",
    shortTitle: "Этап 4",
    sections: [
      { number: 14, title: "Рубильник, автомат типа" },
      { number: 15, title: "Исполнение" },
      { number: 16, title: "Коммутационные аппараты отходящих линий НН:" },
      { number: 17, title: "Токи фидеров, А:" },
      { number: 18, title: "Количество отходящих линий (на секцию), шт." },
      { number: 19, title: "АВР по РУНН" },
    ],
  },
  {
    number: 5,
    title: "Дополнительные требования и опции",
    shortTitle: "Этап 5",
    sections: [
      { number: 20, title: "Учет электроэнергии по РУНН: На ввод" },
      { number: 21, title: "Учет электроэнергии по РУНН: На ввод" },
      { number: 22, title: "Класс точности трансформатора тока:" },
      { number: 23, title: "Уличное освещение:" },
      { number: 24, title: "Цвет КТП:" },
      { number: 25, title: "Дополнительные требования:" },
    ],
  },
  {
    number: 6,
    title: "Контактная информация",
    shortTitle: "Этап 6",
    sections: [
      { number: 26, title: "Имя" },
      { number: 27, title: "Телефон" },
      { number: 28, title: "Электронная почта" },
      { number: 29, title: "Комментарии или дополнительные пожелания" },
    ],
  },
];

export default function QuestionnairePage() {
  const [activeStage, setActiveStage] = useState(1);
  const [selectedKtpType, setSelectedKtpType] = useState("Блочная (КТПБ)");
  const [selectedImplementation, setSelectedImplementation] =
    useState("Проходная");
  const [wallMaterial, setWallMaterial] = useState("");
  const [selectedTransformerCount, setSelectedTransformerCount] = useState<
    number | null
  >(null);
  const [selectedTransformerType, setSelectedTransformerType] = useState<
    string | null
  >(null);
  const [selectedTransformerPower, setSelectedTransformerPower] = useState<
    number | null
  >(null);
  const [selectedWindingGroup, setSelectedWindingGroup] = useState<
    string | null
  >(null);
  const [selectedVoltageClass, setSelectedVoltageClass] = useState<number>(10);
  const [selectedSwitchgear, setSelectedSwitchgear] = useState<string | null>(
    null
  );
  const [selectedCellPurpose, setSelectedCellPurpose] = useState<string | null>(
    null
  );
  // New state variables for Stage 3
  const [selectedSection10, setSelectedSection10] = useState<string | null>(
    null
  );
  const [selectedSection11, setSelectedSection11] = useState<string | null>(
    null
  );
  const [selectedSection12Radio, setSelectedSection12Radio] = useState<
    string | null
  >(null);
  const [selectedSection12Text, setSelectedSection12Text] =
    useState<string>("");
  const [selectedSection13, setSelectedSection13] = useState<string | null>(
    null
  );
  // New state variables for Stage 4
  const [selectedSection14, setSelectedSection14] = useState<string | null>(
    null
  );
  const [selectedSection15, setSelectedSection15] = useState<string | null>(
    null
  );
  const [selectedSection16, setSelectedSection16] = useState<string | null>(
    null
  );
  const [selectedSection17, setSelectedSection17] = useState<number | null>(
    null
  );
  const [selectedSection18, setSelectedSection18] = useState<string>("");
  const [selectedSection19, setSelectedSection19] = useState<string | null>(
    null
  );

  // New state variables for Stage 5
  const [selectedSection20, setSelectedSection20] = useState<string | null>(
    null
  );
  const [selectedSection21Radio, setSelectedSection21Radio] = useState<
    string | null
  >(null);
  const [selectedSection21Text, setSelectedSection21Text] =
    useState<string>("");
  const [selectedSection22, setSelectedSection22] = useState<string | null>(
    null
  );
  const [selectedSection23, setSelectedSection23] = useState<string | null>(
    null
  );
  const [selectedSection24, setSelectedSection24] = useState<string | null>(
    null
  );
  const [selectedSection25, setSelectedSection25] = useState<string[]>([]);

  // New state variables for Stage 6
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const breadcrumbItems = [
    { label: "Главная", href: "/", current: false },
    { label: "Опросный лист", href: "/questionnaire", current: true },
  ];

  // Function to change stage
  const changeStage = (sectionNumber: number) => {
    setActiveStage(sectionNumber);
  };

  return (
    <main className="text-white pb-24">
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
              {stages.map((stage, stageIndex) => (
                <QuestionnaireStage
                  key={stageIndex}
                  stage={stage}
                  activeStage={activeStage}
                  stageIndex={stageIndex}
                  changeStage={changeStage}
                  totalStages={stages.length}
                />
              ))}
            </div>
          </div>

          {/* Right side: Vertical sliding Dropdowns */}
          <div className="w-full lg:w-1/2 pt-32">
            <div className="">
              {/* Render sections for Этап 1 if activeStage is within 1-5 */}
              {activeStage >= 1 && activeStage <= 5 && (
                <>
                  {/* Accordion 1: Type of KTP */}
                  <Dropdown
                    title="01 · Тип КТП"
                    defaultOpen={activeStage === 1}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            id="ktpType1"
                            name="ktpType"
                            checked={selectedKtpType === "Мачтовая (КТПМ)"}
                            onChange={() =>
                              setSelectedKtpType("Мачтовая (КТПМ)")
                            }
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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
                            onChange={() =>
                              setSelectedKtpType("Киосковая (КТПК)")
                            }
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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
                            onChange={() =>
                              setSelectedKtpType("Блочная (КТПБ)")
                            }
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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
                          className="w-full bg-transparent border border-white/20 rounded p-4 text-white outline-none"
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
                            onChange={() =>
                              setSelectedImplementation("Проходная")
                            }
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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
                            onChange={() =>
                              setSelectedImplementation("Тупиковая")
                            }
                            className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
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

                  {/* Accordion 3: Количество трансформаторов */}
                  <Dropdown
                    title="03 · Количество трансформаторов"
                    defaultOpen={activeStage === 3}
                  >
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((count) => (
                        <div key={count} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`transformerCount${count}`}
                              name="transformerCount"
                              checked={selectedTransformerCount === count}
                              onChange={() =>
                                setSelectedTransformerCount(count)
                              }
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`transformerCount${count}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {count}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 4: Тип трансформатора */}
                  <Dropdown
                    title="04 · Тип трансформатора:"
                    defaultOpen={activeStage === 4}
                  >
                    <div className="space-y-4">
                      {[
                        "ТМГ",
                        "Сухой (воздушнобарьерный)",
                        "Сухой (литой)",
                      ].map((type, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`transformerType${index}`}
                              name="transformerType"
                              checked={selectedTransformerType === type}
                              onChange={() => setSelectedTransformerType(type)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`transformerType${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 5: Мощность силового трансформатора, кВА */}
                  <Dropdown
                    title="05 · Мощность силового трансформатора, кВА:"
                    defaultOpen={activeStage === 5}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        25, 40, 63, 100, 160, 250, 400, 630, 1000, 1250, 1600,
                        2500, 3200,
                      ].map((power) => (
                        <div key={power} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`transformerPower${power}`}
                              name="transformerPower"
                              checked={selectedTransformerPower === power}
                              onChange={() =>
                                setSelectedTransformerPower(power)
                              }
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`transformerPower${power}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {power}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>
                </>
              )}

              {/* Render sections for Этап 2 if activeStage is within 6-9 */}
              {activeStage >= 6 && activeStage <= 9 && (
                <>
                  {/* Accordion 6: Схема и группа обмотки */}
                  <Dropdown
                    title="06 · Схема и группа обмотки:"
                    defaultOpen={activeStage === 6}
                  >
                    <div className="space-y-4">
                      {/* Updated options for section 6 */}
                      {["У/Ун-0", "Д/Ун-11", "У/Zн-11"].map((group) => (
                        <div key={group} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`windingGroup${group}`}
                              name="windingGroup"
                              checked={selectedWindingGroup === group}
                              onChange={() => setSelectedWindingGroup(group)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`windingGroup${group}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {group}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 7: Класс напряжения по стороне ВН, кВ */}
                  <Dropdown
                    title="07 · Класс напряжения по стороне ВН, кВ:"
                    defaultOpen={activeStage === 7}
                  >
                    <div className="space-y-4">
                      {/* Updated options for section 7 */}
                      {[6, 10, 35].map((voltage) => (
                        <div key={voltage} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`voltageClass${voltage}`}
                              name="voltageClass"
                              checked={selectedVoltageClass === voltage}
                              onChange={() => setSelectedVoltageClass(voltage)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`voltageClass${voltage}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {voltage}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 8: Коммутационные аппараты ВН */}
                  <Dropdown
                    title="08 · Коммутационные аппараты ВН:"
                    defaultOpen={activeStage === 8}
                  >
                    <div className="space-y-4">
                      {/* Updated options for section 8 */}
                      {[
                        "ВНА - шт",
                        "РВЗ - шт",
                        "РЛНД - шт",
                        "Моноблок - шт",
                        "ВВ (вакуумный выключатель) - шт",
                        "Нет",
                      ].map((switchgear, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`switchgear${index}`}
                              name="switchgear"
                              checked={selectedSwitchgear === switchgear}
                              onChange={() => setSelectedSwitchgear(switchgear)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`switchgear${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {switchgear}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>
                </>
              )}

              {/* Render sections for Этап 3 if activeStage is within 10-13 */}
              {activeStage >= 10 && activeStage <= 13 && (
                <>
                  {/* Accordion 10: Секционирование по стороне ВН: */}
                  <Dropdown
                    title="10 · Секционирование по стороне ВН:"
                    defaultOpen={activeStage === 10}
                  >
                    <div className="space-y-4">
                      {["Да", "Нет"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section10-${index}`}
                              name="section10"
                              checked={selectedSection10 === option}
                              onChange={() => setSelectedSection10(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section10-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 11: Исполнение вводов РУВН: */}
                  <Dropdown
                    title="11 · Исполнение вводов РУВН:"
                    defaultOpen={activeStage === 11}
                  >
                    <div className="space-y-4">
                      {[
                        "Воздух-Воздух",
                        "Кабель-Кабель",
                        "Кабель-Воздух",
                        "Воздух-Кабель",
                      ].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section11-${index}`}
                              name="section11"
                              checked={selectedSection11 === option}
                              onChange={() => setSelectedSection11(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section11-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 12: Учет электроэнергии по РУВН: */}
                  <Dropdown
                    title="12 · Учет электроэнергии по РУВН:"
                    defaultOpen={activeStage === 12}
                  >
                    <div className="space-y-4">
                      {["Да", "Нет"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section12-${index}`}
                              name="section12Radio"
                              checked={selectedSection12Radio === option}
                              onChange={() => setSelectedSection12Radio(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section12-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}

                      <div className="mt-4">
                        <label className="text-white mb-2 block">
                          Укажите тип счетчика
                        </label>
                        <input
                          type="text"
                          value={selectedSection12Text}
                          onChange={(e) =>
                            setSelectedSection12Text(e.target.value)
                          }
                          placeholder="Введите текст"
                          className="w-full bg-transparent border border-white/20 rounded p-4 text-white outline-none"
                        />
                      </div>
                    </div>
                  </Dropdown>

                  {/* Accordion 13: Секционирование по РУНН: */}
                  <Dropdown
                    title="13 · Секционирование по РУНН:"
                    defaultOpen={activeStage === 13}
                  >
                    <div className="space-y-4">
                      {["Да", "Нет"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section13-${index}`}
                              name="section13"
                              checked={selectedSection13 === option}
                              onChange={() => setSelectedSection13(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section13-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>
                </>
              )}

              {/* Render sections for Этап 4 if activeStage is within 14-19 */}
              {activeStage >= 14 && activeStage <= 19 && (
                <>
                  {/* Accordion 14: Рубильник, автомат типа */}
                  <Dropdown
                    title="14 · Рубильник, автомат типа"
                    defaultOpen={activeStage === 14}
                  >
                    <div className="space-y-4">
                      {["BP", "PE", "BA"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section14-${index}`}
                              name="section14"
                              checked={selectedSection14 === option}
                              onChange={() => setSelectedSection14(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section14-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 15: Исполнение */}
                  <Dropdown
                    title="15 · Исполнение"
                    defaultOpen={activeStage === 15}
                  >
                    <div className="space-y-4">
                      {["Стационарный", "Выкатной"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section15-${index}`}
                              name="section15"
                              checked={selectedSection15 === option}
                              onChange={() => setSelectedSection15(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section15-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 16: Коммутационные аппараты отходящих линий НН: */}
                  <Dropdown
                    title="16 · Коммутационные аппараты отходящих линий НН:"
                    defaultOpen={activeStage === 16}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "РПС",
                        "Контактор",
                        "Тендеп",
                        "КЭАЗ",
                        "Chint",
                        "Akel",
                        "Systeme Electric",
                        "ПВР ARS",
                      ].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section16-${index}`}
                              name="section16"
                              checked={selectedSection16 === option}
                              onChange={() => setSelectedSection16(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section16-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 17: Токи фидеров, А: */}
                  <Dropdown
                    title="17 · Токи фидеров, А:"
                    defaultOpen={activeStage === 17}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        25, 31, 40, 63, 80, 100, 160, 250, 400, 630, 1000, 1600,
                      ].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section17-${index}`}
                              name="section17"
                              checked={selectedSection17 === option}
                              onChange={() => setSelectedSection17(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section17-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 18: Количество отходящих линий (на секцию), шт. */}
                  <Dropdown
                    title="18 · Количество отходящих линий (на секцию), шт."
                    defaultOpen={activeStage === 18}
                  >
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={selectedSection18}
                        onChange={(e) => setSelectedSection18(e.target.value)}
                        placeholder="Введите количество"
                        className="w-full bg-transparent border border-white/20 rounded p-4 text-white outline-none"
                      />
                    </div>
                  </Dropdown>

                  {/* Accordion 19: АВР по РУНН */}
                  <Dropdown
                    title="19 · АВР по РУНН"
                    defaultOpen={activeStage === 19}
                  >
                    <div className="space-y-4">
                      {["Да", "Нет"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section19-${index}`}
                              name="section19"
                              checked={selectedSection19 === option}
                              onChange={() => setSelectedSection19(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section19-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>
                </>
              )}

              {/* Render sections for Этап 5 if activeStage is within 20-25 */}
              {activeStage >= 20 && activeStage <= 25 && (
                <>
                  {/* Accordion 20: Учет электроэнергии по РУНН: На ввод */}
                  <Dropdown
                    title="20 · Учет электроэнергии по РУНН: На ввод"
                    defaultOpen={activeStage === 20}
                  >
                    <div className="space-y-4">
                      {["Нет", "Да"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section20-${index}`}
                              name="section20"
                              checked={selectedSection20 === option}
                              onChange={() => setSelectedSection20(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section20-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 21: Учет электроэнергии по РУНН: На ввод */}
                  <Dropdown
                    title="21 · Учет электроэнергии по РУНН: На ввод"
                    defaultOpen={activeStage === 21}
                  >
                    <div className="space-y-4">
                      {["Нет", "Да"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section21Radio-${index}`}
                              name="section21Radio"
                              checked={selectedSection21Radio === option}
                              onChange={() => setSelectedSection21Radio(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section21Radio-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                      {selectedSection21Radio === "Да" && (
                        <div className="mt-4">
                          <label className="text-white mb-2 block">
                            Укажите тип счетчика:
                          </label>
                          <div className="flex items-center gap-6">
                            {["AP", "A"].map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3"
                              >
                                <div className="relative flex items-center">
                                  <input
                                    type="radio"
                                    id={`section21Text-${index}`}
                                    name="section21Text"
                                    checked={selectedSection21Text === option}
                                    onChange={() =>
                                      setSelectedSection21Text(option)
                                    }
                                    className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                                  />
                                  <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                </div>
                                <label
                                  htmlFor={`section21Text-${index}`}
                                  className="text-white/80 cursor-pointer"
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Dropdown>

                  {/* Accordion 22: Класс точности трансформатора тока: */}
                  <Dropdown
                    title="22 · Класс точности трансформатора тока:"
                    defaultOpen={activeStage === 22}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {["0.5", "0.2s", "0.2", "0.5s"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section22-${index}`}
                              name="section22"
                              checked={selectedSection22 === option}
                              onChange={() => setSelectedSection22(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section22-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 23: Уличное освещение: */}
                  <Dropdown
                    title="23 · Уличное освещение:"
                    defaultOpen={activeStage === 23}
                  >
                    <div className="space-y-4">
                      {["Да", "Нет"].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section23-${index}`}
                              name="section23"
                              checked={selectedSection23 === option}
                              onChange={() => setSelectedSection23(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section23-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 24: Цвет КТП: */}
                  <Dropdown
                    title="24 · Цвет КТП:"
                    defaultOpen={activeStage === 24}
                  >
                    <div className="space-y-4">
                      {[
                        "Типовой (корпус - серый, крыша и двери - синий)",
                        "Другое",
                      ].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              id={`section24-${index}`}
                              name="section24"
                              checked={selectedSection24 === option}
                              onChange={() => setSelectedSection24(option)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
                            />
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                          <label
                            htmlFor={`section24-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>

                  {/* Accordion 25: Дополнительные требования: */}
                  <Dropdown
                    title="25 · Дополнительные требования:"
                    defaultOpen={activeStage === 25}
                  >
                    <div className="space-y-4">
                      {[
                        "Средства пожаротушения",
                        "Система охраны-пожарной сигнализации (ОПС)",
                        "Площадки/лестницы обслуживания, салазки",
                        "Система вентиляции/обогрева/кондиционирования",
                        "Аварийное, рабочее, ремонтное освещение",
                        "Транспортная упаковка",
                        "Расширенная гарантия (до 7 лет)",
                        "Средства индивидуальной защиты (СИЗ)",
                        "Комплект ЗИП",
                        "Молниезащита",
                        "Увеличение мощности трансформатора в будущем",
                      ].map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              id={`section25-${index}`}
                              name="section25"
                              checked={selectedSection25.includes(option)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedSection25([
                                    ...selectedSection25,
                                    option,
                                  ]);
                                } else {
                                  setSelectedSection25(
                                    selectedSection25.filter(
                                      (item) => item !== option
                                    )
                                  );
                                }
                              }}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:bg-white/60 checked:border-transparent outline-none cursor-pointer"
                            />
                            <div className="absolute w-3 h-3 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <svg
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label
                            htmlFor={`section25-${index}`}
                            className="text-white/80 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Dropdown>
                </>
              )}

              {/* Render contact form for Stage 6 */}
              {activeStage >= 26 && activeStage <= 29 && (
                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md p-4 text-white outline-none focus:border-white/30 transition-colors peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-4 text-white/60 text-sm transition-all duration-200
                        peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                        peer-focus:bg-white peer-focus:px-1
                        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm
                        peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-black peer-[&:not(:placeholder-shown)]:px-1"
                    >
                      Имя
                    </label>
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md p-4 text-white outline-none focus:border-white/30 transition-colors peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-4 top-4 text-white/60 text-sm transition-all duration-200
                        peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                        peer-focus:bg-white peer-focus:px-1
                        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm
                        peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-black peer-[&:not(:placeholder-shown)]:px-1"
                    >
                      Телефон
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md p-4 text-white outline-none focus:border-white/30 transition-colors peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-4 text-white/60 text-sm transition-all duration-200
                        peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                        peer-focus:bg-white peer-focus:px-1
                        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm
                        peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-black peer-[&:not(:placeholder-shown)]:px-1"
                    >
                      Электронная почта
                    </label>
                  </div>

                  {/* Comments Textarea */}
                  <div className="relative">
                    <textarea
                      id="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md p-4 text-white outline-none focus:border-white/30 transition-colors min-h-[100px] peer"
                      placeholder=" "
                    ></textarea>
                    <label
                      htmlFor="comments"
                      className="absolute left-4 top-4 text-white/60 text-sm transition-all duration-200
                        peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-black
                        peer-focus:bg-white peer-focus:px-1
                        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm
                        peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-black peer-[&:not(:placeholder-shown)]:px-1"
                    >
                      Комментарии или дополнительные пожелания
                    </label>
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="flex items-center mt-6 gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <label
                      htmlFor="agreeTerms"
                      className="text-white cursor-pointer text-sm"
                    >
                      Я согласен с условиями обработки персональных данных
                    </label>
                  </div>

                  {/* Submit Button */}
                  <MainButton text="Отправить" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CustomContainer>
    </main>
  );
}

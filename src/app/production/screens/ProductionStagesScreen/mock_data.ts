import { IProductionStage } from "./types";

export const productionStages: IProductionStage[] = [
  {
    id: 1,
    number: "01",
    title: "Разработка и оформление КД",
    description:
      "Разработка конструкторской документации в соответствии с ТЗ заказчика, нормами ГОСТ и ЕСКД.",
    image: "/construction_bg.webp",
  },
  {
    id: 2,
    number: "02",
    title: "Раскрой и гибка металла",
    description:
      "Механическая обработка металлических заготовок с помощью лазерной резки и листогибочного пресса.",
    image: "/construction_bg.webp",
  },
  {
    id: 3,
    number: "03",
    title: "Окраска и сборка корпуса КТП",
    description:
      "Сборка корпуса КТП с использованием современного сварочного оборудования и порошковой окраски.",
    image: "/construction_bg.webp",
  },
  {
    id: 4,
    number: "04",
    title: "Монтаж сендвич-панелей",
    description:
      "Установка сэндвич-панелей для обеспечения тепло- и звукоизоляции оборудования.",
    image: "/construction_bg.webp",
  },
  {
    id: 5,
    number: "05",
    title: "Сборка и окраска ячеек",
    description:
      "Изготовление и окраска ячеек РУВН и РУНН с использованием клепки или сварки.",
    image: "/construction_bg.webp",
  },
  {
    id: 6,
    number: "06",
    title: "Монтаж оборудования ячеек",
    description:
      "Установка электротехнических компонентов в ячейки РУВН и РУНН согласно проектной документации.",
    image: "/construction_bg.webp",
  },
  {
    id: 7,
    number: "07",
    title: "Коммутация",
    description:
      "Соединение электрических компонентов, укладка кабелей и монтаж шинопроводов.",
    image: "/construction_bg.webp",
  },
  {
    id: 8,
    number: "08",
    title: "Контроль ОКК",
    description:
      "Проверка сборки, электрические испытания и контроль соответствия документации.",
    image: "/construction_bg.webp",
  },
  {
    id: 9,
    number: "09",
    title: "Подготовка к отгрузке",
    description:
      "Разборка, комплектация и упаковка оборудования с учетом требований безопасности.",
    image: "/construction_bg.webp",
  },
  {
    id: 10,
    number: "10",
    title: "Отгрузка оборудования",
    description:
      "Загрузка оборудования в транспорт с полным пакетом документации для доставки на объект.",
    image: "/construction_bg.webp",
  },
];

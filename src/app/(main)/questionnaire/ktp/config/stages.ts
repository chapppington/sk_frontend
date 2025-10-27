import { IStage } from "@/app/(main)/questionnaire/shared/types";

export const stages: IStage[] = [
  {
    number: 1,
    title: "Основные параметры КТП",
    shortTitle: "Этап 1",
  },
  {
    number: 2,
    title: "Конфигурация и коммутационные аппараты",
    shortTitle: "Этап 2",
  },
  {
    number: 3,
    title: "Дополнительные параметры и учет",
    shortTitle: "Этап 3",
  },
  {
    number: 4,
    title: "Коммутационные аппараты и токи фидеров",
    shortTitle: "Этап 4",
  },
  {
    number: 5,
    title: "Дополнительные требования и опции",
    shortTitle: "Этап 5",
  },
  {
    number: 6,
    title: "Контактная информация",
    shortTitle: "Этап 6",
  },
];

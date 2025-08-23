import { HistoryEvent } from "./types";

export const historyEvents: HistoryEvent[] = [
  {
    id: 1,
    number: "2006",
    title: "Старт в направлении снабжения компаний хозтоварами",
    employees: 2,
    areaM2: 0,
  },
  {
    id: 2,
    number: "2007–2009",
    title: "Переход в энергетическую отрасль, первый государственный заказ",
    employees: 3,
    areaM2: 300,
  },
  {
    id: 3,
    number: "2010–2012",
    title: "Приобретение своего оборудования, первый менеджер по продажам",
    employees: 12,
    areaM2: 360,
  },
  {
    id: 4,
    number: "2013–2019",
    title: "Переход в большую энергетику, разработка фирменного стиля",
    employees: 27,
    areaM2: 870,
  },
  {
    id: 5,
    number: "2020–2023",
    title: "Большое расширение производства, открытие собственного цеха",
    employees: 80,
    employeesHasPlus: true,
    areaM2: 7776,
  },
];

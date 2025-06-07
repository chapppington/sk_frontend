import { IQuestionConfig } from "../types";

export const questionsConfig: IQuestionConfig[] = [
  {
    id: 1,
    title: "01 · Тип КТП",
    options: [
      { value: "mast", label: "Мачтовая (КТПМ)" },
      { value: "block", label: "Блочная (КТПБ)" },
      { value: "kiosk", label: "Киосковая (КТПК)" },
      { value: "indoor", label: "Внутрицеховая" },
      { value: "attached", label: "Пристроенная" },
      { value: "stationary", label: "Стационарная" },
      { value: "mobile", label: "Передвижная" },
    ],
  },
  {
    id: 2,
    title: "02 · Назначение ячейки",
    options: [
      { value: "input", label: "Вводная" },
      { value: "sectional", label: "Секционная" },
      { value: "outgoing", label: "Отходящая" },
    ],
  },
  {
    id: 3,
    title: "03 · Исполнение",
    options: [
      { value: "indoor", label: "Внутреннее" },
      { value: "outdoor", label: "Наружное" },
    ],
  },
  {
    id: 4,
    title: "04 · Количество трансформаторов",
    options: [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
    ],
  },
  {
    id: 5,
    title: "05 · Группа соединения обмоток",
    options: [
      { value: "y_yn_0", label: "Y/Yн-0" },
      { value: "d_yn_11", label: "D/Yн-11" },
    ],
  },
  {
    id: 6,
    title: "06 · Класс напряжения по стороне ВН, кВ",
    options: [
      { value: 6, label: "6" },
      { value: 10, label: "10" },
      { value: 35, label: "35" },
    ],
  },
  {
    id: 7,
    title: "07 · Тип трансформатора",
    options: [
      { value: "two_winding", label: "Двухобмоточный" },
      { value: "three_winding", label: "Трехобмоточный" },
    ],
  },
  {
    id: 8,
    title: "08 · Мощность трансформатора, МВА",
    options: [
      { value: 16, label: "16" },
      { value: 25, label: "25" },
      { value: 40, label: "40" },
      { value: 63, label: "63" },
    ],
  },
  {
    id: 9,
    title: "09 · Секционирование по стороне ВН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 10,
    title: "10 · Секционирование по стороне НН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 11,
    title: "11 · Секционирование по стороне СН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 12,
    title: "12 · Секционирование по стороне ВН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 13,
    title: "13 · Секционирование по стороне НН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 14,
    title: "14 · Секционирование по стороне СН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 15,
    title: "15 · Секционирование по стороне ВН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 16,
    title: "16 · Секционирование по стороне НН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 17,
    title: "17 · Секционирование по стороне СН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 18,
    title: "18 · Секционирование по стороне ВН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 19,
    title: "19 · Секционирование по стороне НН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 20,
    title: "20 · Секционирование по стороне СН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 21,
    title: "21 · Секционирование по стороне ВН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 22,
    title: "22 · Секционирование по стороне НН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 23,
    title: "23 · Секционирование по стороне СН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 24,
    title: "24 · Секционирование по стороне ВН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 25,
    title: "25 · Тип распределительного устройства",
    options: [
      { value: "kru", label: "КРУ" },
      { value: "krun", label: "КРУН" },
      { value: "kso", label: "КСО" },
    ],
  },
];

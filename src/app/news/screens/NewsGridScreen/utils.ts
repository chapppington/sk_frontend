import type { SortOption, MonthMap, QueryParams } from "./types";

export const parseRussianDate = (dateStr: string) => {
  const months: MonthMap = {
    Января: 0,
    Февраля: 1,
    Марта: 2,
    Апреля: 3,
    Мая: 4,
    Июня: 5,
    Июля: 6,
    Августа: 7,
    Сентября: 8,
    Октября: 9,
    Ноября: 10,
    Декабря: 11,
  };

  const [day, month, year] = dateStr.split(" ");
  return new Date(
    parseInt(year),
    months[month as keyof typeof months],
    parseInt(day)
  );
};

export const createQueryString = (
  searchParams: URLSearchParams,
  params: QueryParams
) => {
  const newParams = new URLSearchParams(searchParams.toString());
  Object.entries(params).forEach(([key, value]) => {
    if (value) newParams.set(key, value);
  });
  return newParams.toString();
};

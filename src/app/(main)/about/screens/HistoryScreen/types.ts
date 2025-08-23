export interface HistoryEvent {
  id: number;
  number: string; // period label, e.g. "2007–2009"
  title: string; // short caption
  employees: number; // headcount for the period
  employeesHasPlus?: boolean; // show plus sign after number
  areaM2: number; // production area in square meters
}

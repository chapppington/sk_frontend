import type { INewsItem } from "@/app/(main)/news/screens/FirstScreen/types";

// Mock news data - replace with your actual data source
export const newsItems: INewsItem[] = [
  {
    id: 1,
    category: "Производство",
    title:
      "Новая модель организационной деятельности оказалась чрезвычайно полезной",
    date: "29 Января 2024",
    readTime: "5 минут",
    description:
      "Являясь всего лишь частью общей картины, тщательные исследования конкурентов могут быть описаны максимально подробно.",
    image: "/news_bg.webp",
    slug: "novaya-model-organizatsionnoy-deyatelnosti",
  },
  {
    id: 2,
    category: "Технологии",
    title: "Внедрение современных методов управления производством",
    date: "25 Января 2024",
    readTime: "7 минут",
    description:
      "Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение форм развития.",
    image: "/news_bg2.webp",
    slug: "vnedrenie-sovremennyh-metodov-upravleniya",
  },
  {
    id: 3,
    category: "Инновации",
    title: "Запуск новой производственной линии в Казахстане",
    date: "20 Января 2024",
    readTime: "4 минуты",
    description:
      "Приятно, граждане, наблюдать, как элементы политического процесса призваны к ответу. В целом, конечно, выбранный нами инновационный путь однозначно определяет каждого участника.",
    image: "/news_bg.webp",
    slug: "zapusk-novoy-proizvodstvennoy-linii",
  },
  {
    id: 4,
    category: "Развитие",
    title: "Расширение дилерской сети в регионах России",
    date: "15 Января 2024",
    readTime: "6 минут",
    description:
      "Повседневная практика показывает, что сложившаяся структура организации требует от нас анализа поставленных обществом задач.",
    image: "/news_bg2.webp",
    slug: "rasshirenie-dilerskoy-seti",
  },
];

import { NewsItem, Category } from "./types";

export const sampleNews: NewsItem[] = [
  {
    id: 1,
    title: "Новая линия производства трансформаторов запущена",
    category: "Производство",
    date: "29 Января 2024",
    readTime: "5 минут",
    slug: "novaya-liniya-proizvodstva-transformatorov-zapushchena",
    description:
      "Запущена новая автоматизированная линия производства силовых трансформаторов мощностью до 100 МВА. Внедрение позволит увеличить производственные мощности на 40%.",
  },
  {
    id: 2,
    title: "Инновации в производстве высоковольтного оборудования",
    category: "Технологии",
    date: "28 Января 2024",
    readTime: "3 минуты",
    slug: "innovacii-v-proizvodstve-vysokovoltnyh-oborudovaniy",
    description:
      "Внедрение новых технологий в производство высоковольтного оборудования позволило повысить эффективность и снизить энергопотребление на 25%.",
  },
  {
    id: 3,
    title: "Открытие нового цеха сборки распределительных устройств",
    category: "События",
    date: "27 Января 2024",
    readTime: "4 минуты",
    slug: "otkrytie-novogo-ceha-sborki-raspredelitelnyh-ustroystv",
    description:
      "Завершено строительство нового цеха по сборке комплектных распределительных устройств. Производственная мощность составит 1000 единиц в год.",
  },
  {
    id: 4,
    title: "Интервью с главным инженером завода",
    category: "Интервью",
    date: "26 Января 2024",
    readTime: "7 минут",
    slug: "intervyu-s-glavnym-inzhenerom-zavoda",
    description:
      "О перспективах развития производства, внедрении новых технологий и подготовке кадров рассказывает главный инженер предприятия.",
  },
  {
    id: 5,
    title: "Международная выставка электротехнического оборудования",
    category: "События",
    date: "25 Января 2024",
    readTime: "6 минут",
    slug: "mezhdunarodnaya-vystavka-elektrotehnicheskogo-oborudovaniya",
    description:
      "На выставке представлены новейшие разработки в области производства электротехнического оборудования и автоматизации производственных процессов.",
  },
  {
    id: 6,
    title: "Новые стандарты качества в производстве",
    category: "Производство",
    date: "24 Января 2024",
    readTime: "4 минуты",
    slug: "novye-standarty-kachestva-v-proizvodstve",
    description:
      "Внедрение новых стандартов качества позволило значительно повысить надежность выпускаемой продукции и снизить процент брака.",
  },
  {
    id: 7,
    title: "Эксклюзивное интервью с директором по развитию",
    category: "Интервью",
    date: "23 Января 2024",
    readTime: "8 минут",
    slug: "eksklyuzivnoe-intervyu-s-direktorom-po-razvitiyu",
    description:
      "О стратегии развития предприятия, планах по модернизации производства и выходе на новые рынки рассказывает директор по развитию.",
  },
  {
    id: 8,
    title: "Конкурс молодых специалистов в электротехнической отрасли",
    category: "События",
    date: "22 Января 2024",
    readTime: "5 минут",
    slug: "konkurs-molodyh-specialistov-v-elektrotehnicheskoy-otrasli",
    description:
      "Проведен ежегодный конкурс профессионального мастерства среди молодых специалистов электротехнической отрасли.",
  },
  {
    id: 9,
    title: "Новое оборудование для тестирования электротехнических изделий",
    category: "Технологии",
    date: "21 Января 2024",
    readTime: "4 минуты",
    slug: "novoe-oborudovanie-dlya-testirovaniya-elektrotehnicheskih-izdeliy",
    description:
      "Внедрена новая система тестирования электротехнических изделий, позволяющая повысить точность измерений и сократить время испытаний.",
  },
  {
    id: 10,
    title: "Мастер-класс по сборке электрощитового оборудования",
    category: "События",
    date: "20 Января 2024",
    readTime: "6 минут",
    slug: "master-klass-po-sborke-elektroshchitovogo-oborudovaniya",
    description:
      "Проведен мастер-класс по современным методам сборки и монтажа электрощитового оборудования для специалистов отрасли.",
  },
  {
    id: 11,
    title: "Интервью с разработчиком новых технологий",
    category: "Интервью",
    date: "19 Января 2024",
    readTime: "7 минут",
    slug: "intervyu-s-razrabotchikom-novyh-tehnologiy",
    description:
      "О перспективных разработках в области производства электротехнического оборудования рассказывает ведущий инженер-конструктор.",
  },
  {
    id: 12,
    title: "Открытие нового испытательного центра",
    category: "События",
    date: "18 Января 2024",
    readTime: "5 минут",
    slug: "otkrytie-novogo-ispytatelnogo-centra",
    description:
      "Завершено строительство нового испытательного центра для проведения комплексных испытаний электротехнического оборудования.",
  },
];

export const categories: Category[] = [
  { name: "Все", slug: "all" },
  { name: "Производство", slug: "production" },
  { name: "Технологии", slug: "technology" },
  { name: "События", slug: "events" },
  { name: "Интервью", slug: "interviews" },
];

// Sample data structure
export const productCategories = [
  { id: "all", name: "Вся продукция", slug: "all" },
  {
    id: "kts",
    name: "Комплектные трансформаторные подстанции",
    slug: "komplektnye-transformatornye-podstancii",
  },
  {
    id: "kru",
    name: "Распределительные устройства высокого напряжения 6(10) кВ",
    slug: "raspredelitelnye-ustroystva-vysokogo-napryazheniya-6-10-kv",
  },
  {
    id: "nku",
    name: "Распределительные устройства низкого напряжения 0,4 кВ",
    slug: "raspredelitelnye-ustroystva-nizkogo-napryazheniya-04-kv",
  },
  {
    id: "accounting",
    name: "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
    slug: "punkty-ucheta-i-sekcionirovaniya-vle",
  },
  {
    id: "stations",
    name: "Электростанции и установки",
    slug: "elektrostancii-i-ustanovki",
  },
];

export const products = [
  {
    id: 1,
    title: "Пункт автоматического регулирования напряжения (ПАРН)",
    image: "/transformer.webp",
    category: "kts",
    slug: "2ktpt-25-250-kva",
  },
  {
    id: 2,
    title: "КТП 63..2500 кВА",
    image: "/transformer.webp",
    category: "kts",
    slug: "ktp-63-2500-kva",
  },
  {
    id: 3,
    title: "КТПН 25..250 кВА",
    image: "/transformer.webp",
    category: "kts",
    slug: "ktpn-25-250-kva",
  },
  {
    id: 4,
    title: "НКУ-0,4 кВ",
    image: "/transformer.webp",
    category: "nku",
    slug: "nku-04-kv",
  },
  {
    id: 5,
    title: "НКУ-0,4 кВ с АВР",
    image: "/transformer.webp",
    category: "nku",
    slug: "nku-04-kv-s-avr",
  },
  {
    id: 6,
    title: "НКУ-0,4 кВ с ЧРП",
    image: "/transformer.webp",
    category: "nku",
    slug: "nku-04-kv-s-chrp",
  },
  {
    id: 7,
    title: "УКРМ-0,4 кВ",
    image: "/transformer.webp",
    category: "quality",
    slug: "ukrm-04-kv",
  },
  {
    id: 8,
    title: "УКРМ-6(10) кВ",
    image: "/transformer.webp",
    category: "quality",
    slug: "ukrm-6-10-kv",
  },
  {
    id: 9,
    title: "ПКУ-6(10) кВ",
    image: "/transformer.webp",
    category: "accounting",
    slug: "pku-6-10-kv",
  },
  {
    id: 10,
    title: "ПКУ-35 кВ",
    image: "/transformer.webp",
    category: "accounting",
    slug: "pku-35-kv",
  },
  {
    id: 11,
    title: "ДЭС 10..2000 кВт",
    image: "/transformer.webp",
    category: "stations",
    slug: "des-10-2000-kvt",
  },
  {
    id: 12,
    title: "КРУ-6(10) кВ",
    image: "/transformer.webp",
    category: "kru",
    slug: "kru-6-10-kv",
  },
  {
    id: 13,
    title: "КРУ-35 кВ",
    image: "/transformer.webp",
    category: "kru",
    slug: "kru-35-kv",
  },
];

export const services = [
  {
    id: 1,
    title: "Монтаж и пусконаладка",
    description: "Профессиональный монтаж и настройка оборудования",
    category: "installation",
  },
  {
    id: 2,
    title: "Проектирование",
    description: "Разработка проектной документации и технических решений",
    category: "design",
  },
  {
    id: 3,
    title: "Техническое обслуживание",
    description: "Плановое и аварийное обслуживание оборудования",
    category: "maintenance",
  },
  {
    id: 4,
    title: "Ремонт и модернизация",
    description: "Восстановление и улучшение характеристик оборудования",
    category: "repair",
  },
  {
    id: 5,
    title: "Консультации и обучение",
    description: "Технические консультации и обучение персонала",
    category: "consulting",
  },
  {
    id: 6,
    title: "Аудит энергосистем",
    description: "Комплексный анализ и оптимизация энергосистем",
    category: "audit",
  },
];

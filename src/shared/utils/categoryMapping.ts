export const productCategories = [
  {
    value: "commercial_metering_and_sectionalizing_points",
    label:
      "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
  },
  {
    value: "complete_transformer_substations",
    label: "Комплектные трансформаторные подстанции",
  },
  {
    value: "complete_switchgears",
    label: "Комплектные распределительные устройства",
  },
  {
    value: "low_voltage_complete_devices",
    label: "Низковольтные комплектные устройства",
  },
  {
    value: "power_quality_improvement",
    label: "Улучшение качества электроэнергии",
  },
  {
    value: "power_plants_and_installations",
    label: "Электростанции и установки",
  },
];

// Маппинг для коротких ID категорий из mock_data
export const shortCategoryMap = new Map([
  ["kts", "Комплектные трансформаторные подстанции"],
  ["nku", "Низковольтные комплектные устройства"],
  ["quality", "Улучшение качества электроэнергии"],
  [
    "accounting",
    "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
  ],
  ["stations", "Электростанции и установки"],
  ["kru", "Комплектные распределительные устройства"],
]);

export const categoryLabelMap = new Map(
  productCategories.map((cat) => [cat.value, cat.label])
);

export const getCategoryLabel = (categoryValue: string): string => {
  // Сначала проверяем короткие ID
  const shortLabel = shortCategoryMap.get(categoryValue);
  if (shortLabel) {
    return shortLabel;
  }

  // Затем проверяем полные английские названия
  const fullLabel = categoryLabelMap.get(categoryValue);
  if (fullLabel) {
    return fullLabel;
  }

  // Если ничего не найдено, возвращаем исходное значение
  return categoryValue;
};

import React, { useState, useEffect } from "react";
import { FeederSectionOptionProps, FeederData } from "./types";
import { Tabs, TabContent } from "@/components/ui/Tabs";
import Input from "@/components/ui/Input";
import MainButton from "@/components/ui/MainButton";
import { useLenis } from "lenis/react";

const MAX_FEEDERS_PER_SECTION = 16;

const FeederSectionOption = ({
  value,
  onChange,
  numberOfSections,
}: FeederSectionOptionProps) => {
  const [activeTab, setActiveTab] = useState("section-1");
  const [sectionsData, setSectionsData] = useState<
    Record<string, FeederData[]>
  >({});
  const lenis = useLenis();

  useEffect(() => {
    // Initialize sectionsData based on numberOfSections
    const initialData: Record<string, FeederData[]> = {};
    for (let i = 1; i <= numberOfSections; i++) {
      const sectionKey = `section-${i}`;
      initialData[sectionKey] = value?.[sectionKey] || [
        { current: "", count: "" },
      ];
    }
    setSectionsData(initialData);
  }, [numberOfSections, value]);

  const handleFeederChange = (
    sectionKey: string,
    index: number,
    field: keyof FeederData,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSectionsData = { ...sectionsData };
    newSectionsData[sectionKey][index][field] = e.target.value;
    setSectionsData(newSectionsData);
    onChange(newSectionsData);
  };

  const handleAddFeeder = (sectionKey: string) => {
    if (sectionsData[sectionKey].length >= MAX_FEEDERS_PER_SECTION) {
      return;
    }
    const newSectionsData = { ...sectionsData };
    newSectionsData[sectionKey] = [
      ...newSectionsData[sectionKey],
      { current: "", count: "" },
    ];
    setSectionsData(newSectionsData);
    onChange(newSectionsData);
    // Resize Lenis after adding a feeder
    if (lenis) {
      setTimeout(() => {
        lenis.resize();
      }, 50);
    }
  };

  const handleDeleteFeeder = (sectionKey: string, index: number) => {
    const newSectionsData = { ...sectionsData };
    newSectionsData[sectionKey] = newSectionsData[sectionKey].filter(
      (_, i) => i !== index
    );
    // Ensure there's always at least one feeder
    if (newSectionsData[sectionKey].length === 0) {
      newSectionsData[sectionKey] = [{ current: "", count: "" }];
    }
    setSectionsData(newSectionsData);
    onChange(newSectionsData);
    // Resize Lenis after deleting a feeder
    if (lenis) {
      setTimeout(() => {
        lenis.resize();
      }, 50);
    }
  };

  // Check if question 4 is not filled
  if (!numberOfSections || numberOfSections === 0) {
    return (
      <div className="text-white/60 italic py-4">
        Заполните пункт 4 (Количество силовых трансформаторов)
      </div>
    );
  }

  const tabs = Array.from({ length: numberOfSections }, (_, i) => {
    const sectionKey = `section-${i + 1}`;
    const isMaxFeeders =
      sectionsData[sectionKey]?.length >= MAX_FEEDERS_PER_SECTION;
    return {
      label: `Секция ${i + 1}`,
      value: sectionKey,
      content: (
        <div className="space-y-4 pt-4">
          {sectionsData[sectionKey]?.map((feeder, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="font-semibold">Фидер {index + 1}:</span>
              <Input
                label="А"
                type="text"
                value={feeder.current}
                onChange={(e) =>
                  handleFeederChange(sectionKey, index, "current", e)
                }
                placeholder="0"
                isNumber
              />
              <span>-</span>
              <Input
                label="шт"
                type="text"
                value={feeder.count}
                onChange={(e) =>
                  handleFeederChange(sectionKey, index, "count", e)
                }
                placeholder="0"
                isNumber
              />
              {sectionsData[sectionKey].length > 1 && (
                <button
                  onClick={() => handleDeleteFeeder(sectionKey, index)}
                  className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <MainButton
            text={
              isMaxFeeders ? "Не больше 16 фидеров на секцию" : "Добавить фидер"
            }
            onClick={() => handleAddFeeder(sectionKey)}
            className={`mt-4 ${
              isMaxFeeders ? "opacity-50 cursor-not-allowed" : ""
            }`}
            size="sm"
            disableRedirect
          />
        </div>
      ),
    };
  });

  return (
    <div>
      <Tabs defaultTab={activeTab} onChange={setActiveTab}>
        {tabs.map((tab) => (
          <TabContent key={tab.value} value={tab.value} label={tab.label}>
            {tab.content}
          </TabContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeederSectionOption;

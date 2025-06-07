import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const SwitchgearQuestion = ({ value, onChange }: QuestionProps) => {
  const options = [
    "ВНА - шт",
    "РВЗ - шт",
    "РЛНД - шт",
    "Моноблок - шт",
    "ВВ (вакуумный выключатель) - шт",
    "Нет",
  ];

  return (
    <Dropdown title="08 · Коммутационные аппараты ВН" defaultOpen={true}>
      <div className="space-y-4">
        {options.map((switchgear, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`switchgear${index}`}
                name="switchgear"
                checked={value === switchgear}
                onChange={() => onChange(switchgear)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`switchgear${index}`}
              className="text-white/80 cursor-pointer"
            >
              {switchgear}
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default SwitchgearQuestion;

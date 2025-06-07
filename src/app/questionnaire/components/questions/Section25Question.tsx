import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const Section25Question = ({ value, onChange }: QuestionProps) => {
  const options = [
    "Обогрев",
    "Вентиляция",
    "Освещение",
    "Сигнализация",
    "Противопожарная система",
  ];

  return (
    <Dropdown title="25 · Дополнительные требования" defaultOpen={true}>
      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id={`section25-${index}`}
                name="section25"
                checked={value.includes(option)}
                onChange={() => {
                  const newValue = value.includes(option)
                    ? value.filter((v: string) => v !== option)
                    : [...value, option];
                  onChange(newValue);
                }}
                className="peer appearance-none w-5 h-5 rounded border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`section25-${index}`}
              className="text-white/80 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default Section25Question;

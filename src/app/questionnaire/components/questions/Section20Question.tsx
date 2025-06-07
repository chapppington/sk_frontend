import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const Section20Question = ({ value, onChange }: QuestionProps) => {
  const options = ["Да", "Нет"];

  return (
    <Dropdown
      title="20 · Учет электроэнергии по РУНН: На ввод"
      defaultOpen={true}
    >
      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`section20-${index}`}
                name="section20"
                checked={value === option}
                onChange={() => onChange(option)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`section20-${index}`}
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

export default Section20Question;

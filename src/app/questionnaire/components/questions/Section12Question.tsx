import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const Section12Question = ({ value, onChange }: QuestionProps) => {
  const options = ["Да", "Нет"];

  return (
    <Dropdown title="12 · Секционирование по стороне НН" defaultOpen={true}>
      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`section12-${index}`}
                name="section12"
                checked={value === option}
                onChange={() => onChange(option)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`section12-${index}`}
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

export default Section12Question;

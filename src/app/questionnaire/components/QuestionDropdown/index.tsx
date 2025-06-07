import Dropdown from "@/components/ui/Dropdown";
import { QuestionDropdownProps } from "./types";

const QuestionDropdown = ({
  value,
  onChange,
  title,
  options,
  defaultOpen = true,
  questionId,
}: QuestionDropdownProps) => {
  return (
    <Dropdown title={title} defaultOpen={defaultOpen}>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`option-${questionId}-${option.value}`}
                name={`question-${title}`}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`option-${questionId}-${option.value}`}
              className="text-white/80 cursor-pointer whitespace-nowrap select-none"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default QuestionDropdown;

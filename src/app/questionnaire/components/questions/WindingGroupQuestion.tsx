import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const WindingGroupQuestion = ({ value, onChange }: QuestionProps) => {
  const options = ["У/Ун-0", "Д/Ун-11", "У/Zн-11"];

  return (
    <Dropdown title="06 · Схема и группа обмотки" defaultOpen={true}>
      <div className="space-y-4">
        {options.map((group) => (
          <div key={group} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`windingGroup${group}`}
                name="windingGroup"
                checked={value === group}
                onChange={() => onChange(group)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`windingGroup${group}`}
              className="text-white/80 cursor-pointer"
            >
              {group}
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default WindingGroupQuestion;

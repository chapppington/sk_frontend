import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const CellPurposeQuestion = ({ value, onChange }: QuestionProps) => {
  const options = ["Вводная", "Секционная", "Отходящая"];

  return (
    <Dropdown title="09 · Назначение ячейки" defaultOpen={true}>
      <div className="space-y-4">
        {options.map((purpose, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`cellPurpose${index}`}
                name="cellPurpose"
                checked={value === purpose}
                onChange={() => onChange(purpose)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`cellPurpose${index}`}
              className="text-white/80 cursor-pointer"
            >
              {purpose}
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default CellPurposeQuestion;

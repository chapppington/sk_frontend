import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const VoltageClassQuestion = ({ value, onChange }: QuestionProps) => {
  const options = [6, 10, 35];

  return (
    <Dropdown
      title="07 · Класс напряжения по стороне ВН, кВ"
      defaultOpen={true}
    >
      <div className="space-y-4">
        {options.map((voltage) => (
          <div key={voltage} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`voltageClass${voltage}`}
                name="voltageClass"
                checked={value === voltage}
                onChange={() => onChange(voltage)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`voltageClass${voltage}`}
              className="text-white/80 cursor-pointer"
            >
              {voltage}
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default VoltageClassQuestion;

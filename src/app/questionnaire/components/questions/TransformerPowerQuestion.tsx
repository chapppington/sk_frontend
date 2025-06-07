import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const TransformerPowerQuestion = ({ value, onChange }: QuestionProps) => {
  const options = [
    25, 40, 63, 100, 160, 250, 400, 630, 1000, 1250, 1600, 2500, 3200,
  ];

  return (
    <Dropdown
      title="05 · Мощность силового трансформатора, кВА"
      defaultOpen={true}
    >
      <div className="grid grid-cols-3 gap-4">
        {options.map((power) => (
          <div key={power} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`transformerPower${power}`}
                name="transformerPower"
                checked={value === power}
                onChange={() => onChange(power)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`transformerPower${power}`}
              className="text-white/80 cursor-pointer"
            >
              {power}
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default TransformerPowerQuestion;

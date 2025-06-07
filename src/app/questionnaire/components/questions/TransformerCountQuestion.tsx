import { QuestionProps } from "../../types";
import Dropdown from "@/components/ui/Dropdown";

const TransformerCountQuestion = ({ value, onChange }: QuestionProps) => {
  const options = [1, 2, 3, 4];

  return (
    <Dropdown title="03 · Количество трансформаторов" defaultOpen={true}>
      <div className="space-y-4">
        {options.map((count) => (
          <div key={count} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="radio"
                id={`transformerCount${count}`}
                name="transformerCount"
                checked={value === count}
                onChange={() => onChange(count)}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <label
              htmlFor={`transformerCount${count}`}
              className="text-white/80 cursor-pointer"
            >
              {count}
            </label>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default TransformerCountQuestion;

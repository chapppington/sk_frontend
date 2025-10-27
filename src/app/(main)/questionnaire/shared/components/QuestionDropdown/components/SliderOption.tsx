import { IQuestionOption } from "@/app/(main)/questionnaire/shared/types";

interface SliderOptionProps {
  options: IQuestionOption[];
  value: string | number | string[];
  onChange: (value: string | number | string[]) => void;
  questionId: number;
}

const SliderOption = ({
  options,
  value,
  onChange,
  questionId,
}: SliderOptionProps) => {
  const minSliderIndex = 0;
  const maxSliderIndex = options.length - 1;
  const currentOptionIndex = options.findIndex(
    (option) => option.value === value
  );
  const sliderInputIndex = currentOptionIndex !== -1 ? currentOptionIndex : 0;
  const percentage =
    maxSliderIndex > 0 ? (sliderInputIndex / maxSliderIndex) * 100 : 0;

  return (
    <div className="flex flex-col gap-4 px-2">
      <input
        type="range"
        min={minSliderIndex}
        max={maxSliderIndex}
        value={sliderInputIndex}
        onChange={(e) => {
          const newIndex = Number(e.target.value);
          const roundedIndex = Math.max(
            minSliderIndex,
            Math.min(maxSliderIndex, Math.round(newIndex))
          );
          const selectedOptionValue = options[roundedIndex].value;
          onChange(selectedOptionValue);
        }}
        step={1}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right,rgba(255, 255, 255, 0.5) ${percentage}%, rgba(255, 255, 255, 0.2) ${percentage}%)`,
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
        }
      `}</style>
      <div className="flex justify-between w-full text-white/80">
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`option-${questionId}-${option.value}`}
          >
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SliderOption;

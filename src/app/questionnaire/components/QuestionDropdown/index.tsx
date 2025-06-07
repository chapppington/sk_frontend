import Dropdown from "@/components/ui/Dropdown";
import { QuestionDropdownProps } from "./types";

const QuestionDropdown = ({
  value,
  onChange,
  title,
  options,
  defaultOpen = true,
  questionId,
  popoverContent,
  type,
}: QuestionDropdownProps) => {
  const isSlider = type === "slider";

  // New slider logic based on indices
  const minSliderIndex = 0;
  const maxSliderIndex = options.length - 1;

  // Find the index of the current actual value
  const currentOptionIndex = options.findIndex(
    (option) => option.value === value
  );
  // Default to 0 if the value is not found (shouldn't happen if value is always one of the options)
  const sliderInputIndex = currentOptionIndex !== -1 ? currentOptionIndex : 0;

  // Calculate percentage for slider fill (based on index)
  // Ensure maxSliderIndex is not 0 to prevent division by zero for single option
  const percentage =
    maxSliderIndex > 0 ? (sliderInputIndex / maxSliderIndex) * 100 : 0; // If only one option, percentage is 0

  return (
    <Dropdown
      title={title}
      defaultOpen={defaultOpen}
      showInfoIcon={!!popoverContent}
      popoverContent={popoverContent}
    >
      {isSlider ? (
        <div className="flex flex-col gap-4 px-2">
          <input
            type="range"
            min={minSliderIndex} // Use index as min
            max={maxSliderIndex} // Use index as max
            value={sliderInputIndex} // Slider input value is the index
            onChange={(e) => {
              const newIndex = Number(e.target.value);
              // Round to nearest integer index and clamp within bounds
              const roundedIndex = Math.max(
                minSliderIndex,
                Math.min(maxSliderIndex, Math.round(newIndex))
              );
              // Get the actual option value from the options array using the rounded index
              const selectedOptionValue = options[roundedIndex].value;
              onChange(selectedOptionValue); // Call parent onChange with actual value
            }}
            step={1} // Step by 1 for indices
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
      ) : (
        <div className="flex flex-wrap gap-4">
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              {option.type === "text" ? (
                <>
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
                  {value === option.value && option.textLabel && (
                    <input
                      type="text"
                      placeholder={option.textLabel}
                      className="ml-2 p-2 rounded bg-white/10 text-white/80 border border-white/30 focus:outline-none focus:border-white/60"
                    />
                  )}
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </Dropdown>
  );
};

export default QuestionDropdown;

import { IQuestionOption } from "@/app/(main)/questionnaire/shared/types";
import Input from "@/components/ui/Input";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

interface RadioOptionProps {
  options: IQuestionOption[];
  value: string | number | string[];
  onChange: (value: string | number | string[]) => void;
  questionId: number;
  title: string;
}

const RadioOption = ({
  options,
  value,
  onChange,
  questionId,
  title,
}: RadioOptionProps) => {
  const lenis = useLenis();

  // Find the currently selected top-level option or its parent if nested
  const selectedOption = options.find((option) => {
    if (option.value === value) {
      return true; // Direct match
    }
    if (
      Array.isArray(option.nestedOptions) &&
      option.nestedOptions.some((nested) => nested.value === value)
    ) {
      return true; // Value is in nested options
    }
    return false;
  });

  // Trigger Lenis resize when nested options change
  useEffect(() => {
    if (lenis) {
      // Small delay to allow the nested options to render completely
      setTimeout(() => {
        lenis.resize();
      }, 50);
    }
  }, [selectedOption, lenis]);

  return (
    <div>
      <div
        className={`${
          options.length === 2 || options.length === 3
            ? "flex gap-8"
            : `grid gap-x-4 gap-y-4 ${
                options.length > 8
                  ? "grid-cols-3"
                  : "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
              }`
        }`}
      >
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`option-${questionId}-${option.value}`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <RadioButton
              option={option}
              value={value}
              onChange={onChange}
              questionId={questionId}
              title={title}
              isChecked={
                option.value === value ||
                (Array.isArray(option.nestedOptions) &&
                  option.nestedOptions.some((nested) => nested.value === value))
              }
              radioGroupName={`question-${questionId}`}
            />
            <span className="text-white/80 whitespace-nowrap select-none">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {selectedOption && (
        <>
          {Array.isArray(selectedOption.nestedOptions) &&
          selectedOption.nestedOptions.length > 0 ? (
            <div className="mt-6">
              <div className="ml-4">
                {selectedOption.textLabel && (
                  <p className="text-white/80 text-sm mb-2">
                    {selectedOption.textLabel}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {selectedOption.nestedOptions.map((nestedOption) => (
                    <label
                      key={nestedOption.value}
                      htmlFor={`option-${questionId}-${nestedOption.value}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <RadioButton
                        option={nestedOption}
                        value={value}
                        onChange={(newValue) => onChange(newValue)}
                        questionId={questionId}
                        title={title}
                        isChecked={value === nestedOption.value}
                        radioGroupName={`question-${questionId}-nested`}
                      />
                      <span className="text-white/80 whitespace-nowrap select-none">
                        {nestedOption.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : selectedOption.textLabel ? (
            <div className="mt-6">
              <Input
                type="text"
                label={selectedOption.textLabel}
                className="mt-2"
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

interface RadioButtonProps {
  option: IQuestionOption;
  value: string | number | string[];
  onChange: (value: string | number | string[]) => void;
  questionId: number;
  title: string;
  isChecked: boolean; // New prop to explicitly control checked state
  radioGroupName: string; // New prop to explicitly control the radio group name
}

const RadioButton = ({
  option,
  onChange,
  questionId,
  isChecked, // Use this prop
  radioGroupName, // Use this prop
}: RadioButtonProps) => (
  <div className="relative flex items-center">
    <input
      type="radio"
      id={`option-${questionId}-${option.value}`}
      name={radioGroupName} // Use the new prop here
      checked={isChecked}
      onChange={() => onChange(option.value)}
      className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none"
    />
    <div className="absolute w-2.5 h-2.5 rounded-full bg-white/100 opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
  </div>
);

export default RadioOption;

import { IQuestionOption } from "@/app/(main)/questionnaire/shared/types";

interface CheckboxOptionProps {
  options: IQuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
  questionId: number;
  title: string;
}

const CheckIcon = () => (
  <svg
    width="14"
    height="8"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.4585 2.99993L3.81683 5.35827L8.54183 0.641602"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const CheckboxOption = ({
  options,
  value,
  onChange,
  questionId,
  title,
}: CheckboxOptionProps) => {
  const handleCheckboxChange = (optionValue: string | number) => {
    const stringValue = String(optionValue);
    if (value.includes(stringValue)) {
      onChange(value.filter((val) => val !== stringValue));
    } else {
      onChange([...value, stringValue]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="checkbox"
              id={`option-${questionId}-${option.value}`}
              name={`question-${title}`}
              checked={value.includes(String(option.value))}
              onChange={() => handleCheckboxChange(option.value)}
              className="peer appearance-none w-5 h-5 rounded border-2 border-white/60 outline-none cursor-pointer"
            />
            {value.includes(String(option.value)) && (
              <div className="absolute left-1/2 top-1/4 -translate-x-1/2 pointer-events-none flex items-center justify-center">
                <CheckIcon />
              </div>
            )}
          </div>
          <label
            htmlFor={`option-${questionId}-${option.value}`}
            className="text-white/80 cursor-pointer select-none"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxOption;

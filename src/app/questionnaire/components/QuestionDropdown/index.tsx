import Dropdown from "@/components/ui/Dropdown";
import { QuestionDropdownProps } from "./types";
import SliderOption from "./components/SliderOption";
import RadioOption from "./components/RadioOption";
import CheckboxOption from "./components/CheckboxOption";
import Input from "@/components/ui/Input";

const QuestionDropdown = ({
  value,
  onChange,
  title,
  options,
  defaultOpen = true,
  questionId,
  popoverContent,
  type,
  textLabel,
}: QuestionDropdownProps) => {
  return (
    <Dropdown
      title={title}
      defaultOpen={defaultOpen}
      showInfoIcon={!!popoverContent}
      popoverContent={popoverContent}
    >
      {type === "slider" ? (
        <SliderOption
          options={options}
          value={value}
          onChange={onChange}
          questionId={questionId}
        />
      ) : type === "text" ? (
        <Input
          label={textLabel || title}
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "multiple_choice" ? (
        <CheckboxOption
          options={options}
          value={value as string[]}
          onChange={onChange as (value: string[]) => void}
          questionId={questionId}
          title={title}
        />
      ) : (
        <RadioOption
          options={options}
          value={value}
          onChange={onChange}
          questionId={questionId}
          title={title}
        />
      )}
    </Dropdown>
  );
};

export default QuestionDropdown;

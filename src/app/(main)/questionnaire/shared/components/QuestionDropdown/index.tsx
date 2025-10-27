import Dropdown from "@/components/ui/Dropdown";
import { QuestionDropdownProps } from "./types";
import SliderOption from "./components/SliderOption";
import RadioOption from "./components/RadioOption";
import CheckboxOption from "./components/CheckboxOption";
import Input from "@/components/ui/Input";
import FeederSectionOption from "./components/FeederSectionOption";
import { FeederData } from "./components/FeederSectionOption/types";

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
  numberOfSections,
}: QuestionDropdownProps) => {
  return (
    <Dropdown
      title={title}
      defaultOpen={defaultOpen}
      showInfoIcon={!!popoverContent}
      popoverContent={popoverContent}
      alwaysOpenOnMobile={true}
      hidePlusButton={true}
      infoIconColor="white"
      infoIconSide="left"
    >
      {type === "slider" ? (
        <SliderOption
          options={options || []}
          value={value as string | number | string[]}
          onChange={onChange as (value: string | number | string[]) => void}
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
          options={options || []}
          value={value as string[]}
          onChange={onChange as (value: string[]) => void}
          questionId={questionId}
          title={title}
        />
      ) : type === "feeder_sections" ? (
        <FeederSectionOption
          value={(value as Record<string, FeederData[]>) || {}}
          onChange={onChange as (value: Record<string, FeederData[]>) => void}
          questionId={questionId}
          numberOfSections={numberOfSections || 0}
        />
      ) : (
        <RadioOption
          options={options || []}
          value={value as string | number | string[]}
          onChange={onChange as (value: string | number | string[]) => void}
          questionId={questionId}
          title={title}
        />
      )}
    </Dropdown>
  );
};

export default QuestionDropdown;

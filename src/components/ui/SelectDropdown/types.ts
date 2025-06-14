export interface SelectDropdownProps {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  icon?: React.ReactNode;
}

import { ReactNode } from "react";

export interface IDropdownProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

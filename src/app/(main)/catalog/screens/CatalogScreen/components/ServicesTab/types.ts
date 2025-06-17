import { RefObject } from "react";

export interface ServicesTabProps {
  servicesGridRef: RefObject<HTMLDivElement | null>;
  noResultsRef: RefObject<HTMLDivElement | null>;
}

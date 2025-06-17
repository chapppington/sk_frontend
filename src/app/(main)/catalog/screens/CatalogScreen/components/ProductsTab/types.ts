import { RefObject } from "react";

export interface ProductsTabProps {
  productsGridRef: RefObject<HTMLDivElement | null>;
  paginationRef: RefObject<HTMLDivElement | null>;
  noResultsRef: RefObject<HTMLDivElement | null>;
}

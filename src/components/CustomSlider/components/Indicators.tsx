import { RefObject } from "react";

interface IndicatorsProps {
  indicatorsRef: RefObject<HTMLDivElement | null>;
  showIndicators: boolean;
}

export const Indicators = ({
  indicatorsRef,
  showIndicators,
}: IndicatorsProps) => {
  if (!showIndicators) return null;

  return (
    <div className="flex-1 relative hidden sm:block">
      <div
        ref={indicatorsRef}
        className="flex items-center justify-between w-full"
      />
    </div>
  );
};

import { NavigationButton } from "../NavigationButton";
import { Indicators } from "../Indicators";
import { NavigationControlsProps } from "./types";

export const NavigationControls = ({
  sliderId,
  indicatorsRef,
  showIndicators,
  navigationClassName = "",
}: NavigationControlsProps) => {
  return (
    <div className={`flex items-center mt-8 ${navigationClassName}`}>
      {/* Previous and Next navigation buttons */}
      <div className="flex items-center space-x-3 mr-8">
        <NavigationButton direction="prev" sliderId={sliderId} />
        <NavigationButton direction="next" sliderId={sliderId} />
      </div>

      {/* Progress indicators */}
      <Indicators
        indicatorsRef={indicatorsRef}
        showIndicators={showIndicators}
      />
    </div>
  );
};

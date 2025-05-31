import { FC } from "react";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/AnimatedText";
import { ISectionHeaderProps } from "@/components/SectionHeader/types";

const SectionHeader: FC<ISectionHeaderProps> = ({
  bracketsText,
  heading,
  description,
  desktopOrder = {
    bracketsText: 1,
    heading: 2,
    description: 3,
  },
}) => {
  // Create an array of elements with their order
  const desktopElements = [
    {
      element: (
        <AnimatedText key="brackets" delay={0} triggerStart="top 90%">
          <BracketsText className="text-white/60 md:w-full lg:w-auto">
            {bracketsText.toUpperCase()}
          </BracketsText>
        </AnimatedText>
      ),
      order: desktopOrder.bracketsText,
    },
    {
      element: (
        <AnimatedText key="heading" delay={0}>
          <GradientHeading>{heading}</GradientHeading>
        </AnimatedText>
      ),
      order: desktopOrder.heading,
    },
    {
      element: (
        <AnimatedText key="description" delay={0}>
          <p className="text-white/60 max-w-md text-left md:w-full lg:w-auto lg:max-w-md">
            {description}
          </p>
        </AnimatedText>
      ),
      order: desktopOrder.description,
    },
  ];

  // Sort elements based on their order
  const sortedDesktopElements = desktopElements.sort(
    (a, b) => a.order - b.order
  );

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-start mb-12 flex-wrap gap-y-6">
        {sortedDesktopElements.map((item) => item.element)}
      </div>

      {/* Mobile Header */}
      <div className="md:hidden mb-8">
        <AnimatedText delay={0}>
          <BracketsText className="text-white/60 mb-2">
            {bracketsText.toUpperCase()}
          </BracketsText>
        </AnimatedText>
        <AnimatedText delay={0} triggerStart="top 90%">
          <GradientHeading className="text-3xl mt-3">{heading}</GradientHeading>
        </AnimatedText>
        <AnimatedText delay={0} triggerStart="top 90%">
          <p className="text-white/60 max-w-md text-left mt-5">{description}</p>
        </AnimatedText>
      </div>
    </>
  );
};

export default SectionHeader;

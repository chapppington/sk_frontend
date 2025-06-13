import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import BottomInfoWithIcon from "./BottomInfoWithIcon/BottomInfoWithIcon";
import AdvantagesList from "./AdvantagesList/AdvantagesList";

const AdvantagesScreen: FC = () => {
  return (
    <section id="our_advantages_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        {/* Section Title */}
        <div className="mb-16">
          <BracketsText>ПРЕИМУЩЕСТВА</BracketsText>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 relative lg:min-h-[500px]">
          {/* Right Column - Heading */}
          <div className="lg:w-1/2 relative z-10 flex flex-col justify-between lg:min-h-[500px] order-first lg:order-last">
            {/* Heading */}
            <GradientHeading>
              Преимущества работы в СибКомплект: развитие, стабильность и
              инновации
            </GradientHeading>

            {/* Bottom info with icon */}
            <BottomInfoWithIcon />
          </div>

          {/* Left Column - Advantages List */}
          <AdvantagesList />
        </div>
      </CustomContainer>
    </section>
  );
};

export default AdvantagesScreen;

"use client";

import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import BracketsText from "@/components/ui/BracketsText";
import { IPortfolioItem } from "../../types";

interface TasksScreenProps {
  portfolio: IPortfolioItem;
}

export default function TasksScreen({ portfolio }: TasksScreenProps) {
  return (
    <section className="bg-transparent py-24 relative">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <BracketsText className="text-white/60 mb-8">ЗАДАЧИ</BracketsText>
          </div>

          {/* Main Content */}
          <div className="container mx-auto relative">
            <div className="flex flex-col mx-auto">
              <div className="pl-0">
                {/* Heading and Description */}
                <GradientHeading>{portfolio.taskTitle}</GradientHeading>
                <p className="text-white/60 text-base my-12">
                  {portfolio.taskDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
}

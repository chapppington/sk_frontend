"use client";

import { useState, useRef, FC } from "react";
import { useLenis } from "lenis/react";
import { IProduct } from "@/shared/types/product.types";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import { Tabs, TabContent } from "@/components/ui/Tabs";

import {
  useLeftContentAnimation,
  useRightContentAnimation,
} from "./hooks/useAnimations";
import DownloadButton from "./components/DownloadButton";
import DescriptionList from "./components/DescriptionList";
import CharacteristicsGrid from "./components/CharacteristicsGrid";

interface TabsSectionProps {
  product: IProduct;
}

const TabsSection: FC<TabsSectionProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  const rightContentRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<(HTMLLIElement | HTMLDivElement)[]>([]);
  const lenis = useLenis();

  useLeftContentAnimation(leftContentRef);
  useRightContentAnimation(rightContentRef, listItemsRef, activeTab, lenis);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const LeftContent = () => (
    <div ref={leftContentRef}>
      <GradientHeading className="mb-6">{product.name}</GradientHeading>

      <p className="text-white/70 text-lg">{product.description}</p>

      <div className="mt-8">
        <DownloadButton documentation={product.documentation} />
      </div>
    </div>
  );

  return (
    <CustomContainer className="py-24">
      <div className="text-white rounded-2xl overflow-hidden">
        <div className="py-6">
          <Tabs size="lg" defaultTab="description" onChange={handleTabChange}>
            <TabContent value="description" label="Описание">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                <LeftContent />

                <DescriptionList
                  items={product.simpleDescription.items}
                  listItemsRef={listItemsRef}
                  rightContentRef={rightContentRef}
                />
              </div>
            </TabContent>
            <TabContent value="characteristics" label="Характеристики">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                <LeftContent />

                <CharacteristicsGrid
                  items={product.detailedDescription.items}
                  listItemsRef={listItemsRef}
                  rightContentRef={rightContentRef}
                />
              </div>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </CustomContainer>
  );
};

export default TabsSection;

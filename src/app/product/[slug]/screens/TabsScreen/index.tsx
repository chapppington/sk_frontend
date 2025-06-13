"use client";

import { useState, useRef, FC } from "react";
import { useLenis } from "lenis/react";

import AnimatedText from "@/components/ui/AnimatedText";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import { Tabs, TabContent } from "@/components/ui/Tabs";
import { mockTabData } from "./mock_data";

import {
  useLeftContentAnimation,
  useRightContentAnimation,
} from "./hooks/useAnimations";
import DownloadButton from "./components/DownloadButton";
import DescriptionList from "./components/DescriptionList";
import CharacteristicsGrid from "./components/CharacteristicsGrid";

const TabsSection: FC = () => {
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
      <AnimatedText delay={0}>
        <GradientHeading className="mb-6">
          Пункт автоматического регулирования напряжения (ПАРН)
        </GradientHeading>
      </AnimatedText>
      <AnimatedText delay={0}>
        <p className="text-white/70 text-lg">
          — это устройство, предназначенное для обеспечения стабильного и
          безопасного уровня напряжения в электрических сетях.
        </p>
      </AnimatedText>
      <AnimatedText delay={0}>
        <div className="mt-8">
          <DownloadButton />
        </div>
      </AnimatedText>
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
                  items={mockTabData.description.items}
                  listItemsRef={listItemsRef}
                  rightContentRef={rightContentRef}
                />
              </div>
            </TabContent>
            <TabContent value="characteristics" label="Характеристики">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                <LeftContent />

                <CharacteristicsGrid
                  items={mockTabData.characteristics.items}
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

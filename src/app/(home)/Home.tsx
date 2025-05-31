"use client";

import { useEffect } from "react";

import FirstScreen from "@/app/(home)/modules/FirstScreen";
import Mission from "@/app/(home)/modules/MissionScreen";
import ProductsSlider from "@/app/(home)/modules/ProductsScreen";
import ScrollingTextSection from "@/app/(home)/modules/ScrollingTextScreen";
import PortfolioSection from "@/app/(home)/modules/PortfolioScreen";
import CustomerReviewsScreen from "@/app/(home)/modules/CustomerReviewsScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
import { useCameraContext } from "@/components/3DScene/features/CameraContext";
import { SectionObserver } from "@/components/3DScene/features/SectionObserver";

export default function Home() {
  const { setTotalSections } = useCameraContext();

  useEffect(() => {
    try {
      console.log("Setting total sections to 7");
      setTotalSections(7);
    } catch (error) {
      console.error("Error setting total sections:", error);
    }
  }, [setTotalSections]);

  if (!setTotalSections) {
    console.error("CameraContext not properly initialized");
    return <div>Loading...</div>;
  }

  return (
    <main>
      <SectionObserver index={0}>
        <FirstScreen />
      </SectionObserver>
      <SectionObserver index={1}>
        <ScrollingTextSection />
      </SectionObserver>
      <SectionObserver index={2}>
        <Mission />
      </SectionObserver>
      <SectionObserver index={3}>
        <ProductsSlider />
      </SectionObserver>
      <SectionObserver index={4}>
        <PortfolioSection />
      </SectionObserver>
      <SectionObserver index={5}>
        <CustomerReviewsScreen />
      </SectionObserver>
      <SectionObserver index={6}>
        <ContactUsScreen />
      </SectionObserver>
    </main>
  );
}

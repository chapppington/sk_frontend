"use client";
import FirstScreen from "./FirstScreen";
import Mission from "./Mission";
import { useEffect } from "react";
import ProductsSlider from "./ProductsSlider";
import ScrollingTextSection from "./ScrollingTextSection";
import PortfolioSection from "./PortfolioSection";
import CustomerReviews from "./CustomerReviews";
import ContactUsSection from "@/components/sections/ContactUsSection";
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
    <main className="pointer-events-none">
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
        <CustomerReviews />
      </SectionObserver>
      <SectionObserver index={6}>
        <ContactUsSection />
      </SectionObserver>
    </main>
  );
}

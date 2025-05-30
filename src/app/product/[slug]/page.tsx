import { Metadata, ResolvingMetadata } from "next";

import FirstScreen from "@/app/product/[slug]/modules/FirstScreen";
import InfoScreen from "@/app/product/[slug]/modules/InfoScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
import LogoGrid from "@/app/product/[slug]/modules/LogoGridScreen";
import NumbersSection from "@/app/product/[slug]/modules/NumbersScreen";
import SliderSection from "@/app/product/[slug]/modules/SliderScreen";
import TabsSection from "@/app/product/[slug]/modules/TabsScreen";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // In a real application, you would fetch the product data here
  // and use it to generate dynamic metadata
  const { slug } = await params;

  return {
    title: `Product ${slug} | Your Company Name`,
    description: "Detailed product information and specifications",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <FirstScreen />
      <InfoScreen />
      <TabsSection />
      <SliderSection />
      <NumbersSection />
      <LogoGrid />
      <ContactUsScreen />
    </main>
  );
} 

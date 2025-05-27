import { Metadata, ResolvingMetadata } from "next";
import FirstScreen from "./FirstScreen";
import InfoScreen from "./InfoScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
import LogoGrid from "./LogoGridScreen";
import NumbersSection from "./NumbersSection";
import SliderSection from "./SliderSection";
import TabsSection from "./TabsSection";

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
} /* Come for a coffee, w */

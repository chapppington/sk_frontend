import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";

import FirstScreen from "@/app/product/[slug]/modules/FirstScreen";

const InfoScreen = dynamic(
  () => import("@/app/product/[slug]/modules/InfoScreen")
);
const LogoGrid = dynamic(
  () => import("@/app/product/[slug]/modules/LogoGridScreen")
);
const NumbersSection = dynamic(
  () => import("@/app/product/[slug]/modules/NumbersScreen")
);
const SliderSection = dynamic(
  () => import("@/app/product/[slug]/modules/SliderScreen")
);
const TabsSection = dynamic(
  () => import("@/app/product/[slug]/modules/TabsScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

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

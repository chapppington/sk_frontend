import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";

import FirstScreen from "@/app/(main)/product/[slug]/screens/FirstScreen";
const InfoScreen = dynamic(
  () => import("@/app/(main)/product/[slug]/screens/InfoScreen")
);
const LogoGrid = dynamic(
  () => import("@/app/(main)/product/[slug]/screens/LogoGridScreen")
);
const NumbersScreen = dynamic(
  () => import("@/app/(main)/product/[slug]/screens/NumbersScreen")
);
const SliderScreen = dynamic(
  () => import("@/app/(main)/product/[slug]/screens/SliderScreen")
);
const TabsScreen = dynamic(
  () => import("@/app/(main)/product/[slug]/screens/TabsScreen")
);
const QuestionnaireButtonsScreen = dynamic(
  () => import("@/app/(main)/product/[slug]/screens/QuestionnaireButtonsScreen")
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
      <TabsScreen />
      <QuestionnaireButtonsScreen />
      <SliderScreen />
      <NumbersScreen />
      <LogoGrid />
      <ContactUsScreen />
    </main>
  );
}

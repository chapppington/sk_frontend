"use client";

import { useQuery } from "@tanstack/react-query";
import FirstScreen from "@/app/(main)/product/[slug]/screens/FirstScreen";
import dynamic from "next/dynamic";
import productService from "@/services/product.service";
import { IProduct } from "@/shared/types/product.types";

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

interface Props {
  slug: string;
}

const ProductDetails = ({ slug }: Props) => {
  const { data: product, isLoading } = useQuery<IProduct>({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await productService.fetchBySlug(slug);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main>
      <FirstScreen product={product} />
      <InfoScreen product={product} />
      <TabsScreen product={product} />
      <QuestionnaireButtonsScreen product={product} />
      <SliderScreen product={product} />
      <NumbersScreen product={product} />
      <LogoGrid product={product} />
      <ContactUsScreen />
    </main>
  );
};

export default ProductDetails;

"use client";

import { PagesConfig } from "@/config/pages.config";
import { IProduct } from "@/shared/types/product.types";
import { BACKEND_MAIN } from "@/constants";
import { getCategoryLabel } from "@/shared/utils/categoryMapping";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import MainButton from "@/components/ui/MainButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import dynamic from "next/dynamic";

const ProductScene = dynamic(() => import("@/components/productCard3D/main"), {
  ssr: false,
});

interface FirstScreenProps {
  product: IProduct;
}

const FirstScreen = ({ product }: FirstScreenProps) => {
  const categoryLabel = getCategoryLabel(product.category);

  return (
    <header className="flex flex-col justify-between pb-12 md:pb-24">
      {/* Main Content */}
      <CustomContainer className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <ProductScene modelUrl={product.model_3d_url} />
        </div>
        <div className="w-full lg:w-1/2">
          <Breadcrumbs
            className="pb-8 md:pb-16"
            disableContainer
            items={[
              { label: "Главная", href: "/", current: false },
              { label: "Каталог", href: "/catalog", current: false },
              {
                label: categoryLabel,
                href: `/catalog/${product.category.toLowerCase()}`,
                current: false,
              },
            ]}
          />
          <span className="text-white/80 text-base md:text-lg max-w-2xl mb-4 md:mb-6 block">
            {categoryLabel}
          </span>
          <GradientHeading
            className="mb-4 md:mb-8 text-2xl md:text-3xl lg:text-4xl"
            level={1}
          >
            {product.name}
          </GradientHeading>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mb-6 md:mb-10">
            {product.description}
          </p>
          <div className="mb-6 flex flex-col gap-4 md:gap-6 w-full max-w-2xl">
            {product.importantCharacteristics.map((stat, index) => (
              <div key={index} className="text-white text-base md:text-lg">
                <span className="flex-1">{stat.description}:</span>
                <span className="ml-2 md:ml-4 font-light">
                  {stat.value}{" "}
                  <span className="font-normal">{stat.unit?.text || ""}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <MainButton text="Узнать конечную стоимость" />
            <SecondaryButton
              href={PagesConfig.catalog.href}
              text="Назад в каталог"
              className="ml-8 mt-5"
            />
          </div>
        </div>
      </CustomContainer>
    </header>
  );
};

export default FirstScreen;

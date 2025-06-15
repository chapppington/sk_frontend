import Image from "next/image";
import { FC } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import CircleIconButton from "@/components/ui/CircleIconButton";
import { ProductCardProps } from "./types";

const ProductCard: FC<ProductCardProps> = ({ id, slug, title, image }) => {
  return (
    <div className="flex flex-col group">
      <TransitionLink href={`/product/${slug}`} className="block">
        <div className="bg-white rounded-xl overflow-hidden mb-4">
          <Image
            width={300}
            height={300}
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-white text-lg transition-colors duration-300 group-hover:text-white/80">
            {title}
          </h3>
          <CircleIconButton text="Подробнее" />
        </div>
      </TransitionLink>
    </div>
  );
};

export default ProductCard;

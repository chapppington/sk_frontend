import { Metadata, ResolvingMetadata } from "next";
import ProductDetails from "./ProductDetails";
import { instance } from "@/api/axios";
import { IProduct } from "@/shared/types/product.types";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Получаем данные продукта с сервера
    const { data: product } = await instance.get<IProduct>(
      `/products/slug/${slug}`
    );

    return {
      title: `${product.name} | СибКомплект`,
      description: product.description,
    };
  } catch (error) {
    // Fallback если продукт не найден
    return {
      title: `Продукт ${slug} | СибКомплект`,
      description: "Подробная информация о продукте и его характеристиках",
    };
  }
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  return <ProductDetails slug={slug} />;
};

export default ProductPage;

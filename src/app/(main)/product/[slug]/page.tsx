import { Metadata, ResolvingMetadata } from "next";
import ProductDetails from "./ProductDetails";
import { IProduct } from "@/shared/types/product.types";
import { API_URL } from "@/constants";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Получаем данные продукта с сервера
    const response = await fetch(`${API_URL}/products/slug/${slug}`, {
      next: { revalidate: 3600 }, // Кэшируем на 1 час
    });

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const product: IProduct = await response.json();

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

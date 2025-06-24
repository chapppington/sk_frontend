import { Metadata, ResolvingMetadata } from "next";
import NewsDetails from "./NewsDetails";
import { API_URL } from "@/constants";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await fetch(`${API_URL}/news/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error("News not found");
    }
    const news = await response.json();
    return {
      title: `${news.title} | СибКомплект`,
      description: news.shortContent || news.content.substring(0, 160),
    };
  } catch (error) {
    return {
      title: `Новость ${slug} | СибКомплект`,
      description: "Подробная информация о новости и событиях компании",
    };
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsDetails slug={slug} />;
}

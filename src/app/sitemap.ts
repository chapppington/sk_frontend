import { MetadataRoute } from "next";
import productService from "@/services/product.service";
import newsService from "@/services/news.service";
import portfolioService from "@/services/portfolio.service";

// Base URL for the site
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sibkomplekt.ru";

// Static routes
const staticRoutes = [
  "",
  "/about",
  "/catalog",
  "/portfolio",
  "/news",
  "/certificates",
  "/vacancies",
  "/contacts",
  "/privacy",
  "/questionnaire",
  "/production",
];

// Priority and change frequency for different types of pages
const getPriority = (path: string): number => {
  if (path === "") return 1.0; // Home page
  if (path === "/catalog") return 0.9;
  if (path === "/portfolio") return 0.8;
  if (path === "/news") return 0.7;
  if (path === "/about") return 0.6;
  if (path.startsWith("/product/")) return 0.8;
  if (path.startsWith("/portfolio/")) return 0.7;
  if (path.startsWith("/news/")) return 0.6;
  return 0.5;
};

const getChangeFreq = (
  path: string
):
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never" => {
  if (path === "") return "daily";
  if (path.startsWith("/news/")) return "weekly";
  if (path.startsWith("/product/")) return "monthly";
  if (path.startsWith("/portfolio/")) return "monthly";
  return "monthly";
};

// Генерируем sitemap статически при билде
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add static routes
  staticRoutes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: getChangeFreq(route),
      priority: getPriority(route),
    });
  });

  // Helper function to fetch with timeout
  const fetchWithTimeout = async <T>(
    promise: Promise<T>,
    timeoutMs: number = 5000
  ): Promise<T | null> => {
    try {
      return await Promise.race([
        promise,
        new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), timeoutMs)
        ),
      ]);
    } catch (error) {
      return null;
    }
  };

  try {
    // Fetch products for dynamic product pages using productService with timeout
    const productsResponse = await fetchWithTimeout(
      productService.fetchAll(),
      5000
    );
    const products = productsResponse?.data || [];

    products.forEach((product: any) => {
      sitemap.push({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: new Date(product.updatedAt || product.createdAt),
        changeFrequency: getChangeFreq("/product/"),
        priority: getPriority("/product/"),
      });
    });

    // Fetch news articles for dynamic news pages using newsService with timeout
    const newsResponse = await fetchWithTimeout(
      newsService.fetchAll(),
      5000
    );
    const news = newsResponse?.data || [];

    news.forEach((article: any) => {
      sitemap.push({
        url: `${baseUrl}/news/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.createdAt),
        changeFrequency: getChangeFreq("/news/"),
        priority: getPriority("/news/"),
      });
    });

    // Fetch portfolio items for dynamic portfolio pages using portfolioService with timeout
    const portfolioResponse = await fetchWithTimeout(
      portfolioService.fetchAll(),
      5000
    );
    const portfolioItems = portfolioResponse?.data || [];

    portfolioItems.forEach((item: any) => {
      sitemap.push({
        url: `${baseUrl}/portfolio/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.createdAt),
        changeFrequency: getChangeFreq("/portfolio/"),
        priority: getPriority("/portfolio/"),
      });
    });
  } catch (error) {
    console.error("Error fetching dynamic routes for sitemap:", error);
    // Continue with static routes even if dynamic routes fail
  }

  return sitemap;
}

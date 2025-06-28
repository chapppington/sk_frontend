import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";
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

// Generate sitemap XML content
const generateSitemapXML = (sitemap: any[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = "</urlset>";

  const urls = sitemap
    .map((item) => {
      const lastmod = item.lastModified.toISOString().split("T")[0];
      return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `${xmlHeader}\n${urlsetOpen}\n${urls}\n${urlsetClose}`;
};

export async function POST(request: NextRequest) {
  try {
    const sitemap: any[] = [];

    // Add static routes
    staticRoutes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: getChangeFreq(route),
        priority: getPriority(route),
      });
    });

    // Fetch products for dynamic product pages
    const productsResponse = await productService.fetchAll();
    const products = productsResponse.data || [];

    products.forEach((product: any) => {
      sitemap.push({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: new Date(product.updatedAt || product.createdAt),
        changeFrequency: getChangeFreq("/product/"),
        priority: getPriority("/product/"),
      });
    });

    // Fetch news articles for dynamic news pages
    const newsResponse = await newsService.fetchAll();
    const news = newsResponse.data || [];

    news.forEach((article: any) => {
      sitemap.push({
        url: `${baseUrl}/news/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.createdAt),
        changeFrequency: getChangeFreq("/news/"),
        priority: getPriority("/news/"),
      });
    });

    // Fetch portfolio items for dynamic portfolio pages
    const portfolioResponse = await portfolioService.fetchAll();
    const portfolioItems = portfolioResponse.data || [];

    portfolioItems.forEach((item: any) => {
      sitemap.push({
        url: `${baseUrl}/portfolio/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.createdAt),
        changeFrequency: getChangeFreq("/portfolio/"),
        priority: getPriority("/portfolio/"),
      });
    });

    // Generate XML content
    const sitemapXML = generateSitemapXML(sitemap);

    // Save sitemap to public directory
    const publicDir = join(process.cwd(), "public");
    const sitemapPath = join(publicDir, "sitemap.xml");

    writeFileSync(sitemapPath, sitemapXML, "utf8");

    return NextResponse.json({
      success: true,
      message: "Sitemap regenerated successfully",
      urlsCount: sitemap.length,
    });
  } catch (error) {
    console.error("Error regenerating sitemap:", error);
    return NextResponse.json(
      { success: false, message: "Failed to regenerate sitemap" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method to regenerate sitemap",
  });
}

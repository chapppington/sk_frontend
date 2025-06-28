import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import productService from "@/services/product.service";
import newsService from "@/services/news.service";
import portfolioService from "@/services/portfolio.service";

// Base URL for the site
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://testsk2.ru";

// Path to static routes configuration file
const staticRoutesConfigPath = join(
  process.cwd(),
  "data",
  "static-routes.json"
);

// Path to dynamic routes configuration file
const dynamicRoutesConfigPath = join(
  process.cwd(),
  "data",
  "dynamic-routes.json"
);

// Default static routes with priority and change frequency
const defaultStaticRoutes = [
  { route: "", priority: 1.0, changeFreq: "daily" },
  { route: "/about", priority: 0.6, changeFreq: "monthly" },
  { route: "/catalog", priority: 0.9, changeFreq: "monthly" },
  { route: "/portfolio", priority: 0.8, changeFreq: "monthly" },
  { route: "/news", priority: 0.7, changeFreq: "monthly" },
  { route: "/certificates", priority: 0.5, changeFreq: "monthly" },
  { route: "/vacancies", priority: 0.5, changeFreq: "monthly" },
  { route: "/contacts", priority: 0.5, changeFreq: "monthly" },
  { route: "/privacy", priority: 0.5, changeFreq: "monthly" },
  { route: "/questionnaire", priority: 0.5, changeFreq: "monthly" },
  { route: "/production", priority: 0.5, changeFreq: "monthly" },
];

// Function to read static routes from config file
const getStaticRoutes = (): Array<{
  route: string;
  priority: number;
  changeFreq: string;
}> => {
  try {
    if (existsSync(staticRoutesConfigPath)) {
      const configContent = readFileSync(staticRoutesConfigPath, "utf8");
      const config = JSON.parse(configContent);
      return config.routes || defaultStaticRoutes;
    }
  } catch (error) {
    console.error("Error reading static routes config:", error);
  }
  return defaultStaticRoutes;
};

// Function to save static routes to config file
const saveStaticRoutes = (
  routes: Array<{ route: string; priority: number; changeFreq: string }>
): void => {
  try {
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      require("fs").mkdirSync(dataDir, { recursive: true });
    }

    const config = { routes };
    writeFileSync(
      staticRoutesConfigPath,
      JSON.stringify(config, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error saving static routes config:", error);
    throw error;
  }
};

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

// Function to read dynamic routes from config file
const getDynamicRoutes = (): any => {
  try {
    if (existsSync(dynamicRoutesConfigPath)) {
      const configContent = readFileSync(dynamicRoutesConfigPath, "utf8");
      const config = JSON.parse(configContent);
      return config.dynamicRoutes || {};
    }
  } catch (error) {
    console.error("Error reading dynamic routes config:", error);
  }
  return {
    products: {
      enabled: true,
      priority: 0.8,
      changeFreq: "monthly",
      description: "Страницы товаров (/product/{slug})",
    },
    news: {
      enabled: true,
      priority: 0.6,
      changeFreq: "weekly",
      description: "Страницы новостей (/news/{slug})",
    },
    portfolio: {
      enabled: true,
      priority: 0.7,
      changeFreq: "monthly",
      description: "Страницы портфолио (/portfolio/{slug})",
    },
  };
};

// GET endpoint for static routes management
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // If action is "static-routes", return static routes configuration
  if (action === "static-routes") {
    try {
      const routes = getStaticRoutes();
      return NextResponse.json({
        success: true,
        routes,
      });
    } catch (error) {
      console.error("Error fetching static routes:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch static routes" },
        { status: 500 }
      );
    }
  }

  // If action is "dynamic-routes", return dynamic routes configuration
  if (action === "dynamic-routes") {
    try {
      const dynamicRoutes = getDynamicRoutes();
      return NextResponse.json({
        success: true,
        dynamicRoutes,
      });
    } catch (error) {
      console.error("Error fetching dynamic routes:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch dynamic routes" },
        { status: 500 }
      );
    }
  }

  // Default GET behavior - return sitemap data
  try {
    const publicDir = join(process.cwd(), "public");
    const sitemapPath = join(publicDir, "sitemap.xml");

    let urlsCount = 0;
    let lastUpdated = null;

    if (existsSync(sitemapPath)) {
      const stats = require("fs").statSync(sitemapPath);
      lastUpdated = stats.mtime.toISOString();

      // Count URLs in sitemap
      const sitemapContent = readFileSync(sitemapPath, "utf8");
      const urlMatches = sitemapContent.match(/<url>/g);
      urlsCount = urlMatches ? urlMatches.length : 0;
    }

    return NextResponse.json({
      success: true,
      urlsCount,
      lastUpdated,
    });
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch sitemap data" },
      { status: 500 }
    );
  }
}

// PUT endpoint for updating static routes
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "static-routes") {
    try {
      const body = await request.json();
      const { routes } = body;

      if (!routes || !Array.isArray(routes)) {
        return NextResponse.json(
          { success: false, message: "Invalid routes data" },
          { status: 400 }
        );
      }

      // Validate routes data
      const validatedRoutes = routes.map((route) => ({
        route: route.route || "",
        priority: parseFloat(route.priority) || 0.5,
        changeFreq: route.changeFreq || "monthly",
      }));

      // Save to config file
      const configData = { routes: validatedRoutes };
      writeFileSync(
        staticRoutesConfigPath,
        JSON.stringify(configData, null, 2),
        "utf8"
      );

      return NextResponse.json({
        success: true,
        message: "Static routes updated successfully",
        routes: validatedRoutes,
      });
    } catch (error) {
      console.error("Error updating static routes:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update static routes" },
        { status: 500 }
      );
    }
  }

  if (action === "dynamic-routes") {
    try {
      const body = await request.json();
      const { dynamicRoutes } = body;

      if (!dynamicRoutes || typeof dynamicRoutes !== "object") {
        return NextResponse.json(
          { success: false, message: "Invalid dynamic routes data" },
          { status: 400 }
        );
      }

      // Save to config file
      const configData = { dynamicRoutes };
      writeFileSync(
        dynamicRoutesConfigPath,
        JSON.stringify(configData, null, 2),
        "utf8"
      );

      return NextResponse.json({
        success: true,
        message: "Dynamic routes updated successfully",
        dynamicRoutes,
      });
    } catch (error) {
      console.error("Error updating dynamic routes:", error);
      return NextResponse.json(
        { success: false, message: "Failed to update dynamic routes" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { success: false, message: "Invalid action" },
    { status: 400 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const sitemap: any[] = [];

    // Get current static routes
    const staticRoutes = getStaticRoutes();

    // Add static routes
    staticRoutes.forEach((routeItem) => {
      sitemap.push({
        url: `${baseUrl}${routeItem.route}`,
        lastModified: new Date(),
        changeFrequency: routeItem.changeFreq,
        priority: routeItem.priority,
      });
    });

    // Get dynamic routes configuration
    const dynamicRoutesConfig = getDynamicRoutes();

    // Fetch products for dynamic product pages (if enabled)
    if (dynamicRoutesConfig.products?.enabled) {
      const productsResponse = await productService.fetchAll();
      const products = productsResponse.data || [];

      products.forEach((product: any) => {
        sitemap.push({
          url: `${baseUrl}/product/${product.slug}`,
          lastModified: new Date(product.updatedAt || product.createdAt),
          changeFrequency:
            dynamicRoutesConfig.products.changeFreq ||
            getChangeFreq("/product/"),
          priority:
            dynamicRoutesConfig.products.priority || getPriority("/product/"),
        });
      });
    }

    // Fetch news articles for dynamic news pages (if enabled)
    if (dynamicRoutesConfig.news?.enabled) {
      const newsResponse = await newsService.fetchAll();
      const news = newsResponse.data || [];

      news.forEach((article: any) => {
        sitemap.push({
          url: `${baseUrl}/news/${article.slug}`,
          lastModified: new Date(article.updatedAt || article.createdAt),
          changeFrequency:
            dynamicRoutesConfig.news.changeFreq || getChangeFreq("/news/"),
          priority: dynamicRoutesConfig.news.priority || getPriority("/news/"),
        });
      });
    }

    // Fetch portfolio items for dynamic portfolio pages (if enabled)
    if (dynamicRoutesConfig.portfolio?.enabled) {
      const portfolioResponse = await portfolioService.fetchAll();
      const portfolioItems = portfolioResponse.data || [];

      portfolioItems.forEach((item: any) => {
        sitemap.push({
          url: `${baseUrl}/portfolio/${item.slug}`,
          lastModified: new Date(item.updatedAt || item.createdAt),
          changeFrequency:
            dynamicRoutesConfig.portfolio.changeFreq ||
            getChangeFreq("/portfolio/"),
          priority:
            dynamicRoutesConfig.portfolio.priority ||
            getPriority("/portfolio/"),
        });
      });
    }

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

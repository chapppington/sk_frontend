import { instance } from "@/api/axios";

class SitemapService {
  async regenerateSitemap(): Promise<{
    success: boolean;
    message: string;
    urlsCount?: number;
  }> {
    try {
      const response = await instance.post("/api/sitemap");
      return response.data;
    } catch (error) {
      console.error("Error regenerating sitemap:", error);
      return {
        success: false,
        message: "Failed to regenerate sitemap",
      };
    }
  }
}

export default new SitemapService();

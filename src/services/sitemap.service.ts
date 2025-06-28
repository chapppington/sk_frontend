class SitemapService {
  async regenerateSitemap(): Promise<{
    success: boolean;
    message: string;
    urlsCount?: number;
  }> {
    try {
      const response = await fetch("/client_api/sitemap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
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

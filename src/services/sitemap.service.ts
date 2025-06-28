class SitemapService {
  async getSitemapData(): Promise<{
    success: boolean;
    urlsCount?: number;
    lastUpdated?: string;
  }> {
    try {
      const response = await fetch("/client_api/sitemap", {
        method: "GET",
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
      console.error("Error fetching sitemap data:", error);
      return {
        success: false,
      };
    }
  }

  async getStaticRoutes(): Promise<{
    success: boolean;
    routes?: Array<{ route: string; priority: number; changeFreq: string }>;
  }> {
    try {
      const response = await fetch("/client_api/sitemap?action=static-routes", {
        method: "GET",
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
      console.error("Error fetching static routes:", error);
      return {
        success: false,
      };
    }
  }

  async updateStaticRoutes(
    routes: Array<{ route: string; priority: number; changeFreq: string }>
  ): Promise<{
    success: boolean;
    message: string;
    routes?: Array<{ route: string; priority: number; changeFreq: string }>;
  }> {
    try {
      const response = await fetch("/client_api/sitemap?action=static-routes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ routes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating static routes:", error);
      return {
        success: false,
        message: "Failed to update static routes",
      };
    }
  }

  async getDynamicRoutes(): Promise<{
    success: boolean;
    dynamicRoutes?: any;
  }> {
    try {
      const response = await fetch(
        "/client_api/sitemap?action=dynamic-routes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching dynamic routes:", error);
      return {
        success: false,
      };
    }
  }

  async updateDynamicRoutes(dynamicRoutes: any): Promise<{
    success: boolean;
    message: string;
    dynamicRoutes?: any;
  }> {
    try {
      const response = await fetch(
        "/client_api/sitemap?action=dynamic-routes",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dynamicRoutes }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating dynamic routes:", error);
      return {
        success: false,
        message: "Failed to update dynamic routes",
      };
    }
  }

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

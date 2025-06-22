import { instance, axiosClassic } from "@/api/axios";

const productService = {
  fetchAll: () => {
    return axiosClassic.get("/products");
  },

  fetchCatalog: (category?: string, page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    return axiosClassic.get(`/products/catalog?${params.toString()}`);
  },

  fetchByCategory: (category: string) => {
    return axiosClassic.get(`/products/category/${category}`);
  },

  fetchOne: (id: string) => {
    return axiosClassic.get(`/products/${id}`);
  },

  fetchBySlug: (slug: string) => {
    return axiosClassic.get(`/products/slug/${slug}`);
  },

  create: (formData: FormData) => {
    return instance.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: (id: string, formData: FormData) => {
    return instance.patch(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete: (id: string) => {
    return instance.delete(`/products/${id}`);
  },

  connectPortfolioItem: (productId: string, portfolioItemId: string) => {
    return instance.post(
      `/products/${productId}/connect-portfolio/${portfolioItemId}`
    );
  },

  disconnectPortfolioItem: (productId: string, portfolioItemId: string) => {
    return instance.delete(
      `/products/${productId}/disconnect-portfolio/${portfolioItemId}`
    );
  },
};

export default productService;

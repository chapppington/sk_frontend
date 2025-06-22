import { instance, axiosClassic } from "@/api/axios";

const portfolioService = {
  fetchAll: () => {
    return axiosClassic.get("/portfolio");
  },

  fetchOne: (slug: string) => {
    return axiosClassic.get(`/portfolio/slug/${slug}`);
  },

  create: (formData: FormData) => {
    return instance.post("/portfolio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: (id: string, formData: FormData) => {
    return instance.patch(`/portfolio/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete: (id: string) => {
    return instance.delete(`/portfolio/${id}`);
  },
};

export default portfolioService;

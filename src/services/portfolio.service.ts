import { instance } from "@/api/axios";

const portfolioService = {
  fetchAll: () => {
    return instance.get("/portfolio");
  },

  fetchOne: (slug: string) => {
    return instance.get(`/portfolio/${slug}`);
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

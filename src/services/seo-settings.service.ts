import { instance, axiosClassic } from "@/api/axios";

export interface SeoSettings {
  id: string;
  pagePath: string;
  pageName: string;
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSeoSettingsDto {
  pagePath: string;
  pageName: string;
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  isActive?: boolean;
}

export interface UpdateSeoSettingsDto extends Partial<CreateSeoSettingsDto> {}

export interface SeoPreview {
  google: {
    title: string;
    description: string;
    url: string;
    titleLength: number;
    descriptionLength: number;
    titleStatus: "good" | "warning";
    descriptionStatus: "good" | "warning";
  };
  yandex: {
    title: string;
    description: string;
    url: string;
    titleLength: number;
    descriptionLength: number;
    titleStatus: "good" | "warning";
    descriptionStatus: "good" | "warning";
  };
  og: {
    title: string;
    description: string;
    image?: string;
    url: string;
  };
}

class SeoSettingsService {
  async getAll(): Promise<SeoSettings[]> {
    const response = await axiosClassic.get("/site-seo-settings");
    return response.data;
  }

  async getById(id: string): Promise<SeoSettings> {
    const response = await axiosClassic.get(`/site-seo-settings/${id}`);
    return response.data;
  }

  async getByPagePath(pagePath: string): Promise<SeoSettings | null> {
    try {
      const response = await axiosClassic.get(
        `/site-seo-settings/page/${pagePath}`
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async create(data: CreateSeoSettingsDto): Promise<SeoSettings> {
    const response = await instance.post("/site-seo-settings", data);
    return response.data;
  }

  async update(id: string, data: UpdateSeoSettingsDto): Promise<SeoSettings> {
    const response = await instance.patch(`/site-seo-settings/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await instance.delete(`/site-seo-settings/${id}`);
  }

  async getPreview(id: string): Promise<SeoPreview> {
    const response = await axiosClassic.get(`/site-seo-settings/${id}/preview`);
    return response.data;
  }
}

export const seoSettingsService = new SeoSettingsService();

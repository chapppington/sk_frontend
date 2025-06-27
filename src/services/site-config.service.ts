import { instance, axiosClassic } from "@/api/axios";

export interface ISiteConfig {
  id: string;
  fontFamily: string;
  createdAt: string;
  updatedAt: string;
}

class SiteConfigService {
  private _BASE_URL = "/site-config";

  async fetchConfig() {
    return axiosClassic.get<ISiteConfig>(this._BASE_URL);
  }

  async updateFontFamily(fontFamily: string) {
    return instance.patch<ISiteConfig>(`${this._BASE_URL}/font-family`, {
      fontFamily,
    });
  }
}

export default new SiteConfigService();

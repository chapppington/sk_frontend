import { instance, axiosClassic } from "@/api/axios";
import {
  IHomePageConfig,
  IUpdateHomePageConfigData,
} from "@/shared/types/home-page-config.types";

class HomePageConfigService {
  private _BASE_URL = "/home-page-config";

  async get() {
    return axiosClassic.get<IHomePageConfig>(this._BASE_URL);
  }

  async update(data: IUpdateHomePageConfigData) {
    return instance.patch<IHomePageConfig>(this._BASE_URL, data);
  }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("productImage", file);

    return instance.post<{ productImage: string }>(
      `${this._BASE_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}

export default new HomePageConfigService();

import { instance, axiosClassic } from "@/api/axios";
import {
  IAboutPageConfig,
  IUpdateAboutPageConfigData,
} from "@/shared/types/about-page-config.types";

class AboutPageConfigService {
  private _BASE_URL = "/about-page-config";

  async get() {
    return axiosClassic.get<IAboutPageConfig>(this._BASE_URL);
  }

  async update(data: IUpdateAboutPageConfigData) {
    return instance.patch<IAboutPageConfig>(this._BASE_URL, data);
  }

  async upload(formData: FormData) {
    return instance.post<Record<string, string | string[]>>(
      `${this._BASE_URL}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  async uploadOne(fieldKey: string, file: File) {
    const formData = new FormData();
    formData.append(fieldKey, file);
    const { data } = await this.upload(formData);
    return data[fieldKey];
  }
}

export default new AboutPageConfigService();

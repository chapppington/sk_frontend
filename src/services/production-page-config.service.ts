import { instance, axiosClassic } from "@/api/axios";
import {
  IProductionPageConfig,
  IUpdateProductionPageConfigData,
} from "@/shared/types/production-page-config.types";

class ProductionPageConfigService {
  private _BASE_URL = "/production-page-config";

  async get() {
    return axiosClassic.get<IProductionPageConfig>(this._BASE_URL);
  }

  async update(data: IUpdateProductionPageConfigData) {
    return instance.patch<IProductionPageConfig>(this._BASE_URL, data);
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

export default new ProductionPageConfigService();

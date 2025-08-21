import { instance, axiosClassic } from "@/api/axios";
import {
  ICertificatesPageConfig,
  IUpdateCertificatesPageConfigData,
} from "@/shared/types/certificates-page-config.types";

class CertificatesPageConfigService {
  private _BASE_URL = "/certificates-page-config";

  async get() {
    return axiosClassic.get<ICertificatesPageConfig>(this._BASE_URL);
  }

  async update(data: IUpdateCertificatesPageConfigData) {
    return instance.patch<ICertificatesPageConfig>(this._BASE_URL, data);
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

export default new CertificatesPageConfigService();

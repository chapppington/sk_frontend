import { instance, axiosClassic } from "@/api/axios";

class VacanciesPageConfigService {
  private _BASE_URL = "/vacancies-page-config";

  async get() {
    return axiosClassic.get(this._BASE_URL);
  }

  async update(data: any) {
    return instance.patch(this._BASE_URL, data);
  }

  async upload(formData: FormData) {
    return instance.post<Record<string, string | string[]>>(
      `${this._BASE_URL}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  }

  async uploadOne(fieldKey: string, file: File) {
    const fd = new FormData();
    fd.append(fieldKey, file);
    const { data } = await this.upload(fd);
    return data[fieldKey];
  }
}

export default new VacanciesPageConfigService();

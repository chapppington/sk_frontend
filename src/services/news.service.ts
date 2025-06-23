import { instance, axiosClassic } from "@/api/axios";
import type { INews } from "@/shared/types/news.types";

class NewsService {
  private _BASE_URL = "/news";

  async fetchAll() {
    return axiosClassic.get<INews[]>(this._BASE_URL);
  }

  async fetchOne(slug: string) {
    return axiosClassic.get<INews>(`${this._BASE_URL}/slug/${slug}`);
  }

  async create(data: FormData) {
    return instance.post<INews>(this._BASE_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async update(id: string, data: FormData) {
    return instance.patch<INews>(`${this._BASE_URL}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async delete(id: string) {
    return instance.delete(`${this._BASE_URL}/${id}`);
  }
}

export default new NewsService();

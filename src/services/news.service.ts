import { instance } from "@/api/axios";

interface INews {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  imageUrl?: string;
  readingTime: number;
}

class NewsService {
  private _BASE_URL = "/news";

  async fetchAll() {
    return instance.get<INews[]>(this._BASE_URL);
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

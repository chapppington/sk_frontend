import { instance } from "@/api/axios";

interface INews {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
}

interface ICreateNewsDto {
  category: string;
  title: string;
  content: string;
}

interface IUpdateNewsDto {
  category?: string;
  title?: string;
  content?: string;
}

class NewsService {
  private _BASE_URL = "/news";

  async fetchAll() {
    return instance.get<INews[]>(this._BASE_URL);
  }

  async create(data: ICreateNewsDto) {
    return instance.post<INews>(this._BASE_URL, data);
  }

  async update(id: string, data: IUpdateNewsDto) {
    return instance.patch<INews>(`${this._BASE_URL}/${id}`, data);
  }

  async delete(id: string) {
    return instance.delete(`${this._BASE_URL}/${id}`);
  }
}

export default new NewsService();

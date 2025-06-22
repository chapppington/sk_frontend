import { instance, axiosClassic } from "@/api/axios";
import type { IVacancy } from "@/shared/types/vacancy.types";

class VacancyService {
  private _BASE_URL = "/vacancy";

  async fetchAll() {
    return axiosClassic.get<IVacancy[]>(this._BASE_URL);
  }

  async create(data: Partial<IVacancy>) {
    return instance.post<IVacancy>(this._BASE_URL, data);
  }

  async update(id: string, data: Partial<IVacancy>) {
    return instance.patch<IVacancy>(`${this._BASE_URL}/${id}`, data);
  }

  async delete(id: string) {
    return instance.delete(`${this._BASE_URL}/${id}`);
  }
}

export default new VacancyService();

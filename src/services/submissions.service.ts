import { instance, axiosClassic } from "@/api/axios";
import type {
  ISubmission,
  ICreateSubmissionData,
} from "@/shared/types/submissions.types";

class SubmissionsService {
  private _BASE_URL = "/submissions";

  async fetchAll(formType?: string) {
    const params = formType ? { formType } : {};
    return instance.get<ISubmission[]>(this._BASE_URL, { params });
  }

  async fetchOne(id: string) {
    return instance.get<ISubmission>(`${this._BASE_URL}/${id}`);
  }

  async create(data: ICreateSubmissionData) {
    const formData = new FormData();

    formData.append("formType", data.formType);
    formData.append("name", data.name);
    formData.append("consent", data.consent.toString());

    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.comments) formData.append("comments", data.comments);
    if (data.meta) formData.append("meta", JSON.stringify(data.meta));

    // Добавляем файлы
    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    return axiosClassic.post<ISubmission>(this._BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async update(id: string, data: Partial<ICreateSubmissionData>) {
    return instance.patch<ISubmission>(`${this._BASE_URL}/${id}`, data);
  }

  async delete(id: string) {
    return instance.delete(`${this._BASE_URL}/${id}`);
  }
}

export default new SubmissionsService();

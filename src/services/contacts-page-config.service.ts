import { instance, axiosClassic } from "@/api/axios";
import {
  IContactsPageConfig,
  IUpdateContactsPageConfigData,
} from "@/shared/types/contacts-page-config.types";

class ContactsPageConfigService {
  private _BASE_URL = "/contacts-page-config";

  async get() {
    return axiosClassic.get<IContactsPageConfig>(this._BASE_URL);
  }

  async update(data: IUpdateContactsPageConfigData) {
    return instance.patch<IContactsPageConfig>(this._BASE_URL, data);
  }
}

export default new ContactsPageConfigService();

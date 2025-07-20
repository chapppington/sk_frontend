import { instance, axiosClassic } from "@/api/axios";

class NavbarConfigService {
  private _BASE_URL = "/navbar-config";

  async get() {
    return axiosClassic.get(this._BASE_URL);
  }

  async update(data: any) {
    return instance.patch(this._BASE_URL, data);
  }
}

export default new NavbarConfigService(); 
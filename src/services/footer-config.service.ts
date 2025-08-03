import { instance, axiosClassic } from "@/api/axios";

interface FooterConfig {
  id: string;
  footerLinksConfig: {
    links_in_tablet_menu: string[];
    all_links: string[];
  };
  departmentItems: {
    name: string;
    phone: string;
    email: string;
  }[];
  footerAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateFooterConfigData {
  footerLinksConfig?: {
    links_in_tablet_menu: string[];
    all_links: string[];
  };
  departmentItems?: {
    name: string;
    phone: string;
    email: string;
  }[];
  footerAddress?: string;
}

class FooterConfigService {
  private _BASE_URL = "/footer-config";

  async get() {
    console.log('Getting footer config from:', this._BASE_URL);
    const response = await axiosClassic.get<FooterConfig>(this._BASE_URL);
    console.log('Get response:', response.data);
    return response;
  }

  async update(data: UpdateFooterConfigData) {
    console.log('Updating footer config with data:', data);
    const response = await instance.patch<FooterConfig>(this._BASE_URL, data);
    console.log('Update response:', response.data);
    return response;
  }
}

export default new FooterConfigService();

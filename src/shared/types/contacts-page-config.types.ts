export interface IContactsDepartmentItem {
  name: string;
  phone: string;
  email: string;
}

export interface IContactsPageConfig {
  id: string;
  departments: IContactsDepartmentItem[];
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateContactsPageConfigData {
  departments?: IContactsDepartmentItem[];
  address?: string;
}

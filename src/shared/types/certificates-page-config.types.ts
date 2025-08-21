export interface ICertificatesPageConfig {
  id: string;
  tabs: Array<{
    name: string;
    items: Array<{
      id: number;
      title: string;
      content: string;
      order: number;
      documents: Array<{
        title: string;
        link: string; // stored filename or absolute path
      }>;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateCertificatesPageConfigData {
  tabs?: ICertificatesPageConfig["tabs"];
}

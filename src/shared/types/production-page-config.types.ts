export interface IProductionPageConfig {
  id: string;
  firstScreen: {
    bg_image: string;
    title: string;
    subtitle: string;
    button_text: string;
    button_href: string;
    stats: Array<{
      value: string;
      description: string;
      showOnMobile: boolean;
    }>;
  };
  secondScreen: {
    title: string;
    subtitle: string;
    stages: Array<{
      id: number;
      number: string;
      title: string;
      description: string;
      image: string;
    }>;
  };
  thirdScreen: {
    title: string;
    subtitle: string;
    equipment: Array<{
      id: number;
      title: string;
      subtitle: string;
      image: string;
      order: number;
    }>;
  };
  fourthScreen: {
    items: Array<{
      id: number;
      title: string;
      content: string;
      order: number;
      documents: Array<{
        title: string;
        link: string; // stored filename
      }>;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateProductionPageConfigData {
  firstScreen?: Partial<IProductionPageConfig["firstScreen"]>;
  secondScreen?: Partial<IProductionPageConfig["secondScreen"]>;
  thirdScreen?: Partial<IProductionPageConfig["thirdScreen"]>;
  fourthScreen?: Partial<IProductionPageConfig["fourthScreen"]>;
}

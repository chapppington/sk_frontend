export interface IVacanciesPageConfig {
  id: string;
  firstScreen: {
    bg_image: string;
    title: string;
    subtitle: string;
    stats: Array<{
      value: string;
      description: string;
      showOnMobile: boolean;
    }>;
  };
  secondScreen: {
    title: string;
    subtitle: string;
  };
  thirdScreen: {
    title: string;
    subtitle: string;
    values: Array<{
      title: string;
      subtitle: string;
      icon_path: string;
    }>;
  };
  fourthScreen: {
    title: string;
    subtitle: string;
    subtitle_icon: string;
    advantages: Array<{
      icon: string;
      text: string;
    }>;
  };
  fifthScreen: {
    title: string;
    subtitle: string;
    reviews: Array<{
      name: string;
      position: string;
      image: string;
      text: string;
      shortText: string;
    }>;
  };
  sixthScreen: {
    title: string;
    subtitle: string;
    answers: Array<{
      title: string;
      content: string;
      list?: string[];
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateVacanciesPageConfigData {
  firstScreen?: Partial<IVacanciesPageConfig["firstScreen"]>;
  secondScreen?: Partial<IVacanciesPageConfig["secondScreen"]>;
  thirdScreen?: Partial<IVacanciesPageConfig["thirdScreen"]>;
  fourthScreen?: Partial<IVacanciesPageConfig["fourthScreen"]>;
  fifthScreen?: Partial<IVacanciesPageConfig["fifthScreen"]>;
  sixthScreen?: Partial<IVacanciesPageConfig["sixthScreen"]>;
}

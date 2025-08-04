export interface IHomePageConfig {
  id: string;
  firstScreen: {
    title: string;
    subtitle: string;
    main_button_text: string;
    stats: Array<{
      value: string;
      description: string;
      showOnMobile: boolean;
    }>;
  };
  rotatingText: string;
  missionScreen: {
    mission_title: string;
    mission_text: string;
    button_text: string;
  };
  productsScreen: {
    button_text: string;
    products: Array<{
      title: string;
      image: string;
      description: string;
      category: string;
    }>;
  };
  reviewsScreen: {
    title: string;
    subtitle: string;
    reviews: Array<{
      image: string;
      title: string;
      jobTitle: string;
      content_path: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateHomePageConfigData {
  firstScreen?: {
    title?: string;
    subtitle?: string;
    main_button_text?: string;
    stats?: Array<{
      value: string;
      description: string;
      showOnMobile: boolean;
    }>;
  };
  rotatingText?: string;
  missionScreen?: {
    mission_title?: string;
    mission_text?: string;
    button_text?: string;
  };
  productsScreen?: {
    button_text?: string;
    products?: Array<{
      title: string;
      image: string;
      description: string;
      category: string;
    }>;
  };
  reviewsScreen?: {
    title?: string;
    subtitle?: string;
    reviews?: Array<{
      image: string;
      title: string;
      jobTitle: string;
      content_path: string;
    }>;
  };
}

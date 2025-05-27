export interface FAQItem {
  title: string;
  content: string;
  documents?: {
    title: string;
    link: string;
  }[];
}

export interface FAQCategory {
  name: string;
  items: FAQItem[];
}

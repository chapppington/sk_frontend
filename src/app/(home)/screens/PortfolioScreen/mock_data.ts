interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  hasMarquee: boolean;
}

export const cardsData: CardData[] = [
  {
    title: "Курортный комплекс «Манжерок»",
    description:
      "A gravity-defying residence that appears to float above the landscape, featuring cantilevered spaces and panoramic glass walls",
    imageUrl: "/news_bg.webp",
    alt: "Floating modern house",
    hasMarquee: true,
  },
  {
    title: "Biomorphic Haven",
    description:
      "An organic-inspired dwelling that mimics natural forms, incorporating flowing curves and sustainable materials",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    alt: "Organic modern house",
    hasMarquee: false,
  },
  {
    title: "Digital Oasis",
    description:
      "A smart home that seamlessly integrates technology with living spaces, featuring automated systems and interactive surfaces",
    imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    alt: "Smart modern house",
    hasMarquee: false,
  },
  {
    title: "Minimalist Retreat",
    description:
      "A zen-inspired residence that celebrates simplicity and light, with clean lines and open spaces that promote mindfulness",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    alt: "Minimalist modern house",
    hasMarquee: false,
  },
];

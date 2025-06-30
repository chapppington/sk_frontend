"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import newsService from "@/services/news.service";
import { INews } from "@/shared/types/news.types";
import ArticleContentSection from "./screens/ArticleContentScreen";
import ReadMoreScreen from "@/components/shared_screens/ReadMoreScreen";

const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

interface Props {
  slug: string; 
}

const NewsDetails = ({ slug }: Props) => {
  const { data: news, isLoading } = useQuery<INews>({
    queryKey: ["news", slug],
    queryFn: async () => {
      const { data } = await newsService.fetchOne(slug);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!news) {
    return <div>News not found</div>;
  }

  return (
    <main>
      <ArticleContentSection news={news} />
      <ReadMoreScreen/>
      <ContactUsScreen />
    </main>
  );
};

export default NewsDetails;

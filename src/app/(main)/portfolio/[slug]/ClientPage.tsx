"use client";

import { useQuery } from "@tanstack/react-query";
import FirstScreen from "@/app/(main)/portfolio/[slug]/screens/FirstScreen";
import dynamic from "next/dynamic";
import portfolioService from "@/services/portfolio.service";
import { IPortfolioItem } from "./types";

const TasksScreen = dynamic(
  () => import("@/app/(main)/portfolio/[slug]/screens/TasksScreen")
);
const SolutionScreen = dynamic(
  () => import("@/app/(main)/portfolio/[slug]/screens/SolutionScreen")
);
const ReviewScreen = dynamic(
  () => import("@/app/(main)/portfolio/[slug]/screens/ReviewScreen")
);
const MoreProjectsScreen = dynamic(
  () => import("@/app/(main)/portfolio/[slug]/screens/MoreProjectsScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

interface ClientPageProps {
  slug: string;
}

const ClientPage = ({ slug }: ClientPageProps) => {
  const { data: portfolio, isLoading } = useQuery<IPortfolioItem>({
    queryKey: ["portfolio", slug],
    queryFn: async () => {
      const { data } = await portfolioService.fetchOne(slug);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  return (
    <main>
      <FirstScreen portfolio={portfolio} />
      <TasksScreen portfolio={portfolio} />
      <SolutionScreen portfolio={portfolio} />
      <ReviewScreen />
      <MoreProjectsScreen />
      <ContactUsScreen />
    </main>
  );
};

export default ClientPage;

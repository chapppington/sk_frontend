"use client";

import { useQuery } from "@tanstack/react-query";
import FirstScreen from "@/app/(main)/portfolio/[slug]/screens/FirstScreen";
import dynamic from "next/dynamic";
import portfolioService from "@/services/portfolio.service";
import { IPortfolioItem } from "@/shared/types/portfolio.types";
import { Skeleton } from "@/components/ui/shadcn/skeleton";

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

interface Props {
  slug: string;
}

const PortfolioSkeleton = () => {
  return (
    <main>
      {/* FirstScreen Skeleton */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Headings and Description skeleton */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 my-12">
            <div className="flex-1">
              <Skeleton className="h-12 w-3/4 mb-2" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-20 w-full" />
            </div>
          </div>

          {/* Image/Video Preview skeleton */}
          <div className="w-full aspect-[2.8/1] rounded-2xl overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* TasksScreen Skeleton */}
      <section className="bg-transparent py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar skeleton */}
            <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
              <Skeleton className="h-6 w-20 mb-8" />
            </div>

            {/* Main Content skeleton */}
            <div className="flex-1">
              <Skeleton className="h-10 w-2/3 mb-6" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* SolutionScreen Skeleton */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar skeleton */}
            <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
              <Skeleton className="h-6 w-20 mb-8" />
            </div>

            {/* Main Content skeleton */}
            <div className="flex-1">
              <Skeleton className="h-10 w-2/3 mb-6" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>

          {/* Three-column section skeleton */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-0 items-stretch mt-12">
            {/* Left image skeleton */}
            <div className="flex-[1.3] min-w-0">
              <Skeleton className="w-full h-[400px]" />
            </div>
            {/* Center card skeleton */}
            <div className="flex-1 min-w-0 flex flex-col justify-center p-8">
              <Skeleton className="h-8 w-3/4 mb-6" />
              <Skeleton className="h-24 w-full" />
            </div>
            {/* Right image skeleton */}
            <div className="flex-[0.7] min-w-0">
              <Skeleton className="w-full h-[400px]" />
            </div>
          </div>
        </div>
      </section>

      {/* MoreProjectsScreen Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-1/3 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* ContactUsScreen Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-32 w-full max-w-2xl mx-auto" />
        </div>
      </section>
    </main>
  );
};

const PortfolioDetails = ({ slug }: Props) => {
  const { data: portfolio, isLoading } = useQuery<IPortfolioItem>({
    queryKey: ["portfolio", slug],
    queryFn: async () => {
      const { data } = await portfolioService.fetchOne(slug);
      return data;
    },
  });

  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  return (
    <main>
      <FirstScreen portfolio={portfolio} />
      <TasksScreen portfolio={portfolio} />
      <SolutionScreen portfolio={portfolio} />
      {portfolio.hasReview && <ReviewScreen portfolio={portfolio} />}
      <MoreProjectsScreen />
      <ContactUsScreen />
    </main>
  );
};

export default PortfolioDetails;
